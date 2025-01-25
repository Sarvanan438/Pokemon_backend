import IRepository from "../../../shared/infrastructure/repository/repository";
import User from "../../domain/entities/User";
import UserModel from "../models/User.model";

export default interface IUserRepository extends IRepository<UserModel> {
  getUserByEmailOrUsername({
    username,
    email,
  }: {
    username: string;
    email: string;
  }): Promise<User>;
}
