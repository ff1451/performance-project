export const BASE_URL = "http://kopis.or.kr/openApi/restful";
export const IMAGE_URL = "http://www.kopis.or.kr/upload/pfmPoster";

export const getProxyUrls = (originalUrl: string): string[] => [
  `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`,
  `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(originalUrl)}`,
];
