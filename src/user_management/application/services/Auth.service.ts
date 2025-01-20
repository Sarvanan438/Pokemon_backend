import { IUserService, UserService } from "../../domain/services/user.service";
import User from "../../infrastructure/models/User.model";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import UserDTOFactory, {
  SimpleUserDTOFactory,
} from "../factories/UserDTO.factory";
export default interface AuthService {
  login(username: string, password: string): Promise<string>;
  logout(token: string): Promise<void>;
  register(username: string, password: string, email: string): Promise<void>;
}
class SimpleAuthService implements AuthService {
  private static instance: AuthService;

  private constructor(
    private userDTOFactory: UserDTOFactory,
    private userService: IUserService
  ) {}

  public static getInstance(): AuthService {
    if (!SimpleAuthService.instance) {
      SimpleAuthService.instance = new SimpleAuthService(
        new SimpleUserDTOFactory(),
        new UserService(new UserRepository())
      );
    }
    return SimpleAuthService.instance;
  }

  public async login(username: string, password: string): Promise<string> {
    const LoginDTO = this.userDTOFactory.createLoginDTO({ username, password });
    return "login_token";
  }

  public async logout(token: string): Promise<void> {
    // Implement logout logic here
  }

  public async register(
    username: string,
    password: string,
    email: string
  ): Promise<void> {
    const userDTO = this.userDTOFactory.createUserDTO({
      username,
      password,
      email,
    });
    const createdUser = await this.userService.createUser(userDTO);
    console.log("user created", createdUser);
  }
}

export const AuthServiceInstance = SimpleAuthService.getInstance();
