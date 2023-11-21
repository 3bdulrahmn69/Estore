import { NextFunction, Request, Response } from "express";
import { ApiService } from "../utils/ApiService";
import { Product } from "../entity/Product";
import { updateSchema } from "../validators/valiation";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { Like } from "typeorm";

const service = new ApiService(Product);

class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    const products = await Product.find({
      relations: {
        category: true,
      },
    });
    return res.status(200).json(products);
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const product = await service.getOneById(id);

    if (!product) next(new AppError("Product not found", 404));

    return res.status(200).json(product);
  }

  async deleteProductById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const product = await service.getOneById(id);

    if (!product) next(new AppError("Product not found", 404));
    service
      .deleteById(id)
      .execute()
      .then(() => res.status(200).json({ Message: "Deleted" }));
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {
      product_name,
      product_desc,
      product_price,
      product_amount,
      category_name,
    } = req.body;

    const category = await Category.findOneBy({
      category_name,
    });
    if (!category)
      next(
        new AppError(
          "Category not found you must create it before assign to product",
          404
        )
      );
    const product = new Product();
    product.product_name = product_name;
    product.product_desc = product_desc;
    product.product_price = product_price;
    product.product_amount = product_amount;
    product.category = category;

    product.save().then((product) => res.status(200).json(product));
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { value } = updateSchema.validate(req.body);

    AppDataSource.createQueryBuilder()
      .update(Product)
      .set(value)
      .where("id = :id", { id })
      .execute()
      .then(async () => {
        const product = await Product.findOneBy({
          id: Number(id),
        });
        res.status(200).json({ product });
      });
  };

  async searchAboutProduct(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;
    const products = await Product.find({
      where: {
        product_name: Like(`%${name}%`),
      },
      take: 5,
    });
    return res.status(200).json(products);
  }
}

const productController = new ProductController();

export default productController;
