import { Entity, OneToOne, JoinColumn, ManyToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Wishlist extends BaseModel {
  @OneToOne(() => User, (user) => user.wishlist, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @ManyToMany((type) => Product, (product) => product.wishlists)
  products: Product[];
}
