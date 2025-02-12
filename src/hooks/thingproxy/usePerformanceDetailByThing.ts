import { fetchPerformanceDetailByThing } from "@/apis/thingproxy/fetchPerformanceDetailByThing";
import { useQuery } from "@tanstack/react-query";

export const usePerformanceDetailByThing = (id: string) => {
  return useQuery({
    queryKey: ["performanceDetail", id],
    queryFn: () => fetchPerformanceDetailByThing(id),
    staleTime: 30 * 60 * 1000,
  });
};
