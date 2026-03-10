import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import metricsRouter from "./routes/metrics.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/metrics", metricsRouter);

export default app;