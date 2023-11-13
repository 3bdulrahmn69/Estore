import {Response, Request} from 'express'
import {ApiService} from '../utils/ApiService'
import { Category } from '../entity/Category'
import { AppDataSource } from '../data-source'

const service = new ApiService(Category)

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await service.getAll()
  res.status(200).json(categories)
}

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params
  const category = await service.getOneById(id)
  if (!category) return res.status(404).json({'Messsage': 'Not Found'})
  res.status(200).json(category)
}

export const deleteCategoryById = async (req: Request, res: Response) => {
  const {id} = req.params
  const category = await service.getOneById(id)
  if (!category) return res.status(404).json({'Messsage': 'Not Found'})
  service.deleteById(id)
  .execute()
  .then(() => res.status(200).json({'Message': 'Deleted'}))
}

export const getAllProductByCategoryName = async (req: Request, res: Response) => {
  const { name } = req.params
  const category = await AppDataSource.getRepository(Category)
  .findOne({
    relations: {
      products: true
    },
    where: {
      category_name: name
    }
  })
  if (!category) return res.status(404).json({'Message': 'Not Found'})
  res.status(200).json(category.products)
}