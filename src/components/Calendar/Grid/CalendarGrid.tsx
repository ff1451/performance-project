import { DateFormatter } from "@/utils/calender";
import styles from "./Grid.module.css";
interface CalendarGridProps {
  cells: (number | null)[];
  selectedDate: string | null;
  performanceMap: Record<string, any[]>;
  currentYear: number;
  currentMonth: number;
  onDateSelect: (date: string) => void;
}

export function CalendarGrid({
  cells,
  selectedDate,
  performanceMap,
  currentYear,
  currentMonth,
  onDateSelect,
}: CalendarGridProps) {
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
            onClick={() => onDateSelect(date)}
            className={`${styles["calendar-grid__cell"]} ${
              selectedDate === date
                ? styles["calendar-grid__cell--selected"]
                : ""
            }`}
          >
            {day}
            {hasPerformance && (
              <span className={styles["calendar-grid__marker"]}>★</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
