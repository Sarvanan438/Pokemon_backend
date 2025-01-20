import { NextFunction, Request, Response } from "express";
import AuthService, {
  AuthServiceInstance,
} from "../../application/services/Auth.service";
class AuthControllers {
  private static instance: AuthControllers;

  private constructor(private authService: AuthService) {}

  public static getInstance(): AuthControllers {
    if (!AuthControllers.instance) {
      AuthControllers.instance = new AuthControllers(AuthServiceInstance);
    }
    return AuthControllers.instance;
  }

  public async login(req: Request, res: Response): Promise<void> {
    const token = await this.authService.login(
      req.body.username,
      req.body.password
    );
    res.status(200).send({ message: "login", token });
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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

  public async logout(req: Request, res: Response): Promise<void> {
    await this.authService.logout(req.body.token);
    res.status(200).send({ message: "logout successful" });
  }
}

export default AuthControllers.getInstance();
