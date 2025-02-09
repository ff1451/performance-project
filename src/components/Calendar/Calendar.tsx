import { useState, useEffect } from "react";
import { Performance } from "@/types/performance";
import { getCalendarGrid, groupPerformancesByDate } from "@/utils/calender";
import CalendarNav from "./Navigation/CalendarNav";
import { CalendarHeader } from "./Header/CalendarHeader";
import { CalendarGrid } from "./Grid/CalendarGrid";
import { PerformanceList } from "./PerformanceList/PerformanceList";
import styles from "./Calendar.module.css";
interface CalendarProps {
  initialYear: number;
  initialMonth: number;
  performances: Performance[];
}

function Calendar({ initialYear, initialMonth, performances }: CalendarProps) {
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDate(null);
  }, [currentYear, currentMonth]);

  const performanceMap = groupPerformancesByDate(
    performances,
    currentYear,
    currentMonth
  );

  const calendarCells = getCalendarGrid(currentYear, currentMonth);

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
    <>
      <div className={styles["container"]}>
        <div className={styles["calendar-section"]}>
          <CalendarNav
            year={currentYear}
            month={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          <CalendarHeader />
          <div>
            <CalendarGrid
              cells={calendarCells}
              selectedDate={selectedDate}
              performanceMap={performanceMap}
              onDateSelect={setSelectedDate}
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </div>
        </div>
        <div className={styles["performance-list"]}>
          <PerformanceList
            performances={
              selectedDate ? performanceMap[selectedDate] || [] : []
            }
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
