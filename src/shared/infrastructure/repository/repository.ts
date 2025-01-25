import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Id } from "../../utility/Id/Id";

export default interface IRepository<T> {
  save: (item: T) => Promise<any>;
  findOneById: (id: Id) => Promise<any>;
  findAll: () => Promise<any[]>;
}
