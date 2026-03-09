import { Request, Response } from "express";

export const getHealth = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "backend",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
};