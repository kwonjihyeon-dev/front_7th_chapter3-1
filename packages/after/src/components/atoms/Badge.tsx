import React from "react";

interface BadgeProps {
  children?: React.ReactNode;
  type?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "small" | "medium" | "large";
  pill?: boolean;
  status?: "published" | "draft" | "archived" | "pending" | "rejected";
  userRole?: "admin" | "moderator" | "user" | "guest";
  priority?: "high" | "medium" | "low";
  paymentStatus?: "paid" | "pending" | "failed" | "refunded";
  showIcon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  type = "primary",
  size = "medium",
  pill = false,
  status,
  userRole,
  priority,
  paymentStatus,
  showIcon = false,
}) => {
  void showIcon;

  let actualType = type;
  let actualContent = children;

  if (status) {
    switch (status) {
      case "published":
        actualType = "success";
        actualContent = actualContent || "게시됨";
        break;
      case "draft":
        actualType = "warning";
        actualContent = actualContent || "임시저장";
        break;
      case "archived":
        actualType = "secondary";
        actualContent = actualContent || "보관됨";
        break;
      case "pending":
        actualType = "info";
        actualContent = actualContent || "대기중";
        break;
      case "rejected":
        actualType = "danger";
        actualContent = actualContent || "거부됨";
        break;
    }
  }

  if (userRole) {
    switch (userRole) {
      case "admin":
        actualType = "danger";
        actualContent = actualContent || "관리자";
        break;
      case "moderator":
        actualType = "warning";
        actualContent = actualContent || "운영자";
        break;
      case "user":
        actualType = "primary";
        actualContent = actualContent || "사용자";
        break;
      case "guest":
        actualType = "secondary";
        actualContent = actualContent || "게스트";
        break;
    }
  }

  if (priority) {
    switch (priority) {
      case "high":
        actualType = "danger";
        actualContent = actualContent || "높음";
        break;
      case "medium":
        actualType = "warning";
        actualContent = actualContent || "보통";
        break;
      case "low":
        actualType = "info";
        actualContent = actualContent || "낮음";
        break;
    }
  }

  if (paymentStatus) {
    switch (paymentStatus) {
      case "paid":
        actualType = "success";
        actualContent = actualContent || "결제완료";
        break;
      case "pending":
        actualType = "warning";
        actualContent = actualContent || "결제대기";
        break;
      case "failed":
        actualType = "danger";
        actualContent = actualContent || "결제실패";
        break;
      case "refunded":
        actualType = "secondary";
        actualContent = actualContent || "환불됨";
        break;
    }
  }

  const baseClasses =
    "inline-flex items-center justify-center font-bold font-[Arial] leading-[1] whitespace-nowrap";

  const typeClasses = {
    primary: "bg-[var(--color-primary-500)] text-white",
    secondary: "bg-[var(--color-secondary-600)] text-white",
    success: "bg-[var(--color-success-500)] text-white",
    danger: "bg-[var(--color-danger-500)] text-white",
    warning: "bg-[var(--color-warning-500)] text-white",
    info: "bg-[var(--color-info-500)] text-white",
  };

  const sizeClasses = {
    small:
      "px-1 h-[var(--height-badge-sm)] text-[length:var(--font-size-badge-sm)]",
    medium:
      "px-2 h-[var(--height-badge-md)] text-[length:var(--font-size-badge-md)]",
    large:
      "px-2.5 h-[var(--height-badge-lg)] text-[length:var(--font-size-badge-lg)]",
  };

  const radiusClass = pill ? "rounded-[var(--radius-pill)]" : "rounded-[3px]";

  const classes = [
    baseClasses,
    typeClasses[actualType],
    sizeClasses[size],
    radiusClass,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{actualContent}</span>;
};
