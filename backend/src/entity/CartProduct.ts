import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("cart_product")
export class CartProduct extends BaseEntity {
  @Column()
  @PrimaryColumn()
  cartId: number;

  @Column()
  @PrimaryColumn()
  productId: number;

  @Column({ default: 1 })
  amount: number;
}
