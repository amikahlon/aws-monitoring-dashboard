type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export default function MetricCard({
  title,
  value,
  subtitle
}: MetricCardProps) {
  return (
    <article className="metric-card">
      <span className="metric-card__title">{title}</span>
      <strong className="metric-card__value">{value}</strong>
      {subtitle && <span className="metric-card__subtitle">{subtitle}</span>}
    </article>
  );
}