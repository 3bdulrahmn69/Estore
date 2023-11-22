import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { Order } from "../entity/Order";
import { Cart } from "../entity/Cart";
import { CartProduct } from "../entity/CartProduct";
import { Product } from "../entity/Product";
import { User } from "../entity/User";

class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    const cart = await Cart.findOne({
      where: {
        id: user.cart.id,
      },
      relations: {
        products: true,
      },
    });
    if (cart.products.length === 0)
      return next(new AppError("cart is empty", 401));
    const cartProduct = await CartProduct.findBy({
      cartId: cart.id,
    });

    for (let i = 0; i < cart.products.length; i++) {
      console.log(cart.products[i], cartProduct[i]);
      if (cart.products[i].product_amount < cartProduct[i].amount) {
        return next(
          new AppError("Amount is not available in stock right now", 404)
        );
      } else {
        const product = await Product.findOneBy({
          id: cart.products[i].id,
        });
        product.product_amount -= cartProduct[i].amount;
        await product.save();
        cart.products[i] = product;
      }
    }
    await cart.save();
    const order = new Order();
    order.products = cart.products;
    order.total = req.body.total;
    order.user = user;

    await order.save();
    res.status(200).json(order);
  }

  async getOrdersOfUser(req: Request, res: Response) {
    const user = (req as any).user;
    const orders = await Order.find({
      where: {
        user: user.id,
      },
      relations: {
        products: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: orders,
    });
  }

  async deleteOrderOfUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = (req as any).user;
    const order = await Order.findOne({
      where: {
        user: user.id,
        id: Number(id),
      },
    });
    if (!order) return next(new AppError("Order not found", 404));
    await order.remove();
    res.status(200).json({
      status: "Deleted",
    });
  }

  async getAllOrders(req: Request, res: Response) {
    const order = await Order.find({
      relations: {
        user: true,
        products: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: order,
    });
  }
}

const orderController = new OrderController();
export default orderController;
