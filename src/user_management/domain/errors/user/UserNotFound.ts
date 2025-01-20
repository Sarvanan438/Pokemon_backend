import CustomError from "../../../../shared/errors/CustomError";
import { USER_NOT_FOUND } from "../../constants/errors";

export default class UserNotFound extends CustomError {
  constructor(msg: string = "User not found") {
    super(USER_NOT_FOUND, msg);
  }
}
