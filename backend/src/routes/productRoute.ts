import { Router } from "express";
import { 
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct
} from "../controllers/ProductController";

const router = Router()

router.get('/products', getAllProducts)
router.post('/products', createProduct)
router.get('/products/:id', getProductById)
router.delete('/products/:id', deleteProductById)
router.put('/products/:id', updateProduct)

export default router