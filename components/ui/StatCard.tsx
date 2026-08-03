type StatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  progress?: number;
};

export default function StatCard({
  label,
  value,
  icon,
  trend,
  progress,
}: StatCardProps) {
  return (
    <div className="rounded-xl border p-6 border-accent bg-white">
      <div className="flex justify-between items-start">
        <span className="font-semibold text-xs uppercase text-secondary">
          {label}
        </span>
        <span className="rounded-xl p-2 bg-icon-blue">{icon}</span>
      </div>
      <p className="font-semibold text-[32px]">{value}</p>
      {trend && (
        <p
          className={`text-base mt-4 ${trend.positive ? "text-text-green" : "text-text-red"}`}
        >
          {trend.positive ? "▲" : "▼"} {trend.value}
        </p>
      )}
      {progress !== undefined && <span>Progreso</span>}
    </div>
  );
}
