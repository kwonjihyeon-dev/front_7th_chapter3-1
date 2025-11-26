import { useState, useMemo } from "react";

interface UseTableDataOptions<T> {
  data: T[];
  pageSize?: number;
  searchable?: boolean;
}

export function useTableData<T extends Record<string, any>>({
  data,
  pageSize = 10,
  searchable = false,
}: UseTableDataOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchable, searchTerm]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // 데이터가 변경되면 첫 페이지로 리셋
  const resetPagination = () => {
    setCurrentPage(1);
    setSearchTerm("");
  };

  return {
    filteredData,
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    resetPagination,
  };
}

