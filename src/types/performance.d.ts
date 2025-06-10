export interface Performance {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  place: string;
  poster: string;
  area: string;
  genre: string;
  openRun: boolean;
  state: string;
}

export interface PerformanceDetail extends Performance {
  cast: string;
  crew: string;
  runtime: string;
  age: string;
  company: string;
  productionCompany: string;
  agency: string;
  host: string;
  organizer: string;
  ticketPrice: string;
  story: string;
  visit: boolean;
  child: boolean;
  daehakro: boolean;
  festival: boolean;
  musicalLicense: boolean;
  musicalCreate: boolean;
  updateDate: string;
  facilityId: string;
  schedule: string;
  images: string[];
  bookingSite: BookingSite[];
}

export interface BookingSite {
  name: string;
  url: string;
}

export interface BoxOffice {
  place: string;
  seatCount: number;
  ranking: number;
  poster: string;
  period: string;
  id: string;
  name: string;
  genre: string;
  playCount: number;
  area: string;
}

interface ResponseBoxOffice {
  rnum: string;
  prfnm: string;
  prfpd: string;
  prfplcnm: string;
  seatcnt: string;
  prfdtcnt: string;
  area: string;
  poster: string;
  mt20id: string;
  cate: string;
}
