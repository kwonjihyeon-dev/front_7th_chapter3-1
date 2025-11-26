import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  variant?: "blue" | "green" | "orange" | "pink" | "gray";
  className?: string;
}

export function StatCard({ label, value, variant = "blue", className }: StatCardProps) {
  const variantStyles = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    orange: "bg-orange-50 border-orange-200",
    pink: "bg-pink-50 border-pink-200",
    gray: "bg-gray-50 border-gray-200",
  };

  const textStyles = {
    blue: "text-blue-700",
    green: "text-green-700",
    orange: "text-orange-700",
    pink: "text-pink-700",
    gray: "text-gray-700",
  };

  return (
    <div className={cn("rounded-lg border p-6", variantStyles[variant], className)}>
      <div className="mb-2 text-sm font-medium text-gray-600">{label}</div>
      <div className={cn("text-3xl font-bold", textStyles[variant])}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
    </div>
  );
}
