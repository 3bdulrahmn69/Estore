import { Like } from "typeorm";
import { AppDataSource } from "../data-source";

export class ApiService {
  readonly Model: any;
  constructor(Model) {
    this.Model = Model
  }
  
  getAll(){
    return AppDataSource.manager.find(this.Model)
  }
  
  getOneById(id) {
    return this.Model.findOneBy({
      id
    })
  }
  
  deleteById(id) {
    return AppDataSource
    .createQueryBuilder()
    .delete()
    .from(this.Model)
    .where('id = :id', {id: id})
  }
  
  search(name) {
    return this.Model.findBy({
        "category_name": Like(`%${name}%`)
    })
  }
}