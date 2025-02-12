import { BASE_URL } from "@/constants";
import { PerformanceDetail } from "@/types/performance";
import { xmlToJson } from "@/utils/xmlToJson";

const API_KEY = import.meta.env.VITE_KOPIS_API_KEY;

export async function fetchPerformanceDetailByThing(
  id: string
): Promise<PerformanceDetail | null> {
  try {
    const url = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(
      `${BASE_URL}/pblprfr/${id}?service=${API_KEY}`
    )}`;

    const response = await fetch(url);

    const xmlString = await response.text();
    console.log("받아온 XML:", xmlString);

    const data = xmlToJson(xmlString);
    console.log("변환된 JSON 데이터:", data);

    const performanceData = data.db;

    return {
      id: performanceData.mt20id || "",
      facilityId: performanceData.mt10id || "",
      name: performanceData.prfnm || "",
      startDate: performanceData.prfpdfrom || "",
      endDate: performanceData.prfpdto || "",
      place: performanceData.fcltynm || "",
      cast: performanceData.prfcast || "",
      crew: performanceData.prfcrew || "",
      runtime: performanceData.prfruntime || "",
      age: performanceData.prfage || "",
      company: performanceData.entrpsnm || "",
      productionCompany: performanceData.entrpsnmP || "",
      agency: performanceData.entrpsnmA || "",
      host: performanceData.entrpsnmH || "",
      organizer: performanceData.entrpsnmS || "",
      ticketPrice: performanceData.pcseguidance || "",
      poster: performanceData.poster || "",
      story: performanceData.sty || "",
      area: performanceData.area || "",
      genre: performanceData.genrenm || "",
      openRun: performanceData.openrun === "Y",
      visit: performanceData.visit === "Y",
      child: performanceData.child === "Y",
      daehakro: performanceData.daehakro === "Y",
      festival: performanceData.festival === "Y",
      musicalLicense: performanceData.musicallicense === "Y",
      musicalCreate: performanceData.musicalcreate === "Y",
      updateDate: performanceData.updatedate || "",
      state: performanceData.prfstate || "",
      schedule: performanceData.dtguidance || "",
      bookingSite: Array.isArray(performanceData.relates?.relate)
        ? performanceData.relates.relate.map((site: any) => ({
            name: site.relatenm || "",
            url: site.relateurl || "",
          }))
        : performanceData.relates?.relate
        ? [
            {
              name: performanceData.relates.relate.relatenm || "",
              url: performanceData.relates.relate.relateurl || "",
            },
          ]
        : [],
      images: Array.isArray(performanceData.styurls?.styurl)
        ? performanceData.styurls.styurl
        : performanceData.styurls?.styurl
        ? [performanceData.styurls.styurl]
        : [],
    };
  } catch (error) {
    console.error("공연 상세 정보를 가져오는 중 오류 발생:", error);
    return null;
  }
}
