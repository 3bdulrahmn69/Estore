import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as Jwt from 'jsonwebtoken'
import AppError from "../utils/appError";

export default async (req: Request, res: Response, next: NextFunction) => {
  let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    
    if(!token){
      return next(
        new AppError('You are not logged in please log in to get access', 404)
      )
    }
    
    const decoded: any = Jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOneBy({
      id: decoded.id
    })
    
    if (!user) {
      return next(
        new AppError('You are not authorized', 401)
      )
    }
    
    (req as any).user = user
    next()
}
