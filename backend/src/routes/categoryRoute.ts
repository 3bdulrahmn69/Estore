import { Router } from "express";
import { 
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  getAllProductByCategoryName,
  createCategory,
  updateCategory
} from "../controllers/CategoryController";

const router = Router()
router.get('/categories', getAllCategories)
router.get('/category/:name', getAllProductByCategoryName)
router.get('/categories/:id', getCategoryById)
router.delete('/categories/:id', deleteCategoryById)
router.post('/categories', createCategory)
router.put('/categories/:id', updateCategory)

export default router