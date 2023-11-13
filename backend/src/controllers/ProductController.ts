import { Request, Response } from "express";
import { ApiService } from "../utils/ApiService";
import { Product } from "../entity/Product";

const service = new ApiService(Product)

export const getAllProduct = async (req: Request, res: Response) => {
  const proucts = await service.getAll()
  res.status(200).json(proucts)
}