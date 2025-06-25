import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePageNumbers, PaginationResult } from '@/utils/paginationUtils';

interface PaginationProps {
  pagination: PaginationResult<any>;
  onPageChange: (page: number) => void;
  className?: string;
  showPageInfo?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({
  pagination,
  onPageChange,
  className = '',
  showPageInfo = true,
  maxVisiblePages = 5
}: PaginationProps) {
  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPrevPage } = pagination;
  
  const pageNumbers = generatePageNumbers(currentPage, totalPages, maxVisiblePages);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {showPageInfo && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>
      )}
      
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* First page + ellipsis */}
        {pageNumbers[0] > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(1)}
              className="min-w-[40px]"
            >
              1
            </Button>
            {pageNumbers[0] > 2 && (
              <div className="flex items-center justify-center min-w-[40px] h-9">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNum) => (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(pageNum)}
            className="min-w-[40px]"
          >
            {pageNum}
          </Button>
        ))}

        {/* Last page + ellipsis */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <div className="flex items-center justify-center min-w-[40px] h-9">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            )}
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className="min-w-[40px]"
            >
              {totalPages}
            </Button>
          </>
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Simple page size selector
interface PageSizeSelectorProps {
  currentPageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange: (size: number) => void;
  className?: string;
}

export function PageSizeSelector({
  currentPageSize,
  pageSizeOptions,
  onPageSizeChange,
  className = ''
}: PageSizeSelectorProps) {
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <span className="text-gray-600 dark:text-gray-400">Show:</span>
      <select
        value={currentPageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-gray-600 dark:text-gray-400">per page</span>
    </div>
  );
}
