import { Request, Response, NextFunction } from "express";
import { incrementRequestCount } from "../services/request-counter.service";

export const requestCounterMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  incrementRequestCount();
  next();
};