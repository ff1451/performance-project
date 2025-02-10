/**
 * 날짜를 YYYYMMDD 형식의 문자열로 반환하는 함수
 * 예: new Date(2025, 0, 1) -> "20250101"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * 특정 연도와 월에 해당하는 시작일과 종료일(월의 마지막 날짜)을 구하는 함수
 * 예: year = 2025, month = 1 -> { stdate: "20250101", eddate: "20250131" }
 */
export function getMonthRange(
  year: number,
  month: number
): { stdate: string; eddate: string } {
  const monthString = month.toString().padStart(2, "0");
  const stdate = `${year}${monthString}01`;
  const lastDate = new Date(year, month, 0).getDate();
  const eddate = `${year}${monthString}${lastDate.toString().padStart(2, "0")}`;
  return { stdate, eddate };
}

/**
 * 현재 날짜를 기준으로 과거 특정 일수 전부터 오늘까지의 날짜 범위를 구하는 함수
 * 기본값 : 31일 전부터 오늘까지
 */
export function getRelativeDateRange(daysAgo: number = 31): {
  stdate: string;
  eddate: string;
} {
  const today = new Date();
  const eddate = formatDate(today);
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - daysAgo);
  const stdate = formatDate(pastDate);
  return { stdate, eddate };
}
