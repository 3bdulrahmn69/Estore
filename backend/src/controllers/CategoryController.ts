import { Response, Request, NextFunction } from "express";
import { ApiService } from "../utils/ApiService";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";
import { categorySchema } from "../validators/valiation";
import AppError from "../utils/appError";
import { Like } from "typeorm";
import { cloud } from "../utils/Cloudinary";
import { Image } from "../entity/Image";
import { Product } from "../entity/Product";

const service = new ApiService(Category);

class CategoryController {
  getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const categories = await Category.find({
      relations: {
        image: true,
      },
    });
    return res.status(200).json(categories);
  };

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await service.getOneById(id);
    if (!category) next(new AppError("Category not found", 404));
    return res.status(200).json(category);
  };

  deleteCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const category = await service.getOneById(id);
    if (!category) next(new AppError("Category not found", 404));
    service
      .deleteById(id)
      .execute()
      .then(() => res.status(200).json({ Message: "Deleted" }));
  };

  getAllProductByCategoryName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.params;
    const category: any = await Category.findOne({
      where: {
        category_name: name,
      },
      relations: {
        products: {
          images: true,
          category: true,
        },
      },
    });
    if (!category) next(new AppError("Category not found", 404));

    return res.status(200).json(category.products);
  };

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { category_name } = req.body;

    if (!req.file) return next(new AppError("Image not found", 404));
    const { path } = req.file;
    const { secure_url } = await cloud.uploader.upload(path, {
      folder: "category",
    });
    const image = new Image();
    image.image = secure_url;
    const category = new Category();
    category.category_name = category_name;
    category.image = image;
    await image.save();
    await category.save();
    res.status(201).json(category);
  };

  updateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = AppDataSource.createQueryBuilder().update(Category);

    const { category_name } = req.body;

    if (category_name !== undefined)
      category.set({ category_name: category_name });
    category
      .where("id = :id", { id })
      .execute()
      .then(async () => {
        const category = await Category.findOneBy({
          id: Number(id),
        });
        res.status(200).json(category);
      });
  };

  async searchAboutCategory(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;
    const categories = await Category.find({
      where: {
        category_name: Like(`%${name}%`),
      },
      relations: {
        image: true,
      },
      take: 5,
    });
    return res.status(200).json(categories);
  }
}

const categoryController = new CategoryController();

export default categoryController;
