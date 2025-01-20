import initializeDataSource from "../../../shared/datasource/datasource";
import User from "../../domain/entities/User";
import FailedCreatingUser from "../../domain/errors/user/FailedCreatingUser";
import UserNotFound from "../../domain/errors/user/UserNotFound";
import UserModelFactory from "../factories/UserModelFactory";
import UserModel from "../models/User.model";

export default class UserRepository {
  constructor() {}

  async getRepository() {
    return (await initializeDataSource())?.getRepository(UserModel);
  }

  createUserEntity(user: UserModel): User {
    return UserModelFactory.createDomainEntity(user);
  }
  async save(user: User) {
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
    return this.createUserEntity(res);
  }
}
