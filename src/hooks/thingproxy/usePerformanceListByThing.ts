import { fetchPerformanceListByThing } from "@/apis/thingproxy/fetchPerformanceListByThing";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePerformanceListByThing = (selectedCategory: string) => {
  return useInfiniteQuery({
    queryKey: ["performanceList", selectedCategory],
    queryFn: async ({ pageParam = 1 }) =>
      fetchPerformanceListByThing(pageParam, selectedCategory),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 100) return undefined;
      return allPages.length + 1;
    },
  });
};
