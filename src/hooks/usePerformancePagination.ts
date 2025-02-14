import { useEffect, useState } from "react";
import { usePerformanceList } from "@/hooks/usePerformanceList";

const PAGE_SIZE = 18;

export function usePerformancePagination(category?: string, query?: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, fetchNextPage, hasNextPage } = usePerformanceList(
    category,
    query
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const allPerformances = data?.pages.flat() || [];
  const totalPages = Math.ceil(allPerformances.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = allPerformances.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    if (page > allPerformances.length / PAGE_SIZE && hasNextPage) {
      fetchNextPage();
    }
  };

  return { paginatedData, currentPage, totalPages, handlePageChange };
}
