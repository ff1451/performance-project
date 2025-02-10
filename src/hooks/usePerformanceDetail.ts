import { fetchPerformanceDetail } from "@/apis/fetchPerformanceDetail";
import { useQuery } from "@tanstack/react-query";

export const usePerformanceDetail = (id: string) => {
  return useQuery({
    queryKey: ["performanceDetail", id],
    queryFn: () => fetchPerformanceDetail(id),
    staleTime: 30 * 60 * 1000,
  });
};
