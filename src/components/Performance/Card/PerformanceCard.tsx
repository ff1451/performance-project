import { Performance } from "@/types/performance";
import styles from "./PerformanceCard.module.css";
import { Link } from "react-router-dom";

interface InfoProps {
  label: string;
  value: string;
}

const Info = ({ label, value }: InfoProps) => {
  return (
    <p className={styles["performance__card-text"]}>
      <span className={styles["performance__card-text-label"]}>{label} : </span>
      {value}
    </p>
  );
};

export default function PerformanceCard({
  performance,
}: {
  performance: Performance;
}) {
  const genreClass = `performance__card-genre--${performance.genre
    .replace(/\s/g, "-")
    .replace(/[()]/g, "")
    .replace("/", "")}`;

  return (
    <li className={styles["performance__card"]}>
      <div>
        <Link
          to={`/performances/${performance.id}`}
          className={styles["performance__card-link"]}
        >
          <div className={styles["performance__card-image-wrapper"]}>
            <img
              src={performance.poster}
              alt={performance.name}
              className={styles["performance__card-poster"]}
            />
          </div>
        </Link>
      </div>

      <div className={styles["performance__card-info"]}>
        <span
          className={`${styles["performance__card-genre"]} ${styles[genreClass]}`}
        >
          {performance.genre}
        </span>
        <Link
          to={`/performances/${performance.id}`}
          className={styles["performance__card-link"]}
        >
          <h4 className={styles["performance__card-title"]}>
            {performance.name}
          </h4>
        </Link>

        <div className={styles["performance__card-detail"]}>
          <Info
            label="기간"
            value={`${performance.startDate} ~ ${performance.endDate}`}
          />
          <Info label="공연장" value={performance.place} />
          <Info label="지역" value={performance.area} />
        </div>
      </div>
    </li>
  );
}
