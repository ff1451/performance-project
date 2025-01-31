import { BASE_URL } from "../constants";
import { Performance } from "../types/performance";
import { xmlToJson } from "../utils/xmlToJson";

const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

export async function searchPerformance(
  keyword: string
): Promise<Performance[]> {
  try {
    if (!keyword.trim()) return [];

    const queryParams = new URLSearchParams({
      service: API_KEY,
      stdate: "20250101",
      eddate: "20251231",
      cpage: "1",
      rows: "10",
      shprfnm: keyword,
    });

    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `${BASE_URL}/pblprfr?${queryParams.toString()}`
    )}`;

    const response = await fetch(url);
    console.log("검색 URL:", url);

    const { contents } = await response.json();
    console.log("API 응답 (XML):", contents);

    const data = xmlToJson(contents);
    console.log("검색 데이터:", data);

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
    console.error("검색 중 오류 발생:", error);
    return [];
  }
}
