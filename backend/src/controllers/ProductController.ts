import { Request, Response } from "express";
import { ApiService } from "../utils/ApiService";
import { Product } from "../entity/Product";
import { productSchema, updateSchema } from "../utils/valiation";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";

const service = new ApiService(Product)

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await service.getAll()
  res.status(200).json(products)
}

export const getProductById = async (req: Request, res: Response) => {
  const {id} = req.params
  const product = await service.getOneById(id)
  
  if (!product) return res.status(404).json({'Message': 'Not found'})
  
  res.status(200).json(product)
}

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await service.getOneById(id)
  
  if (!product) return res.status(404).json({'Message': 'Not found'})
  service.deleteById(id)
  .execute()
  .then(() => res.status(200).json({'Message': 'Deleted'}))
}

export const createProduct = async (req: Request, res: Response) => {
  const { error, value } = productSchema.validate(req.body)
  
  if (error) return res.status(400).json({'Message': error.message})
  const {product_name, product_desc, product_price, product_amount, category_name} = req.body
  
  const category = await Category.findOneBy({
    category_name
  })
  if (!category) return res.status(404).json({'Message': 'Category not found you must create it before assign to product'})
  const product = new Product()
  product.product_name = product_name
  product.product_desc = product_desc
  product.product_price = product_price
  product.product_amount = product_amount
  product.category = category
  
  product.save()
  .then((product) => res.status(200).json(product))
}

export const updateProduct = async (req: Request, res: Response) => {
  const {id} = req.params
  const { value } = updateSchema.validate(req.body)
  
  AppDataSource.createQueryBuilder()
  .update(Product)
  .set(value)
  .where('id = :id', {id})
  .execute()
  .then(async () => {
    const product = await Product.findOneBy({
      id: Number(id)
    })
    res.status(200).json({product})
  })
}