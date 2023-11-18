import { Router } from "express";
import categoryController from "../controllers/CategoryController";
import asyncHandler from "../utils/asyncHandle";
import joiAsyncMiddleWare from "../middlewares/JoiMiddleware";
import { categorySchema } from "../validators/valiation";
import authenticate from "../middlewares/authenticate";

const router = Router()
router.route('/categories')
  .get(asyncHandler(categoryController.getAllCategories))
  .post(
    asyncHandler(authenticate),
    joiAsyncMiddleWare(categorySchema),
    asyncHandler(categoryController.createCategory))

router.route('/categories/:id')
  .get(asyncHandler(categoryController.getCategoryById))
  .delete(
    asyncHandler(authenticate),
    asyncHandler(categoryController.deleteCategoryById))
  .put(
    asyncHandler(authenticate),
    asyncHandler(categoryController.updateCategory))
router.get('/category/:name',asyncHandler(categoryController.getAllProductByCategoryName))

export default router