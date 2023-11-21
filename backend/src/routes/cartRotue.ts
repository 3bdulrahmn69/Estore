import { Router } from "express";
import cartController from "../controllers/CartController";
import asyncHandler from "../utils/asyncHandle";
import authentication from "../middlewares/authenticate";

const router = Router();

router
  .route("/cart/:id")
  .post(
    asyncHandler(authentication.authenticated),
    asyncHandler(cartController.addProductToCart)
  )
  .delete(
    asyncHandler(authentication.authenticated),
    asyncHandler(cartController.delteProductFromCart)
  )
  .put(
    asyncHandler(authentication.authenticated),
    asyncHandler(cartController.updateAmountOfTheProductInTheCart)
  );

router
  .route("/cart")
  .get(
    asyncHandler(authentication.authenticated),
    cartController.getAllproductOfCard
  )
  .delete(
    asyncHandler(authentication.authenticated),
    asyncHandler(cartController.emptyTheCart)
  );

export default router;
