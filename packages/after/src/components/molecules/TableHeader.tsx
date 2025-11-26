import { ShadcnTableHeader } from "@/components/ui";
import React from "react";

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ShadcnTableHeader {...props} className={className}>
      {children}
    </ShadcnTableHeader>
  );
};

