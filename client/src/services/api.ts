import type { HealthResponse } from "../types/health";

const API_BASE_URL = "http://localhost:4000/api";

export const api = {
  async getHealth(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error("Failed to fetch backend health status");
    }

    return response.json();
  }
};