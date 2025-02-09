import styles from "./DetailBody.module.css";
import { PerformanceDetail } from "@/types/performance";

interface DetailBodyProps {
  performance: PerformanceDetail;
}

export default function DetailBody({ performance }: DetailBodyProps) {
  return (
    <div className={styles["detail__a"]}>
      <div className={styles["detail__story"]}>
        <h3>공연소개</h3>
        <p>{performance.story}</p>
      </div>

      <div className={styles["image__container"]}>
        {performance.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${performance.name} ${index + 1}`}
            className={styles["detail__image"]}
          />
        ))}
      </div>
    </div>
  );
}
