import { GENRE_CODES } from "@/constants/category";
import { BASE_URL, getProxyUrls } from "@/constants/url";
import { xmlToJson } from "@/utils/xmlToJson";
import { Performance } from "@/types/performance";
import { getMonthRange } from "@/utils/date";
import { fetchWithFallback } from "@/utils/fetchWithFallBack";

const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

interface FetchPerformanceOptions {
  page?: number;
  genre?: string;
  year?: number;
  month?: number;
  keyword?: string;
}

export async function fetchPerformances({
  page = 1,
  genre,
  year,
  month,
  keyword,
}: FetchPerformanceOptions): Promise<Performance[]> {
  try {
    const genreCode = genre ? GENRE_CODES[genre] || "" : "";

    let stdate = "20250101";
    let eddate = "20251231";

    if (year && month) {
      const range = getMonthRange(year, month);
      stdate = range.stdate;
      eddate = range.eddate;
    }

    const queryParams = new URLSearchParams({
      service: API_KEY,
      stdate,
      eddate,
      cpage: page.toString(),
      rows: "100",
    });

    if (genreCode) queryParams.append("shcate", genreCode);
    if (keyword && keyword.trim()) queryParams.append("shprfnm", keyword);

    const defaultUrl = `${BASE_URL}/pblprfr?${queryParams.toString()}`;
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
    console.error("공연 데이터를 가져오는 중 오류 발생:", error);
    return [];
  }
}
