import HeaderKeyNotFound from "../../errors/HeaderKeyNotFound";
import { Request } from "express";

export default class ExpressReqUtilities {
  static getHeader(req: Request, key: string) {
    if (!(key in req.headers)) throw new HeaderKeyNotFound();
    return req.headers[key];
  }

  static getHeaderByKeyOrDefault(
    req: Request,
    key: string,
    defaultValue: string
  ) {
    try {
      return ExpressReqUtilities.getHeader(req, key);
    } catch (e) {
      if (e instanceof HeaderKeyNotFound) return defaultValue;
      throw e;
    }
  }
}
