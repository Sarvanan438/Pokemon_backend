import { AuthService, AuthServiceInstance } from "../../application/services";
import { ExpressApiHandlerType } from "../../../shared/types";
class AuthControllers {
  private static instance: AuthControllers;

  private constructor(private authService: AuthService) {}

  public static getInstance(): AuthControllers {
    if (!AuthControllers.instance) {
      AuthControllers.instance = new AuthControllers(AuthServiceInstance);
    }
    return AuthControllers.instance;
  }

  public login: ExpressApiHandlerType = async (req, res, next) => {
    try {
      const token = await this.authService.login(
        req.body.username,
        req.body.password
      );
      res.status(200).send({ message: "login", token });
    } catch (e) {
      next(e);
    }
  };

  public register: ExpressApiHandlerType = async (req, res, next) => {
    try {
      await this.authService.register(
        req.body.username,
        req.body.password,
        req.body.email
      );
      res.status(201).send({ message: "registered user " });
    } catch (e) {
      next(e);
    }
  };

  public logout: ExpressApiHandlerType = async (req, res, next) => {
    try {
      await this.authService.logout(req.body.token);
      res.status(200).send({ message: "logout successful" });
    } catch (e) {
      next(e);
    }
  };

  public getUsers: ExpressApiHandlerType = async (req, res, next) => {
    try {
      const users = await this.authService.getUsers();
      console.log(users);
      res.status(200).json({ message: "success", users });
    } catch (e) {
      next(e);
    }
  };
}

export default AuthControllers.getInstance();
