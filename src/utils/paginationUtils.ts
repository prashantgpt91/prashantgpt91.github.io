/**
 * Pagination utilities for content management
 * Industry standard approach for handling large content lists
 */

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemsPerPage: number;
}

export function paginateArray<T>(
  array: T[],
  page: number = 1,
  itemsPerPage: number = 10
): PaginationResult<T> {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = array.slice(startIndex, endIndex);
  const totalPages = Math.ceil(array.length / itemsPerPage);

  return {
    items,
    currentPage: page,
    totalPages,
    totalItems: array.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    itemsPerPage
  };
}

export function generatePageNumbers(currentPage: number, totalPages: number, maxVisible: number = 5): number[] {
  const pages: number[] = [];
  const halfVisible = Math.floor(maxVisible / 2);
  
  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);
  
  // Adjust if we're near the beginning or end
  if (endPage - startPage + 1 < maxVisible) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxVisible - 1);
    } else {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
}

// Standard items per page configurations
export const PAGINATION_SIZES = {
  SMALL: 6,    // For cards/grid layouts
  MEDIUM: 10,  // Standard blog listing
  LARGE: 20,   // Data tables
  SEARCH: 15   // Search results
} as const;
