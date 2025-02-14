import { fetchPerformances } from "@/apis/fetchPerformanceList";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMonthlyPerformanceList(
  selectedCategory: string = "",
  year: number,
  month: number
) {
  return useInfiniteQuery({
    queryKey: ["performanceList", selectedCategory, year, month],
    queryFn: async ({ pageParam = 1 }) =>
      fetchPerformances({
        page: pageParam,
        genre: selectedCategory,
        year,
        month,
      }),
    staleTime: 30 * 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 100) return undefined;
      return allPages.length + 1;
    },
  });
}
