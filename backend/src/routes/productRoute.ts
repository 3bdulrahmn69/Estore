import { Router } from "express";
import productController from "../controllers/ProductController";
import  JoiMiddleware  from "../middlewares/JoiMiddleware";
import { productSchema } from "../validators/valiation";
import asyncHandler from "../utils/asyncHandle";
import authenticate from "../middlewares/authenticate";

const router = Router()

router.route('/products')
  .get(asyncHandler(productController.getAllProducts))
  .post(
    asyncHandler(authenticate),
    JoiMiddleware(productSchema),
    asyncHandler(productController.createProduct)
    )
router.route('/products/:id')
  .get(asyncHandler(productController.getProductById))
  .delete(
    asyncHandler(authenticate), 
    asyncHandler(productController.deleteProductById))
  .put(
    asyncHandler(authenticate),
    asyncHandler(productController.updateProduct))

export default router