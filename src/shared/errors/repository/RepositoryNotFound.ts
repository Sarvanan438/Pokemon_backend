import { REPOSITORY_NOT_FOUND } from "../../constants/errors";
import CustomError from "../CustomError";

export default class RepositoryNotFound extends CustomError {
  constructor(msg = "Repository not found ") {
    super(REPOSITORY_NOT_FOUND, msg);
  }
}
