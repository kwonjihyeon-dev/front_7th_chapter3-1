import {
  ShadcnCard,
  ShadcnCardAction,
  ShadcnCardContent,
  ShadcnCardDescription,
  ShadcnCardHeader,
  ShadcnCardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const cardVariants = cva(
  "mb-[var(--spacing-card-mb)] overflow-hidden bg-white font-['Roboto','Helvetica','Arial',sans-serif] rounded-[4px]",
  {
    variants: {
      variant: {
        default:
          "border border-[rgba(0,0,0,0.12)] shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]",
        bordered: "border border-[rgba(0,0,0,0.12)] shadow-none",
        elevated:
          "border border-[rgba(0,0,0,0.08)] shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.12),0px_1px_2px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.08)]",
        flat: "border border-[rgba(0,0,0,0.08)] shadow-none bg-[var(--color-gray-50)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = "default",
  headerActions,
  className,
}) => {
  return (
    <ShadcnCard className={cn(cardVariants({ variant }), "gap-0 py-0", className)}>
      {(title || subtitle || headerActions) && (
        <ShadcnCardHeader className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] bg-[var(--color-gray-50)] p-[var(--spacing-card-padding)]">
          <div>
            {title && (
              <ShadcnCardTitle className="m-0 leading-[1.6] font-medium text-[rgba(0,0,0,0.87)] text-[var(--font-size-card-title)]">
                {title}
              </ShadcnCardTitle>
            )}
            {subtitle && (
              <ShadcnCardDescription className="mt-1 mb-0 leading-[1.43] font-normal text-[rgba(0,0,0,0.6)] text-[var(--font-size-card-subtitle)]">
                {subtitle}
              </ShadcnCardDescription>
            )}
          </div>
          {headerActions && <ShadcnCardAction>{headerActions}</ShadcnCardAction>}
        </ShadcnCardHeader>
      )}
      <ShadcnCardContent className="p-[var(--spacing-card-padding)]">{children}</ShadcnCardContent>
    </ShadcnCard>
  );
};
