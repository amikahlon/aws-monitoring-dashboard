import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import metricsRouter from "./routes/metrics.routes";
import { requestCounterMiddleware } from "./middleware/request-counter.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestCounterMiddleware);

app.use("/api/health", healthRouter);
app.use("/api/metrics", metricsRouter);

export default app;