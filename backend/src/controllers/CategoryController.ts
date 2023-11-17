import {Response, Request, NextFunction} from 'express'
import {ApiService} from '../utils/ApiService'
import { Category } from '../entity/Category'
import { AppDataSource } from '../data-source'
import { categorySchema } from '../utils/valiation'

const service = new ApiService(Category)

class CategoryController {
  
  getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await service.getAll()
    return res.status(200).json(categories)
  }
  
  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const category = await service.getOneById(id)
    if (!category) return res.status(404).json({'Messsage': 'Not Found'})
    return res.status(200).json(category)
  }
  
  deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const category = await service.getOneById(id)
    if (!category) return res.status(404).json({'Messsage': 'Not Found'})
    service.deleteById(id)
    .execute()
    .then(() => res.status(200).json({'Message': 'Deleted'}))
  }
  
  getAllProductByCategoryName = async (req: Request, res: Response, next: NextFunction) => {
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
    return res.status(200).json(category.products)
  }
  
  createCategory = async (req: Request, res: Response, next: NextFunction) => {   
    const {category_name} = req.body
    
    const category = new Category()
    category.category_name = category_name
    try {
      await category.save()
      res.status(201).json(category)
    } catch (err) {
      res.status(404).json({'Message': `${err}`})
    }
  }
  
  updateCategory =  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const category =  AppDataSource.createQueryBuilder()
    .update(Category)
    
    const {category_name} = req.body
    
    if (category_name !== undefined) category.set({category_name: category_name})
    category.where('id = :id', {id})
    .execute()
    .then(async () => {
      const category = await Category.findOneBy({
        id: Number(id)
      })
      res.status(200).json(category)
    })
  }
}

const categoryController = new CategoryController()

export default categoryController