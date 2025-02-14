import { fetchPerformances } from "@/apis/fetchPerformanceList";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePerformanceList = (
  selectedCategory: string = "",
  searchKeyword: string = ""
) => {
  return useInfiniteQuery({
    queryKey: ["performanceList", selectedCategory, searchKeyword],
    queryFn: async ({ pageParam = 1 }) =>
      fetchPerformances({
        page: pageParam,
        genre: selectedCategory || undefined,
        keyword: searchKeyword || undefined,
      }),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 100) return undefined;
      return allPages.length + 1;
    },
  });
};
