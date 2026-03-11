import { Request, Response } from "express";
import { getCloudWatchMetrics } from "../services/metrics.service";

export const getMetrics = async (_req: Request, res: Response) => {
  try {
    const metrics = await getCloudWatchMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    console.error("Failed to load CloudWatch metrics:", error);

    res.status(500).json({
      message: "Failed to load metrics"
    });
  }
};