import { Router } from "express";
import { getAllCategories, getCategoryById, deleteCategoryById, getAllProductByCategoryName } from "../controllers/CategoryController";

const router = Router()
router.get('/categories', getAllCategories)
router.get('/category/:name', getAllProductByCategoryName)
router.get('/categories/:id', getCategoryById)
router.delete('/categories/:id', deleteCategoryById)
export default router