import { User, UserRole } from "../entity/User";
import { AppDataSource } from "../data-source";
import { CookieOptions, NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import * as bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import { Cart } from "../entity/Cart";
import { Wishlist } from "../entity/Wishlist";

const signToken = (id) => {
  return Jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  let cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN as any) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

class AuthController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, email, password, role } = req.body;

    const existingUser = await User.findOneBy({
      email,
    });

    if (existingUser)
      return next(new AppError("This email already exists", 404));
    const user = new User();
    const cart = new Cart();
    cart.user = user;
    const wishlist = new Wishlist();
    wishlist.user = user;
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;

    if (role === UserRole.ADMIN) user.role = UserRole.ADMIN;

    await user.save();
    if (user.role === UserRole.USER) {
      await cart.save();
      await wishlist.save();
    }

    createSendToken(user, 200, res);
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return next(new AppError("User not found", 404));

    const result = await bcrypt.compare(password, user.password);
    if (!result) return next(new AppError("Password is wrong", 404));
    createSendToken(user, 200, res);
  }

  logout(req: Request, res: Response) {
    res.cookie("jwt", "logout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
    });
  }
}

const authController = new AuthController();

export default authController;
