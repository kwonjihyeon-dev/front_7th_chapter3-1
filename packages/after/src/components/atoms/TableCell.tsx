import { ShadcnTableCell, ShadcnTableHead } from "@/components/ui/table";
import React from "react";

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * 렌더링할 요소 타입: 'th' 또는 'td'
   */
  as?: "th" | "td";

  /**
   * 셀 너비
   */
  width?: string;
}

export const TableCell: React.FC<TableCellProps> = ({ as = "td", width, className, children, style, ...props }) => {
  // 스타일 병합 (width 처리)
  const mergedStyle = {
    ...style,
    ...(width && { width }),
  };

  // as prop에 따라 ShadcnTableHead 또는 ShadcnTableCell 사용
  if (as === "th") {
    return (
      <ShadcnTableHead {...props} style={mergedStyle} className={className}>
        {children}
      </ShadcnTableHead>
    );
  }

  return (
    <ShadcnTableCell {...props} style={mergedStyle} className={className}>
      {children}
    </ShadcnTableCell>
  );
};
