import { BASE_URL, GENRE_CODES } from "@/constants";
import { xmlToJson } from "@/utils/xmlToJson";
import { Performance } from "@/types/performance";
import { getMonthRange } from "@/utils/date";
const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

export async function fetchPerformanceListByThing(
  pageParam: number,
  genre: string,
  year?: number,
  month?: number
): Promise<Performance[]> {
  try {
    const genreCode = GENRE_CODES[genre] || "";

    let stdate = "20250101";
    let eddate = "20251231";

    if (year && month) {
      const range = getMonthRange(year, month);
      stdate = range.stdate;
      eddate = range.eddate;
    }

    const url = `${BASE_URL}/pblprfr?service=${API_KEY}&stdate=${stdate}&eddate=${eddate}&cpage=${pageParam}&rows=100${
      genreCode ? `&shcate=${genreCode}` : ""
    }`;

    const response = await fetch(
      `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`
    );

    const xmlString = await response.text();
    console.log("받아온 XML:", xmlString);

    const data = xmlToJson(xmlString);
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
