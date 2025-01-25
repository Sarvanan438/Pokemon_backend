import CustomError from "../../../../shared/errors/CustomError";
import { REPOSITORY_NOT_FOUND } from "../../constants/errors";

export default class RepositoryNotFound extends CustomError {
  constructor(msg = "Repository not found ") {
    super(REPOSITORY_NOT_FOUND, msg);
  }
}
