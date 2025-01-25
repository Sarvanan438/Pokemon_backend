import JWTService from "../../JWT/JWT.service";
import ITokenVerifier from "../ITokenVerifier";

export default class JWTVerifier implements ITokenVerifier {
  verify(token: string): boolean | Promise<boolean> {
    return !!JWTService.verify(token);
  }
}
