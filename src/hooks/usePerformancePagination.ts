import { usePerformanceList } from "@/hooks/usePerformanceList";

const PAGE_SIZE = 18;

export function usePerformancePagination(
  currentPage: number,
  category?: string,
  query?: string
) {
  const { data, fetchNextPage, hasNextPage } = usePerformanceList(
    category,
    query
  );

  const allPerformances = data?.pages.flat() || [];
  const totalPages = Math.ceil(allPerformances.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = allPerformances.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (page > allPerformances.length / PAGE_SIZE && hasNextPage) {
      fetchNextPage();
    }
  };

  return { paginatedData, totalPages, handlePageChange };
}
