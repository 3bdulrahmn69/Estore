import { Router } from "express";
import productController from "../controllers/ProductController";
import  JoiMiddleware  from "../middlewares/JoiMiddleware";
import { productSchema } from "../validators/valiation";
import asyncHandler from "../utils/asyncHandle";
import authentication from "../middlewares/authenticate";

const router = Router()

router.route('/products')
  .get(asyncHandler(productController.getAllProducts))
  .post(
    asyncHandler(authentication.authenticated),
    asyncHandler(authentication.authorized),
    JoiMiddleware(productSchema),
    asyncHandler(productController.createProduct)
    )
router.route('/products/:id')
  .get(asyncHandler(productController.getProductById))
  .delete(
    asyncHandler(authentication.authenticated), 
    asyncHandler(authentication.authorized),
    asyncHandler(productController.deleteProductById))
  .put(
    asyncHandler(authentication.authenticated),
    asyncHandler(authentication.authorized),
    asyncHandler(productController.updateProduct))

router.get('/search-product/:name', asyncHandler(productController.searchAboutProduct))
export default router