export const getMockMetrics = () => {
  return {
    cpuUsage: Math.floor(Math.random() * 60) + 20,
    memoryUsage: Math.floor(Math.random() * 50) + 30,
    requestCount: Math.floor(Math.random() * 1000) + 100,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  };
};