import { NextFunction, Request, Response } from "express";
import CustomError from "../../errors/CustomError";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(422).json({ message: err.message, code: err.errorType });
  }
  return res.status(500).json({ message: "Something went wrong" });
}
