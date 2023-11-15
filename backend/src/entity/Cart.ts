import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToMany
} from 'typeorm'
import { BaseModel } from './BaseModel'
import { User } from './User'
import { Product } from './Product'

@Entity()
export class Cart extends BaseModel {
  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User
  
  @ManyToMany(() => Product, (product) => product.carts)
  products: Product[]
}