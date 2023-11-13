import { Router } from "express";
import { getAllProducts, getProductById, deleteProductById } from "../controllers/ProductController";

const router = Router()

router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.delete('/products/:id', deleteProductById)

export default router