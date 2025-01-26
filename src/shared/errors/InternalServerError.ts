import { INTERNAL_SERVER_ERROR } from "../constants/errors";
import CustomError from "./CustomError";

export default class InternalServerError extends CustomError {
  constructor(msg = "Internal server error") {
    super(INTERNAL_SERVER_ERROR, msg);
  }
}
