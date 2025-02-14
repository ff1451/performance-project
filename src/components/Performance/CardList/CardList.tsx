import { Performance } from "@/types/performance";
import styles from "./CardList.module.css";
import PerformanceCard from "@/components/Performance/Card/PerformanceCard";

interface CardListProps {
  performances: Performance[];
}

export default function CardList({ performances }: CardListProps) {
  return (
    <div className={styles["performance__list-container"]}>
      <ul className={styles["performance__list"]}>
        {performances.map((item) => (
          <PerformanceCard key={item.id} performance={item} />
        ))}
      </ul>
    </div>
  );
}
