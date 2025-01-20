import { UNAUTHENTICATED } from "../constants/errors";
import CustomError from "./CustomError";

export default class Unauthenticated extends CustomError {
  constructor(msg: string='User is not authenticated') {
    super(UNAUTHENTICATED, msg);
  }
}