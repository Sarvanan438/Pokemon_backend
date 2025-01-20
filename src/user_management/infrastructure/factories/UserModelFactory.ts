import User from "../../domain/entities/User";
import UserModel from "../models/User.model";
export default class UserModelFactory {
  static createModel(user: User): UserModel {
    const model = new UserModel();
    if (user.getId()) {
      model.id = user.getId()!;
    }

    model.username = user.getUsername();
    model.email = user.getEmail();
    model.password = user.getPassword();
    return model;
  }

  static createDomainEntity(model: UserModel): User {
    const user = new User(model.username, model.email, model.password);
    user.setId(model.id);
    return user;
  }
}
