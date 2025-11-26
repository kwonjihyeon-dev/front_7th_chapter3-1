import { ShadcnTableRow } from "@/components/ui";
import React from "react";

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, children, ...props }) => {
  return (
    <ShadcnTableRow {...props} className={className}>
      {children}
    </ShadcnTableRow>
  );
};
