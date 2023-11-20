import authController from "../controllers/AuthController";
import joiAsyncMiddleWare from "../middlewares/JoiMiddleware";
import asyncHandler from "../utils/asyncHandle";
import { createUser } from "../validators/valiation";
import { Router } from "express";

const router = Router();

router
  .route("/signup")
  .post(
    joiAsyncMiddleWare(createUser),
    asyncHandler(authController.createUser)
  );

router.route("/signin").post(asyncHandler(authController.signIn));

router.route("/logout").get(authController.logout);
export default router;
