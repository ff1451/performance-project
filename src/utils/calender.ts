import { Performance } from "@/types/performance";

export function DateFormatter(
  year: number,
  month: number,
  day: number
): string {
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

export function groupPerformancesByDate(
  performances: Performance[],
  year: number,
  month: number
): Record<string, Performance[]> {
  return performances.reduce<Record<string, Performance[]>>(
    (acc, performance) => {
      const startDate = new Date(performance.startDate);
      const endDate = new Date(performance.endDate);
      const current = new Date(startDate);

      while (current <= endDate) {
        if (
          current.getFullYear() === year &&
          current.getMonth() + 1 === month //getMonth() : 0부터 11
        ) {
          const date = DateFormatter(year, month, current.getDate());

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(performance);
        }
        current.setDate(current.getDate() + 1);
      }
      return acc;
    },
    {}
  );
}

export function getCalendarGrid(
  year: number,
  month: number
): (number | null)[] {
  const lastDayOfMonth = new Date(year, month, 0).getDate(); //날짜
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); //요일
  const days: number[] = Array.from(
    { length: lastDayOfMonth },
    (_, i) => i + 1
  );

  const calenderGrid: (number | null)[] = Array(firstDayOfMonth).fill(null);
  calenderGrid.push(...days);

  while (calenderGrid.length % 7 !== 0) {
    calenderGrid.push(null);
  }

  return calenderGrid;
}
