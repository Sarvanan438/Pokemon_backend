import { UserDTO } from "../../../application/dto/user";
import UserRepository from "../../../infrastructure/repositories/impl/UserRepository";
import User from "../../entities/User";
import UserAlreadyExists from "../../errors/user/UserAlreadyExists";
import UserNotFound from "../../errors/user/UserNotFound";
/**
 * This is domain service that is intended to wrap the domain related operation and logic
 * which doesn't fit within the entity unless design principles like SOLID ,clean code are violated
 * We can also place codes that span mulitple entity or doesn't really fit/is a responsibility of single entity
 */
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
  // only converts dto to user object
  // we can change to factory or hardcode it won't effect the calling code as long a entity is sent back
  createUserEntity(userDto: UserDTO) {
    return new User(userDto.username, userDto.email, userDto.password);
  }
  // the name clearly says the create user only creates if the user is unique
  // can add email or username appending but looks way too long
  // user is unique if both username and email are unique
  async createUserIfUnique(userDto: UserDTO): Promise<User> {
    const doesUserExist = await this.checkIfUsernameAndEmailExists(
      userDto.username,
      userDto.email
    );
    if (doesUserExist) throw new UserAlreadyExists();
    // old- we can delegate to factory , but the code now changes only for user level change
    // new : delegating keeps the responsibility single and does only one level below the name indication .So good abstraction
    const user = this.createUserEntity(userDto);
    return await this.userRepository.saveUser(user);
  }
  // service is domain service and provides a create user api
  // the logic for the method is not needed by auth controller only the need to create user
  async createUser(user: UserDTO): Promise<User> {
    return await this.createUserIfUnique(user);
  }
}
