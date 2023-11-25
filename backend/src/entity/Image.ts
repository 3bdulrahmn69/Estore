import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { Product } from "./Product";
import { BaseModel } from "./BaseModel";
import { Category } from "./Category";

@Entity()
export class Image extends BaseModel {
  @Column({ nullable: false })
  image: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  product: Product;

  @OneToOne(() => Category, (category) => category.image)
  category: Category;
}
