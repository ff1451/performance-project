import { Performance } from "@/types/performance";
import styles from "./Header.module.css";

interface HeaderProps {
  performance: Performance;
  onBookingButtonClick: () => void;
}

export default function DetailHeader({
  performance,
  onBookingButtonClick,
}: HeaderProps) {
  const genreClass = `detail__genre--${performance?.genre
    .replace(/\s/g, "-")
    .replace(/[()]/g, "")
    .replace("/", "")}`;

  return (
    <div className={styles["detail__header"]}>
      <div className={styles["detail__container"]}>
        <h3 className={styles["detail__title"]}>{performance.name}</h3>
        <span className={`${styles["detail__genre"]} ${styles[genreClass]}`}>
          {performance.genre}
        </span>
      </div>

      <button
        className={styles["detail__booking-button"]}
        onClick={onBookingButtonClick}
      >
        예매 바로가기
      </button>
    </div>
  );
}
