import {
  CloudWatchClient,
  GetMetricDataCommand,
  MetricDataQuery
} from "@aws-sdk/client-cloudwatch";
import { getRequestCount } from "./request-counter.service";

type MetricsResult = {
  cpuUsage: number;
  memoryUsage: number;
  requestCount: number;
  uptime: number;
  timestamp: string;
};

const region = process.env.AWS_REGION || "eu-central-1";
const clusterName = process.env.ECS_CLUSTER_NAME;
const serviceName = process.env.ECS_SERVICE_NAME;

const cloudWatchClient = new CloudWatchClient({ region });

const getLatestMetricValue = (values?: number[]): number => {
  if (!values || values.length === 0) {
    return 0;
  }

  return Number(values[values.length - 1].toFixed(2));
};

export const getCloudWatchMetrics = async (): Promise<MetricsResult> => {
  if (!clusterName || !serviceName) {
    return {
      cpuUsage: 0,
      memoryUsage: 0,
      requestCount: getRequestCount(),
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    };
  }

  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 10 * 60 * 1000);

  const metricDataQueries: MetricDataQuery[] = [
    {
      Id: "cpuUsage",
      MetricStat: {
        Metric: {
          Namespace: "AWS/ECS",
          MetricName: "CPUUtilization",
          Dimensions: [
            { Name: "ClusterName", Value: clusterName },
            { Name: "ServiceName", Value: serviceName }
          ]
        },
        Period: 60,
        Stat: "Average"
      },
      ReturnData: true
    },
    {
      Id: "memoryUsage",
      MetricStat: {
        Metric: {
          Namespace: "AWS/ECS",
          MetricName: "MemoryUtilization",
          Dimensions: [
            { Name: "ClusterName", Value: clusterName },
            { Name: "ServiceName", Value: serviceName }
          ]
        },
        Period: 60,
        Stat: "Average"
      },
      ReturnData: true
    }
  ];

  const command = new GetMetricDataCommand({
    StartTime: startTime,
    EndTime: endTime,
    MetricDataQueries: metricDataQueries,
    ScanBy: "TimestampAscending"
  });

  const response = await cloudWatchClient.send(command);

  const cpuMetric = response.MetricDataResults?.find(
    (item) => item.Id === "cpuUsage"
  );

  const memoryMetric = response.MetricDataResults?.find(
    (item) => item.Id === "memoryUsage"
  );

  return {
    cpuUsage: getLatestMetricValue(cpuMetric?.Values),
    memoryUsage: getLatestMetricValue(memoryMetric?.Values),
    requestCount: getRequestCount(),
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  };
};