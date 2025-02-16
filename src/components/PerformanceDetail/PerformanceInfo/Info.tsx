import { PerformanceDetail } from "@/types/performance";
import styles from "./Info.module.css";

interface InfoProps {
  performance: PerformanceDetail;
}

export default function Info({ performance }: InfoProps) {
  const labelCompanies = (companies: string | undefined, label: string) => {
    return companies
      ?.split(",")
      .map((company) => `${company.trim()}(${label})`)
      .join(", ");
  };

  return (
    <div className={styles["detail__content"]}>
      <div className={styles["detail__poster-container"]}>
        <img
          src={performance.poster}
          alt={performance.name}
          className={styles["detail__poster"]}
        />
      </div>
      <table className={styles["detail__table"]}>
        <tbody>
          <tr>
            <th>공연기간</th>
            <td>
              {performance.startDate}~{performance.endDate}
            </td>
          </tr>
          <tr>
            <th>공연장소</th>
            <td>{performance.place}</td>
          </tr>
          <tr>
            <th>공연스케줄</th>
            <td>{performance.schedule?.replace("HOL", "공휴일")}</td>
          </tr>
          <tr>
            <th>러닝타임</th>
            <td>{performance.runtime}</td>
          </tr>
          <tr>
            <th>관람연령</th>
            <td>{performance.age}</td>
          </tr>
          <tr>
            <th>티켓가격</th>
            <td>{performance.ticketPrice}</td>
          </tr>
          <tr>
            <th>출연진</th>
            <td>{performance.cast}</td>
          </tr>
          <tr>
            <th>제작진</th>
            <td>{performance.crew}</td>
          </tr>
          <tr>
            <th>주최, 주관</th>
            <td>
              {performance.host
                ? `${labelCompanies(performance.host, "주최")}`
                : ""}{" "}
              {performance.organizer
                ? `, ${labelCompanies(performance.organizer, "주관")}`
                : ""}
            </td>
          </tr>
          <tr>
            <th>기획, 제작</th>
            <td>
              {performance.productionCompany
                ? `${labelCompanies(performance.productionCompany, "제작")}`
                : ""}{" "}
              {performance.agency
                ? `, ${labelCompanies(performance.agency, "기획")}`
                : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
