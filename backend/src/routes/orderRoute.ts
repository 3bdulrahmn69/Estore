import { Router } from "express";
import orderController from "../controllers/OrderConroller";
import asyncHandler from "../utils/asyncHandle";
import authentication from "../middlewares/authenticate";

const router = Router();

router.use(asyncHandler(authentication.authenticated));

router
  .route("/order")
  .post(asyncHandler(orderController.createOrder))
  .get(orderController.getOrdersOfUser);

router
  .route("/order/:id")
  .delete(asyncHandler(orderController.deleteOrderOfUser));

router
  .route("/orders")
  .get(asyncHandler(authentication.authorized), orderController.getAllOrders);
export default router;
