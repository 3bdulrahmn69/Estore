import {
  Column,
  Entity,
  OneToMany
} from "typeorm"
import { Product } from "./Product"
import { BaseModel } from "./BaseModel"

@Entity()
export class Category extends BaseModel {
  @Column({nullable: false, length: 60})
  category_name: string
  
  @OneToMany(() => Product, (product) => product.category, {onDelete: 'CASCADE'})
  products: Product[]
}