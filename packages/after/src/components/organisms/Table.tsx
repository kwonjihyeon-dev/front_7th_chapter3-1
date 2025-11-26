import { Badge, Button, Search, TableCell, TableRow } from "@/components/atoms";
import { Pagination, TableBody, Table as TableElement, TableHeader } from "@/components/molecules";
import React, { useEffect, useState } from "react";

interface Column {
  key: string;
  header: string;
  width?: string;
}

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
interface TableProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;

  // 🚨 도메인 관심사 추가
  entityType?: "user" | "post";
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase())),
        )
      : tableData;

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const tableClasses = [
    striped && "[&_tbody_tr:nth-child(even)]:bg-[var(--color-gray-50)]",
    bordered &&
      "border border-[rgba(0,0,0,0.12)] [&_th]:border [&_th]:border-[rgba(0,0,0,0.12)] [&_td]:border [&_td]:border-[rgba(0,0,0,0.12)]",
    hover && "[&_tbody_tr:hover]:bg-[rgba(0,0,0,0.04)]",
  ]
    .filter(Boolean)
    .join(" ");

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map((key) => ({
          key,
          header: key,
          width: undefined,
        }))
      : []);

  // 🚨 Bad Practice: Table 컴포넌트가 도메인별 렌더링 로직을 알고 있음
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === "user") {
      if (columnKey === "role") {
        return <Badge userRole={value} showIcon />;
      }
      if (columnKey === "status") {
        // User status를 Badge status로 변환
        const badgeStatus = value === "active" ? "published" : value === "inactive" ? "draft" : "rejected";
        return <Badge status={badgeStatus} showIcon />;
      }
      if (columnKey === "lastLogin") {
        return value || "-";
      }
      if (columnKey === "actions") {
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === "post") {
      if (columnKey === "category") {
        const type =
          value === "development"
            ? "primary"
            : value === "design"
              ? "info"
              : value === "accessibility"
                ? "danger"
                : "secondary";
        return (
          <Badge type={type} pill>
            {value}
          </Badge>
        );
      }
      if (columnKey === "status") {
        return <Badge status={value} showIcon />;
      }
      if (columnKey === "views") {
        return value?.toLocaleString() || "0";
      }
      if (columnKey === "actions") {
        return (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === "draft" && (
              <Button size="sm" variant="success" onClick={() => onPublish?.(row.id)}>
                게시
              </Button>
            )}
            {row.status === "published" && (
              <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
                보관
              </Button>
            )}
            {row.status === "archived" && (
              <Button size="sm" variant="primary" onClick={() => onRestore?.(row.id)}>
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="overflow-x-auto">
      {searchable && <Search value={searchTerm} onChange={setSearchTerm} />}

      <TableElement className={tableClasses}>
        <TableHeader className="bg-[var(--color-gray-50)]">
          <TableRow>
            {actualColumns.map((column) => (
              <TableCell key={column.key} as="th" width={column.width}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`${onRowClick ? "cursor-pointer" : "cursor-default"} [&:last-child_td]:border-b-0`}
            >
              {actualColumns.map((column) => (
                <TableCell key={column.key}>{entityType ? renderCell(row, column.key) : row[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableElement>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
