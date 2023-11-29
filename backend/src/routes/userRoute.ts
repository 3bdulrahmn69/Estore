import userController from "../controllers/UserController";
import asyncHandler from "../utils/asyncHandle";
import authentication from "../middlewares/authenticate";
import { Router } from "express";

const router = Router();
router.get(
  "/me",
  asyncHandler(authentication.authenticated),
  asyncHandler(userController.getUserById)
);
router.delete(
  "/deleteuser/:id",
  asyncHandler(authentication.authenticated),
  asyncHandler(userController.deleteUserById)
);

router.get(
  "/allusers",
  asyncHandler(authentication.authorized),
  asyncHandler(userController.getAllUsers)
);

export default router;
