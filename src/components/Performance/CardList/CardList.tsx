import { Performance } from "@/types/performance";
import styles from "./CardList.module.css";
import PerformanceCard from "@/components/Performance/Card/PerformanceCard";
import SkeletonCard from "@/components/Performance/Card/SkeletonCard/SkeletonCard";

interface CardListProps {
  performances: Performance[];
  isLoading?: boolean;
}

export default function CardList({
  performances,
  isLoading = false,
}: CardListProps) {
  if (isLoading) {
    return (
      <div className={styles["performance__list-container"]}>
        <ul className={styles["performance__list"]}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </ul>
      </div>
    );
  }

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
