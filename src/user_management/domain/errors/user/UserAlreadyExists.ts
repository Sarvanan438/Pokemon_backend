import CustomError from "../../../../shared/errors/CustomError";
import { USER_ALREADY_EXISTS } from "../../constants/errors";

export default class UserAlreadyExists extends CustomError {
  constructor(msg: string = "User already exists") {
    super(USER_ALREADY_EXISTS, msg);
  }
}
