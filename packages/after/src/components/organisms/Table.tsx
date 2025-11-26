import React, { useState, useEffect } from "react";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
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
  sortable = false,
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
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return newDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return newDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const baseTableClasses =
    "w-full border-collapse font-['Roboto','Helvetica','Arial',sans-serif] text-[var(--font-size-table)] bg-white";

  const tableClasses = [
    baseTableClasses,
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
        const badgeStatus =
          value === "active"
            ? "published"
            : value === "inactive"
            ? "draft"
            : "rejected";
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
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete?.(row.id)}
            >
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
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === "draft" && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === "published" && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === "archived" && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onRestore?.(row.id)}
              >
                복원
              </Button>
            )}
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete?.(row.id)}
            >
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
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-[#ddd] rounded-[4px] w-[300px]"
          />
        </div>
      )}

      <table className={tableClasses}>
        <thead className="bg-[var(--color-gray-50)]">
          <tr>
            {actualColumns.map((column) => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className="p-4 text-left font-medium text-[var(--font-size-table-header)] text-[rgba(0,0,0,0.6)] uppercase tracking-[0.03em] border-b-2 border-b-[rgba(0,0,0,0.12)]"
              >
                <div
                  className={`flex items-center gap-1 ${
                    sortable ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`${
                onRowClick ? "cursor-pointer" : "cursor-default"
              } [&:last-child_td]:border-b-0`}
            >
              {actualColumns.map((column) => (
                <td
                  key={column.key}
                  className="p-4 text-[rgba(0,0,0,0.87)] border-b border-b-[rgba(0,0,0,0.08)]"
                >
                  {entityType ? renderCell(row, column.key) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-[#ddd] bg-white rounded-[4px] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            이전
          </button>
          <span className="px-3 py-1.5">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-[#ddd] bg-white rounded-[4px] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
