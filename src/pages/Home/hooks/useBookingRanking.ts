import { fetchBookingRanking } from "@/apis/fetchBookingRanking";
import { useQuery } from "@tanstack/react-query";

export const useBookingRanking = () => {
  return useQuery({
    queryKey: ["bookingRanking"],
    queryFn: fetchBookingRanking,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
