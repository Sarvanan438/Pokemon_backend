import HeaderKeyNotFound from "../../errors/HeaderKeyNotFound";
import InvalidToken from "../../errors/InvalidToken";
import { ExpressApiHandlerType } from "../../types";
import ExpressReqUtilities from "../ExpressUtilities/ExpressReqUtilities";
import { ITokenExtractor } from "../TokenExtractor/ITokenExtractor";
import ITokenVerifier from "../TokenVerifier/ITokenVerifier";

const authMiddleware: (
  tokenExtractor: ITokenExtractor,
  tokenVerifier: ITokenVerifier
) => ExpressApiHandlerType =
  (tokenExtractor, tokenVerifier) => (req, res, next) => {
    try {
      let token;
      try {
        token = ExpressReqUtilities.getHeader(req, "authorization") as string;
        token = tokenExtractor.extractToken(token);
      } catch (e) {
        if (e instanceof HeaderKeyNotFound)
          throw new InvalidToken("Token missing");
      }
      console.log(token);
      if (token && tokenVerifier.verify(token)) {
        next();
      } else {
        throw new InvalidToken("Token either invalid or expired");
      }
    } catch (e) {
      next(e);
    }
  };

export default authMiddleware;
