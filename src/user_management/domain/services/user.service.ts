import { UserDTO } from "../../application/dto/user";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import User from "../entities/User";
import UserAlreadyExists from "../errors/user/UserAlreadyExists";
import UserNotFound from "../errors/user/UserNotFound";

export interface IUserService {
  createUser(user: UserDTO): Promise<User>;
}

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async checkIfUsernameAndEmailExists(
    username: string,
    email: string
  ): Promise<boolean> {
    try {
      await this.userRepository.getUserByEmailOrUsername({ username, email });
      return true;
    } catch (error) {
      if (error instanceof UserNotFound) return false;
      throw error;
    }
  }
  async createUser(userDto: UserDTO): Promise<User> {
    const doesUserExist = await this.checkIfUsernameAndEmailExists(
      userDto.username,
      userDto.email
    );
    if (doesUserExist) throw new UserAlreadyExists();
    const user = new User(userDto.username, userDto.email, userDto.password);
    return await this.userRepository.save(user);
  }
}
