import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Category";
import { BaseModel } from "./BaseModel";
import { Image } from "./Image";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { Review } from "./Review";
import { Order } from "./Order";

@Entity()
export class Product extends BaseModel {
  @Column({ nullable: false })
  product_name: string;

  @Column({ nullable: false, length: 2048 })
  product_desc: string;

  @Column("float", { nullable: false, default: 0 })
  product_price: number;

  @Column({ nullable: false, default: 0 })
  product_amount: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category: Category;

  @ManyToMany(() => Order, (order) => order.products, { onDelete: "CASCADE" })
  orders: Order[];

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToMany(() => Cart, (cart) => cart.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({
    name: "cart_product",
    joinColumn: {
      name: "productId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "cartId",
      referencedColumnName: "id",
    },
  })
  carts: Cart[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.products, {
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "wishlist_product" })
  wishlists: Wishlist[];
}
