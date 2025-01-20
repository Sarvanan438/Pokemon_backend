import { TOKEN_EXPIRED } from "../constants/errors";
import CustomError from "./CustomError";

export default class TokenExpired extends CustomError {
  constructor(msg: string='Token expired') {
    super(TOKEN_EXPIRED, msg);
  }
}