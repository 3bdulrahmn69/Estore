import {
  Column,
  Entity,
  ManyToOne
} from 'typeorm'
import { BaseModel } from './BaseModel'
import { User } from './User'
import { Product } from './Product'

@Entity()
export class Review extends BaseModel {
  @Column({nullable: false, length: 1024})
  review: string
  
  @ManyToOne(() => User, (user)=> user.reviews, {onDelete:'CASCADE'})
  user: User
  
  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE'
  })
  product: Product
}
