import { Performance } from "@/types/performance";
import styles from "./PerformanceList.module.css";

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
            <h4 className={styles["performance-list__item-title"]}>
              {performance.name}
            </h4>
            <p className={styles["performance-list__item-info"]}>
              {performance.place}
            </p>
            <p className={styles["performance-list__item-info"]}>
              {performance.genre}
            </p>
            <p className={styles["performance-list__item-info"]}>
              {performance.state}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={styles["performance-list__empty"]}>
      {" "}
      공연 일정이 없습니다.
    </div>
  );
}
