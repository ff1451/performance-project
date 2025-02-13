import { GENRE_CODES } from "@/constants/category";
import { BASE_URL, getProxyUrls } from "@/constants/url";
import { xmlToJson } from "@/utils/xmlToJson";
import { Performance } from "@/types/performance";
import { getMonthRange } from "@/utils/date";
import { fetchWithFallback } from "@/utils/fetchWithFallBack";
const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

export async function fetchPerformanceList(
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

    const defaultUrl = `${BASE_URL}/pblprfr?service=${API_KEY}&stdate=${stdate}&eddate=${eddate}&cpage=${pageParam}&rows=100${
      genreCode ? `&shcate=${genreCode}` : ""
    }`;

    const proxyUrls = getProxyUrls(defaultUrl);

    const xmlString = await fetchWithFallback(proxyUrls);
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
