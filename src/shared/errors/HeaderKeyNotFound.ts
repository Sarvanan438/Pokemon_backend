import { HEADER_KEY_NOT_FOUND } from "../constants/errors";
import CustomError from "./CustomError";

export default class HeaderKeyNotFound extends CustomError {
  constructor(msg = "Header key not found.") {
    super(HEADER_KEY_NOT_FOUND, msg);
  }
}
