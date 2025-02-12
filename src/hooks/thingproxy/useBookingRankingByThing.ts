import { fetchBookingRankingByThing } from "@/apis/thingproxy/fetchBookingRankingByThing";
import { useQuery } from "@tanstack/react-query";

export const useBookingRankingByThing = () => {
  return useQuery({
    queryKey: ["bookingRanking"],
    queryFn: fetchBookingRankingByThing,
    staleTime: 30 * 60 * 1000,
  });
};
