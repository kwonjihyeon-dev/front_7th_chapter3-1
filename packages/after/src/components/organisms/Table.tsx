import { TableCell, TableRow } from "@/components/atoms";
import { TableBody, Table as TableElement, TableHeader } from "@/components/molecules";
import type { Column } from "@/types";

interface TableProps<T = any> {
  columns?: Column<T>[];
  data?: T[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  sortable?: boolean;
  onRowClick?: (row: T) => void;
}

export const Table = <T extends Record<string, any>>({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  onRowClick,
}: TableProps<T>) => {
  const tableClasses = [
    striped && "[&_tbody_tr:nth-child(even)]:bg-[var(--color-gray-50)]",
    bordered &&
      "border border-[rgba(0,0,0,0.12)] [&_th]:border [&_th]:border-[rgba(0,0,0,0.12)] [&_td]:border [&_td]:border-[rgba(0,0,0,0.12)]",
    hover && "[&_tbody_tr:hover]:bg-[rgba(0,0,0,0.04)]",
  ]
    .filter(Boolean)
    .join(" ");

  const actualColumns: Column<T>[] =
    columns ||
    (data[0]
      ? Object.keys(data[0]).map((key) => ({
          key,
          header: key,
          width: undefined,
        }))
      : []);

  return (
    <div className="overflow-x-auto">
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
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`${onRowClick ? "cursor-pointer" : "cursor-default"} [&:last-child_td]:border-b-0`}
            >
              {actualColumns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row[column.key], row, column.key) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableElement>
    </div>
  );
};
