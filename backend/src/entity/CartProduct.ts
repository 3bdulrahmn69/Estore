import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity("cart_product")
export class CartProduct extends BaseEntity {
  @Column({ default: 1 })
  amount: number;

  @Column()
  @PrimaryColumn()
  cartId: number;

  @Column()
  @PrimaryColumn()
  productId: number;
}
