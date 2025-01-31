import { boxoffice } from "../types/performance";
import { BASE_URL } from "../constants";
import { xmlToJson } from "../utils/xmlToJson";

const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

export async function fetchBookingRanking(): Promise<boxoffice[]> {
  try {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `${BASE_URL}/boxoffice?service=${API_KEY}&stdate=20250101&eddate=20250131`
    )}`;

    const response = await fetch(url);
    console.log(url);

    const { contents } = await response.json();
    console.log(contents);

    const data = xmlToJson(contents);
    console.log("변환된 JSON 데이터:", data);

    const rankings = data.boxof;

    return Array.isArray(rankings)
      ? rankings.map((item: any) => ({
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
        }))
      : [
          {
            ranking: Number(rankings.rnum) || 0,
            name: rankings.prfnm || "",
            period: rankings.prfpd || "",
            place: rankings.prfplcnm || "",
            seatCount: Number(rankings.seatcnt) || 0,
            playCount: Number(rankings.prfdtcnt) || 0,
            area: rankings.area || "",
            poster: rankings.poster || "",
            id: rankings.mt20id || "",
            genre: rankings.cate || "",
          },
        ];
  } catch (error) {
    console.error("예매 순위를 가져오는 중 오류 발생:", error);
    return [];
  }
}
