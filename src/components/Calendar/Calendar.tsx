import { useEffect } from "react";
import { getCalendarGrid, groupPerformancesByDate } from "@/utils/calender";
import CalendarNav from "./Navigation/CalendarNav";
import { CalendarHeader } from "./Header/CalendarHeader";
import { CalendarGrid } from "./Grid/CalendarGrid";
import { PerformanceList } from "./PerformanceList/PerformanceList";
import styles from "./Calendar.module.css";
import { usePerformanceListByMonth } from "@/hooks/usePerformanceListByMonth";
import { useCalendarStore } from "@/stores/useCalendarStore";

function Calendar() {
  const { currentYear, currentMonth, selectedDate, setSelectedDate } =
    useCalendarStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePerformanceListByMonth("", currentYear, currentMonth);

  const performances = data?.pages.flatMap((page) => page) || [];

  useEffect(() => {
    setSelectedDate(null);
  }, [currentYear, currentMonth]);

  // useEffect(() => {
  //   if (hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [hasNextPage, isFetchingNextPage]);

  const performanceMap = groupPerformancesByDate(
    performances,
    currentYear,
    currentMonth
  );

  const calendarCells = getCalendarGrid(currentYear, currentMonth);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["calendar-section"]}>
          <CalendarNav />
          <CalendarHeader />
          <div>
            <CalendarGrid
              cells={calendarCells}
              performanceMap={performanceMap}
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
