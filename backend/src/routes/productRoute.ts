import { Router } from "express";
import productController from "../controllers/ProductController";
import  JoiMiddleware  from "../middlewares/JoiMiddleware";
import { productSchema } from "../validators/valiation";
import asyncHandler from "../utils/asyncHandle";

const router = Router()

router.route('/products')
  .get(asyncHandler(productController.getAllProducts))
  .post(
    JoiMiddleware(productSchema),
    asyncHandler(productController.createProduct)
    )
router.route('/products/:id')
  .get(asyncHandler(productController.getProductById))
  .delete(asyncHandler(productController.deleteProductById))
  .put(asyncHandler(productController.updateProduct))

export default router