export const categories = [
  { category: "전체" },
  { category: "연극" },
  { category: "뮤지컬" },
  { category: "서양음악", subCategory: "클래식" },
  { category: "한국음악", subCategory: "국악" },
  { category: "대중음악" },
  { category: "무용", subCategory: "서양/한국무용" },
  { category: "대중무용" },
  { category: "서커스/마술" },
  { category: "복합" },
];

export const GENRE_CODES: { [key: string]: string } = {
  연극: "AAAA",
  무용: "BBBC",
  대중무용: "BBBE",
  서양음악: "CCCA",
  한국음악: "CCCC",
  대중음악: "CCCD",
  복합: "EEEA",
  "서커스/마술": "EEEB",
  뮤지컬: "GGGA",
};
