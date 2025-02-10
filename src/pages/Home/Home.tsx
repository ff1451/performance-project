import Calendar from "@/components/Calendar/Calendar";
import Slider from "@/components/Slider/Slider";
import { useBookingRanking } from "@/hooks/useBookingRanking";

export default function Home() {
  const { data: boxOfficeData } = useBookingRanking();
  return (
    <>
      <Slider data={boxOfficeData ?? []} />
      <Calendar />
    </>
  );
}
