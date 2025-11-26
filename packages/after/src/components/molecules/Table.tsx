import { ShadcnTable } from "@/components/ui";
import React from "react";

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ className, children, ...props }) => {
  return (
    <ShadcnTable {...props} className={className}>
      {children}
    </ShadcnTable>
  );
};
