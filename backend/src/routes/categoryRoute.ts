import { Router } from "express";
import categoryController from "../controllers/CategoryController";
import asyncHandler from "../utils/asyncHandle";
import joiAsyncMiddleWare from "../middlewares/JoiMiddleware";
import { categorySchema } from "../validators/valiation";
import authentication from "../middlewares/authenticate";
import { upload } from "../middlewares/multer";

const router = Router();
router
  .route("/categories")
  .get(asyncHandler(categoryController.getAllCategories))
  .post(
    asyncHandler(authentication.authenticated),
    asyncHandler(authentication.authorized),
    upload.single("image"),
    joiAsyncMiddleWare(categorySchema),
    asyncHandler(categoryController.createCategory)
  );

router
  .route("/categories/:id")
  .get(asyncHandler(categoryController.getCategoryById))
  .delete(
    asyncHandler(authentication.authenticated),
    asyncHandler(authentication.authorized),
    asyncHandler(categoryController.deleteCategoryById)
  )
  .put(
    asyncHandler(authentication.authenticated),
    asyncHandler(authentication.authorized),
    asyncHandler(categoryController.updateCategory)
  );
router.get(
  "/category/:name",
  asyncHandler(categoryController.getAllProductByCategoryName)
);

router.get(
  "/search-category/:name",
  asyncHandler(categoryController.searchAboutCategory)
);

export default router;
