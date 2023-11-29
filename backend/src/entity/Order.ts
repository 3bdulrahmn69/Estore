import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Product } from "./Product";
import { User } from "./User";
export enum Status {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  ARRIVED = "ARRIVED",
}

@Entity()
export class Order extends BaseModel {
  @Column()
  total: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ManyToMany(() => Product, (product) => product.orders, {
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "order_product" })
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user: User;
}
