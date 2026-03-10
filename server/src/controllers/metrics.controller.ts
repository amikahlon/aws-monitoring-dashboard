import { Request, Response } from "express";
import { getMockMetrics } from "../services/metrics.service";

export const getMetrics = (_req: Request, res: Response) => {
  res.status(200).json(getMockMetrics());
};