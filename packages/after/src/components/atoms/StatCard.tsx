import { ShadcnCard, ShadcnCardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statCardVariants = cva("rounded-[var(--radius-md)] border", {
  variants: {
    variant: {
      blue: "bg-[var(--color-info-50)] border-[var(--color-info-200)]",
      green: "bg-[var(--color-alert-success-bg)] border-[var(--color-alert-success-border)]",
      orange: "bg-[var(--color-warning-50)] border-[var(--color-warning-200)]",
      red: "bg-[var(--color-alert-error-bg)] border-[var(--color-alert-error-border)]",
      gray: "bg-[var(--color-gray-100)] border-[var(--color-secondary-300)]",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

const statCardValueVariants = cva("text-[length:var(--font-size-stat-value)] font-bold", {
  variants: {
    variant: {
      blue: "text-[var(--color-primary-500)]",
      green: "text-[var(--color-success-500)]",
      orange: "text-[var(--color-warning-500)]",
      red: "text-[var(--color-danger-500)]",
      gray: "text-[var(--color-secondary-700)]",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  className?: string;
}

export function StatCard({ label, value, variant = "blue", className }: StatCardProps) {
  return (
    <ShadcnCard className={cn(statCardVariants({ variant }), "gap-0 py-0", className)}>
      <ShadcnCardContent className="p-[var(--spacing-stat-padding)]">
        <div className="mb-[var(--spacing-stat-label-mb)] text-[length:var(--font-size-stat-label)] text-[var(--color-gray-500)]">
          {label}
        </div>
        <div className={cn(statCardValueVariants({ variant }))}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
      </ShadcnCardContent>
    </ShadcnCard>
  );
}
