import { Request, Response, NextFunction } from "express";
import { IIssuer } from "../models/issuer";
import { IUser } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      issuer?: IIssuer;
      user?: IUser;
    }
  }
}

export { Request, Response, NextFunction };
