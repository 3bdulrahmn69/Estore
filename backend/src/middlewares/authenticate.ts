import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as Jwt from "jsonwebtoken";
import AppError from "../utils/appError";

class Authentication {
  async authenticated(req: Request, res: Response, next: NextFunction) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if ((req as any).cookies.jwt) {
      token = (req as any).cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in please log in to get access", 404)
      );
    }

    const decoded: any = Jwt.verify(token, process.env.JWT_SECRET);
    const user: any = await User.findOne({
      where: {
        id: decoded.id,
      },
      relations: {
        cart: true,
        wishlist: true,
      },
    });

    if (!user) {
      return next(new AppError("You are not authorized", 401));
    }
    delete user.password;
    delete user.wishlist;
    (req as any).user = user;
    next();
  }

  async authorized(req: Request, res: Response, next: NextFunction) {
    if ((req as any).user.role !== "admin") {
      next(new AppError("You are not allowed to perform this action", 403));
    }

    next();
  }
}
const authentication = new Authentication();

export default authentication;
