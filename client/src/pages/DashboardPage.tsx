import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import MetricCard from "../components/MetricCard";
import { api } from "../services/api";
import type { HealthResponse } from "../types/health";
import type { MetricsResponse } from "../types/metrics";

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      try {
        const [healthData, metricsData] = await Promise.all([
          api.getHealth(),
          api.getMetrics()
        ]);

        if (!isMounted) {
          return;
        }

        setHealth(healthData);
        setMetrics(metricsData);
        setError("");
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const loadMetricsOnly = async () => {
      try {
        const metricsData = await api.getMetrics();

        if (!isMounted) {
          return;
        }

        setMetrics(metricsData);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    loadDashboardData();

    const intervalId = window.setInterval(() => {
      loadMetricsOnly();
    }, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="dashboard-page">
      <DashboardHeader
        title="AWS Monitoring Dashboard"
        subtitle="Monitoring demo with React, Node.js, Docker, and mock metrics"
      />

      {loading && <p>Loading dashboard data...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && metrics && (
        <section className="metrics-grid">
          <MetricCard title="CPU Usage" value={`${metrics.cpuUsage}%`} />
          <MetricCard title="Memory Usage" value={`${metrics.memoryUsage}%`} />
          <MetricCard title="Request Count" value={metrics.requestCount} />
          <MetricCard title="Uptime" value={`${metrics.uptime}s`} />
        </section>
      )}

      <section className="status-card">
        <h2>Backend Health</h2>

        {health && (
          <div className="status-grid">
            <div>
              <span className="label">Status</span>
              <strong>{health.status}</strong>
            </div>

            <div>
              <span className="label">Service</span>
              <strong>{health.service}</strong>
            </div>

            <div>
              <span className="label">Environment</span>
              <strong>{health.environment}</strong>
            </div>

            <div>
              <span className="label">Timestamp</span>
              <strong>{health.timestamp}</strong>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}