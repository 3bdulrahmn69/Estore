import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Product } from "./Product";
import { BaseModel } from "./BaseModel";
import { Image } from "./Image";

@Entity()
export class Category extends BaseModel {
  @Column({ nullable: false, length: 60 })
  category_name: string;

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: "CASCADE",
  })
  products: Product[];

  @OneToOne((type) => Image, (image) => image.category)
  @JoinColumn()
  image: Image;
}
