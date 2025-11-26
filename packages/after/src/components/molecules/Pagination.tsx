import { Button } from "@/components/atoms";
import type { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="mt-4 flex justify-center gap-2">
      <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
        이전
      </Button>
      <span className="px-3 py-1.5">
        {currentPage} / {totalPages}
      </span>
      <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
        다음
      </Button>
    </div>
  );
};
