import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { User } from "../entity/User";

class UserController {
  async getAllUsers(req: Request | any, res: Response) {
    let users = await User.find({
      select: {
        first_name: true,
        last_name: true,
        email: true,
      },
    });
    res.status(200).json({
      status: "success",
      data: users,
    });
  }

  async getUserById(req: Request | any, res: Response, next: NextFunction) {
    const id = req.user.id;
    const user = await User.findOneBy({
      id: Number(id),
    });

    if (!user) return next(new AppError("User not found", 404));
    res.status(200).json({
      status: "success",
      data: user,
    });
  }

  async deleteUserById(req: Request | any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await User.findOneBy({
      id: Number(id),
    });

    if (!user) return next(new AppError("User not found", 404));
    await user.remove();
    res.status(200).json({
      message: "Deleted",
    });
  }
}

const userController = new UserController();
export default userController;
