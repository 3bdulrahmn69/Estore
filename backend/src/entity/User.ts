import {
  Column,
  Entity,
  Unique,
  BeforeUpdate,
  BeforeInsert,
  OneToOne,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { BaseModel } from "./BaseModel";
import * as bcrypt from "bcrypt";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { Address } from "./Address";
import { Review } from "./Review";
import { Order } from "./Order";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User extends BaseModel {
  @Column({ nullable: false, length: 45 })
  first_name: string;

  @Column({ nullable: false, length: 45 })
  last_name: string;

  @Column({ nullable: false, length: 60 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => Cart, (cart) => cart.user, { onDelete: "CASCADE" })
  cart: Cart;

  @OneToOne(() => Wishlist, (wishlist) => wishlist.user, {
    onDelete: "CASCADE",
  })
  wishlist: Wishlist;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Review, (review) => review.user, { onDelete: "CASCADE" })
  reviews: Review[];
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
