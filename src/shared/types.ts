import { NextFunction, Request, Response } from "express";

export type ExpressApiHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
