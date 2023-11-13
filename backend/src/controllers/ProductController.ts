import { Request, Response } from "express";
import { ApiService } from "../utils/ApiService";
import { Product } from "../entity/Product";

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