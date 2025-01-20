import CustomError from "../../../../shared/errors/CustomError";
import { FAILED_TO_CREATE_USER } from "../../constants/errors";

export default class FailedCreatingUser extends CustomError {
  constructor(msg: string = "Failed creating user") {
    super(FAILED_TO_CREATE_USER, msg);
  }
}
