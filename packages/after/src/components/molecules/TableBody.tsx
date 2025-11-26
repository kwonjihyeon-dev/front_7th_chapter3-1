import { ShadcnTableBody } from "@/components/ui";
import React from "react";

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ShadcnTableBody {...props} className={className}>
      {children}
    </ShadcnTableBody>
  );
};
