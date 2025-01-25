import { DataSource } from "typeorm";
import IRepository from "../../../../shared/infrastructure/repository/repository";
import User from "../../../domain/entities/User";
import FailedCreatingUser from "../../../domain/errors/user/FailedCreatingUser";
import UserNotFound from "../../../domain/errors/user/UserNotFound";
import UserModelFactory from "../../factories/UserModelFactory";
import UserModel from "../../models/User.model";
import TypeormRepository from "../../../../shared/infrastructure/repository/impl/TypeormRepository";
import IUserRepository from "../IUserRepository";

export default class UserRepository
  extends TypeormRepository<UserModel>
  implements IUserRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, UserModel as any);
  }

  createUserEntity(user: UserModel): User {
    return UserModelFactory.createDomainEntity(user);
  }
  async saveUser(user: User) {
    console.log("svaing");
    const userModel = UserModelFactory.createModel(user);
    const repository = await this.getRepository();
    const res = await repository?.save(userModel);
    if (!res) throw new FailedCreatingUser();
    return this.createUserEntity(res);
  }

  async getUserByEmailOrUsername({
    username,
    email,
  }: {
    username: string;
    email: string;
  }): Promise<User> {
    const repository = await this.getRepository();
    const res = await repository?.findOne({ where: [{ username }, { email }] });
    if (!res) throw new UserNotFound();
    return this.createUserEntity(res as UserModel);
  }
}
