import { DateFormatter } from "@/utils/calender";
import styles from "./Grid.module.css";
import { useCalendarStore } from "@/stores/useCalendarStore";
interface CalendarGridProps {
  cells: (number | null)[];
  performanceMap: Record<string, any[]>;
}

export function CalendarGrid({
  cells,

  performanceMap,
}: CalendarGridProps) {
  const { currentYear, currentMonth, selectedDate, setSelectedDate } =
    useCalendarStore();

  return (
    <div className={styles["calendar-grid"]}>
      {cells.map((day, idx) => {
        if (day === null) {
          return (
            <div key={idx} className={styles["calendar-grid__cell--empty"]} />
          );
        }

        const date = DateFormatter(currentYear, currentMonth, day);

        const hasPerformance =
          performanceMap[date] && performanceMap[date].length > 0;

        return (
          <div
            key={idx}
            onClick={() => setSelectedDate(date)}
            className={`${styles["calendar-grid__cell"]} ${
              selectedDate === date
                ? styles["calendar-grid__cell--selected"]
                : ""
            }`}
          >
            {day}
            {hasPerformance && (
              <span className={styles["calendar-grid__marker"]}></span>
            )}
          </div>
        );
      })}
    </div>
  );
}
