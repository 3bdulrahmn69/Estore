import { Router } from "express";
import { getAllProduct } from "../controllers/ProductController";

const router = Router()

router.get('/products', getAllProduct)

export default router