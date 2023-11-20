import { User, UserRole } from "../entity/User";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import * as bcrypt from 'bcrypt'
import * as Jwt  from "jsonwebtoken";

const signToken = (id) => {
  return Jwt.sign({id: id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

class AuthController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, email, password, role } = req.body;
    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;
  
    if (role === UserRole.ADMIN) user.role = UserRole.ADMIN 
    let token = signToken(user.id)
    
    await user.save()
    return res.status(200)
    .json({
      message: "done",
      token,
      data: user
    })
  }
  
  async signIn (req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body;
    const user = await User.findOneBy({
      email
    })
    
    if (!user) return next(new AppError('User not found', 401))
    
    const result = await bcrypt.compare(password, user.password)
    if (!result) return next(new AppError('Password is wrong', 401))
    
    let token = signToken(user.id)
    
    return res.status(200)
    .json({
      message: "done",
      token,
      data: user
    })
  }

}

const authController = new AuthController();

export default authController;