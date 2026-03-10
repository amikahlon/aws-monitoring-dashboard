import { Router } from "express";
import { getMetrics } from "../controllers/metrics.controller";

const metricsRouter = Router();

metricsRouter.get("/", getMetrics);

export default metricsRouter;