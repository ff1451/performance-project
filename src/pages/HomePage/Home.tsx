import Calendar from "@/components/Calendar/Calendar";
import NewestReview from "@/components/Review/NewestReview/NewestReview";
import Slider from "@/components/Slider/Slider";
import { useBookingRanking } from "@/hooks/useBookingRanking";
import styles from "./Home.module.css";

export default function Home() {
  const { data: boxOfficeData } = useBookingRanking();
  return (
    <>
      <Slider data={boxOfficeData ?? []} />
      <div className={styles["container"]}>
        <Calendar />
        <NewestReview />
      </div>
    </>
  );
}
