import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

export type ExpressApiHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export interface ExpressReqHeaders extends IncomingHttpHeaders {}
