import { ITokenExtractor } from "../ITokenExtractor";

export default class BearerTokenExtractor implements ITokenExtractor {
  extractToken(token: string): string {
    return token.trim().split(" ")[1];
  }
}
