import { useCalendarStore } from "@/stores/useCalendarStore";
import styles from "./CalendarNav.module.css";
import { DirectionButton } from "@/components/UI/DirectionButton";

export default function CalendarNav() {
  const { currentYear, setCurrentYear, currentMonth, setCurrentMonth } =
    useCalendarStore();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className={styles["calendar-nav"]}>
      <DirectionButton direction="prev" onClick={handlePrevMonth} />
      <h2
        className={styles["calendar-nav__title"]}
      >{`${currentYear}년 ${currentMonth}월`}</h2>
      <DirectionButton direction="next" onClick={handleNextMonth} />
    </div>
  );
}
