import { Repository, ObjectLiteral, DataSource } from "typeorm";
import IRepository from "../repository";

export default class TypeormRepository<T> implements IRepository<T> {
  private repository: Repository<ObjectLiteral>;

  constructor(
    private datasource: DataSource,
    private entity: T
  ) {
    //@ts-ignore
    this.repository = datasource.getRepository(entity);
  }
  findAll: () => Promise<any[]> = async () => {
    const res = await this.repository.find();
    return res;
  };

  getRepository = () => this.repository;
  //@ts-ignore
  save = async (item: T) => {
    //@ts-ignore
    const res = await this.repository.save(item);
    return res;
  };
  //@ts-ignore
  findOneById: (id: Id) => Promise<T> = async (id) => {
    const res = await this.repository.findOneBy({ id });
    return res;
  };
  //@ts-ignore
  findOneBy: (obj: any) => Promise<T> = async (filter) => {
    const res = await this.repository.findOneBy(filter);
    return res;
  };
}
