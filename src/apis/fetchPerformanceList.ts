import { BASE_URL, GENRE_CODES } from "../constants";
import { xmlToJson } from "../utils/xmlToJson";
import { Performance } from "../types/performance";
const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

export async function fetchPerformanceList(
  pageParam: number,
  genre: string
): Promise<Performance[]> {
  try {
    const genreCode = GENRE_CODES[genre] || "";

    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `${BASE_URL}/pblprfr?service=${API_KEY}&stdate=20250101&eddate=20251231&cpage=${pageParam}&rows=100${
          genreCode ? `&shcate=${genreCode}` : ""
        }`
      )}`
    );

    const { contents } = await response.json();

    const data = xmlToJson(contents);
    console.log("변환된 JSON 데이터:", data);

    return (data.db ?? []).map((item: any) => ({
      id: item.mt20id || "",
      name: item.prfnm || "",
      startDate: item.prfpdfrom || "",
      endDate: item.prfpdto || "",
      place: item.fcltynm || "",
      poster: item.poster || "",
      area: item.area || "",
      genre: item.genrenm || "",
      openRun: item.openrun === "Y",
      state: item.prfstate || "",
    }));
  } catch (error) {
    console.error("공연 목록을 가져오는 중 오류 발생:", error);
    return [];
  }
}
