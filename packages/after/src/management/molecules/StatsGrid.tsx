import { StatCard } from "@/management/atoms";

interface StatItem {
  label: string;
  value: number;
  variant: "blue" | "green" | "orange" | "red" | "gray";
}

interface StatsData {
  total: number;
  stat1: StatItem;
  stat2: StatItem;
  stat3: StatItem;
  stat4: StatItem;
}

interface StatsGridProps {
  stats: StatsData;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const { total, ...statItems } = stats;

  return (
    <div className="grid-cols-[minmax(130px, 1fr)] mb-[15px] grid grid-flow-col gap-2.5">
      <StatCard label="전체" value={total} variant="blue" />
      {Object.values(statItems).map((stat: StatItem) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} variant={stat.variant} />
      ))}
    </div>
  );
}
