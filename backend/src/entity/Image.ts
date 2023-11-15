import {
  Column,
  Entity,
  ManyToOne
} from 'typeorm'

import { Product } from './Product'
import { BaseModel } from './BaseModel'


@Entity()
export class Image extends BaseModel{
  @Column({nullable: false})
  image: string
  
  @ManyToOne(() => Product, (product) => product.images)
  product: Product
}