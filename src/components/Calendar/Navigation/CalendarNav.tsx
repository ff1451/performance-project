import styles from "./CalendarNav.module.css";

interface CalendarNavProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarNav({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: CalendarNavProps) {
  return (
    <div className={styles["calendar-nav"]}>
      <button className={styles["calendar-nav__button"]} onClick={onPrevMonth}>
        ◀
      </button>
      <h2
        className={styles["calendar-nav__title"]}
      >{`${year}년 ${month}월`}</h2>
      <button className={styles["calendar-nav__button"]} onClick={onNextMonth}>
        ▶
      </button>
    </div>
  );
}
