import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { api } from "../services/api";
import type { HealthResponse } from "../types/health";

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const data = await api.getHealth();
        setHealth(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadHealth();
  }, []);

  return (
    <main className="dashboard-page">
      <DashboardHeader
        title="AWS Monitoring Dashboard"
        subtitle="Frontend connected to the backend health endpoint"
      />

      <section className="status-card">
        <h2>Backend Health</h2>

        {loading && <p>Loading backend status...</p>}
        {error && <p className="error-text">{error}</p>}

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