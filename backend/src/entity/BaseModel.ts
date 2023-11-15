import { 
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn 
} from "typeorm";
  
export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date
}