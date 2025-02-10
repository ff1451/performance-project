import { Performance } from "@/types/performance";
import styles from "./PerformanceList.module.css";
import { Link } from "react-router-dom";

interface PerformanceListProps {
  performances: Performance[];
}

export function PerformanceList({ performances }: PerformanceListProps) {
  return performances.length ? (
    <div className={styles["performance-list"]}>
      <h3 className={styles["performance-list__title"]}>공연 목록</h3>
      <ul className={styles["performance-list__items"]}>
        {performances.map((performance) => (
          <li key={performance.id} className={styles["performance-list__item"]}>
            <Link
              to={`/performances/${performance.id}`}
              className={styles["performance-list__item-link"]}
            >
              <h4 className={styles["performance-list__item-title"]}>
                {performance.name}
              </h4>
              <p className={styles["performance-list__item-info"]}>
                📍공연장 : {performance.place}
              </p>
              <p className={styles["performance-list__item-info"]}>
                🎭장르 : {performance.genre}
              </p>
              <p className={styles["performance-list__item-info"]}>
                📅 상태 : {performance.state}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={styles["performance-list__empty"]}>
      <div className={styles["performance-list"]}>공연 일정이 없습니다.</div>
    </div>
  );
}
