import React from "react";

// Alert - Different styling approach with inconsistent variants
interface AlertProps {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error" | "default";
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "default",
  title,
  onClose,
  showIcon = true,
}) => {
  const getIcon = () => {
    switch (variant) {
      case "info":
        return "ℹ️";
      case "success":
        return "✓";
      case "warning":
        return "⚠️";
      case "error":
        return "✕";
      default:
        return "•";
    }
  };

  const baseClasses =
    "p-[var(--spacing-alert-padding)] mb-[var(--spacing-alert-mb)] rounded-[3px] border font-[Arial] flex gap-[var(--spacing-alert-gap)] items-start";

  const variantClasses = {
    info: "bg-[var(--color-info-50)] border-[var(--color-info-200)] text-[var(--color-info-900)]",
    success:
      "bg-[var(--color-alert-success-bg)] border-[var(--color-alert-success-border)] text-[var(--color-success-700)]",
    warning:
      "bg-[var(--color-warning-50)] border-[var(--color-warning-200)] text-[var(--color-warning-600)]",
    error:
      "bg-[var(--color-alert-error-bg)] border-[var(--color-alert-error-border)] text-[var(--color-danger-700)]",
    default:
      "bg-[var(--color-alert-default-bg)] border-[var(--color-secondary-300)] text-[var(--color-secondary-700)]",
  };

  const alertClasses = [baseClasses, variantClasses[variant]].join(" ");

  return (
    <div className={alertClasses}>
      {showIcon && (
        <div className="text-[var(--font-size-alert-icon)] flex-shrink-0">
          {getIcon()}
        </div>
      )}
      <div className="flex-1">
        {title && (
          <div className="font-bold mb-1 text-[var(--font-size-alert-title)]">
            {title}
          </div>
        )}
        <div className="text-[var(--font-size-alert-body)] leading-[1.5]">
          {children}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="bg-transparent border-none text-[var(--font-size-alert-icon)] px-1 ml-auto flex-shrink-0 cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
};
