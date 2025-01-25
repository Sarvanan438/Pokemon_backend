import Unauthenticated from "../../../shared/errors/UnAuthenticated";
import JWTService from "../../../shared/utility/JWT/JWT.service";
import User from "../../domain/entities/User";
import { IUserService, UserService } from "../../domain/services";
import { IUserRepository } from "../../infrastructure/repositories";
import RepositoryRegistry from "../../infrastructure/repositories/RepositoryRegistry";
import UserDTOFactory, {
  SimpleUserDTOFactory,
} from "../factories/UserDTO.factory";
export default interface AuthService {
  login(username: string, password: string): Promise<string>;
  logout(token: string): Promise<void>;
  register(username: string, password: string, email: string): Promise<void>;
  getUsers(): Promise<User[]>;
}
class SimpleAuthService implements AuthService {
  private static instance: AuthService;

  private constructor(
    private userDTOFactory: UserDTOFactory,
    private userService: IUserService,
    private userRepository: IUserRepository
  ) {}

  public static getInstance(): AuthService {
    if (!SimpleAuthService.instance) {
      SimpleAuthService.instance = new SimpleAuthService(
        new SimpleUserDTOFactory(),
        new UserService(RepositoryRegistry.getRepository("USER")),
        RepositoryRegistry.getRepository("USER")
      );
    }
    return SimpleAuthService.instance;
  }

  public login = async (username: string, password: string) => {
    const user = await this.userRepository.getUserByEmailOrUsername({
      username,
      email: "",
    });
    if (user.getPassword() === password)
      return JWTService.sign({
        userId: user.getId(),
        email: user.getEmail(),
        username: user.getUsername(),
      });
    throw new Unauthenticated("Invalid username or password");
  };

  public logout = async (token: string) => {
    if (!JWTService.verify(token)) throw new Unauthenticated("Invalid token");
  };

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

  public getUsers = async () => {
    const users = await this.userRepository.findAll();
    return users;
  };
}

export const AuthServiceInstance = SimpleAuthService.getInstance();
