import Calendar from "@/components/Calendar/Calendar";
import Slider from "@/components/Slider/Slider";
import { Performance } from "@/types/performance";
import { useBookingRanking } from "./hooks/useBookingRanking";

const samplePerformances: Performance[] = [
  {
    id: "1",
    name: "뮤지컬 A",
    startDate: "2025-02-03",
    endDate: "2025-02-05",
    place: "서울 예술의 전당",
    poster: "https://example.com/poster1.jpg",
    area: "서울",
    genre: "뮤지컬",
    openRun: false,
    state: "예매중",
  },
  {
    id: "2",
    name: "연극 B",
    startDate: "2025-02-10",
    endDate: "2025-02-10",
    place: "대학로 극장",
    poster: "https://example.com/poster2.jpg",
    area: "서울",
    genre: "연극",
    openRun: true,
    state: "예매마감",
  },
  {
    id: "3",
    name: "콘서트 C",
    startDate: "2025-02-15",
    endDate: "2025-02-18",
    place: "올림픽 공원",
    poster: "https://example.com/poster3.jpg",
    area: "서울",
    genre: "콘서트",
    openRun: false,
    state: "공연중",
  },
  {
    id: "4",
    name: "무용 D",
    startDate: "2025-02-20",
    endDate: "2025-02-22",
    place: "예술의 전당",
    poster: "https://example.com/poster4.jpg",
    area: "서울",
    genre: "무용",
    openRun: true,
    state: "예매중",
  },
  {
    id: "5",
    name: "오페라 E",
    startDate: "2025-02-25",
    endDate: "2025-02-25",
    place: "국립 오페라 하우스",
    poster: "https://example.com/poster5.jpg",
    area: "서울",
    genre: "오페라",
    openRun: false,
    state: "예매예정",
  },
  {
    id: "6",
    name: "연극 F",
    startDate: "2025-02-05",
    endDate: "2025-02-05",
    place: "소극장",
    poster: "https://example.com/poster6.jpg",
    area: "서울",
    genre: "연극",
    openRun: false,
    state: "예매중",
  },
];

export default function Home() {
  const { data: boxOfficeData } = useBookingRanking();
  return (
    <>
      <Slider data={boxOfficeData ?? []} />
      <Calendar
        initialYear={2025}
        initialMonth={2}
        performances={samplePerformances}
      />
    </>
  );
}
