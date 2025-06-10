import { BoxOffice, ResponseBoxOffice } from "@/types/performance";

const API_URL = "http://localhost/performance-project/server/getBookingRanking.php";

export async function fetchBookingRanking(): Promise<BoxOffice[]> {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (result.status === "success") {
      return result.data.map((item: ResponseBoxOffice) => ({
        ranking: Number(item.rnum) || 0,
        name: item.prfnm || "",
        period: item.prfpd || "",
        place: item.prfplcnm || "",
        seatCount: Number(item.seatcnt) || 0,
        playCount: Number(item.prfdtcnt) || 0,
        area: item.area || "",
        poster: item.poster || "",
        id: item.mt20id || "",
        genre: item.cate || "",
      }));
    } else {
      console.error("데이터 조회 실패:", result.message);
      return [];
    }
  } catch (error) {
    console.error("예매 순위를 가져오는 중 오류 발생:", error);
    return [];
  }
}
