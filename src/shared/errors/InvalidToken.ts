import { INVALID_TOKEN } from "../constants/errors";
import CustomError from "./CustomError";

export default class InvalidToken extends CustomError {
  constructor(msg: string='Invalid token') {
    super(INVALID_TOKEN, msg);
  }
}