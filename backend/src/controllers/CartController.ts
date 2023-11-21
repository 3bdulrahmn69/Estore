import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { Cart } from "../entity/Cart";
import { Product } from "../entity/Product";
import { CartProduct } from "../entity/CartProduct";
import { number } from "joi";

class CartController {
  async getAllproductOfCard(req: Request, res: Response) {
    const user = (req as any).user;
    const cart = await Cart.findOne({
      where: {
        id: user.cart.id,
      },
      relations: {
        products: true,
      },
    });
    const total = cart.products.reduce((acc, obj) => {
      return acc + obj.product_price;
    }, 0);
    console.log(total);
    res.status(200).json({
      status: "success",
      data: cart.products,
      total,
    });
  }

  async addProductToCart(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const product = await Product.findOneBy({
      id: Number(id),
    });
    const user = (req as any).user;
    if (!product)
      return next(new AppError("Product not found, id is wrong", 404));

    const cart = await Cart.findOne({
      where: {
        id: user.cart.id,
      },
      relations: {
        products: true,
      },
    });
    if (!cart.products.includes(product)) cart.products.push(product);
    product.product_amount--;
    await cart.save();
    res.status(200).json({
      status: "success",
      data: cart,
    });
  }

  async emptyTheCart(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    const cart = await Cart.findOne({
      where: {
        id: user.cart.id,
      },
      relations: {
        products: true,
      },
    });
    cart.products = [];
    await cart.save();
    res.status(200).json({
      status: "success",
      data: cart,
    });
  }

  async delteProductFromCart(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = (req as any).user;
    const cart = await Cart.findOne({
      where: {
        id: user.cart.id,
      },
      relations: {
        products: true,
      },
    });
    cart.products = cart.products.filter((product) => {
      return product.id !== Number(id);
    });
    await cart.save();
    res.status(200).json({
      status: "success",
      data: cart,
    });
  }

  async updateAmountOfTheProductInTheCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { amount } = req.body;

    const productFromCart = await CartProduct.findOneBy({
      productId: Number(id),
    });

    if (!productFromCart) return next(new AppError("Product not found", 404));

    productFromCart.amount = amount;
    await productFromCart.save();

    res.status(200).json({
      status: "success",
      productFromCart,
    });
  }
}

const cartController = new CartController();
export default cartController;
