import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { User } from './User'
import { BaseModel } from './BaseModel'

@Entity()
export class Address extends BaseModel{
  @Column({nullable: false})
  street: string
  
  @Column({nullable: false})
  city: string
  
  @PrimaryColumn({ type: 'int', name: 'userId'})
  @ManyToOne(() => User, (user) => user.addresses, {onDelete: 'CASCADE'})
  @JoinColumn()
  user: User
}