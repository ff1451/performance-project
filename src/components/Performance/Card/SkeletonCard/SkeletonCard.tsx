import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <li className={styles["skeleton-card"]}>
      <div className={styles["skeleton-card__image-wrapper"]}>
        <div className={styles["skeleton-card__image"]} />
      </div>

      <div className={styles["skeleton-card__info"]}>
        <div className={styles["skeleton-card__genre"]} />
        <div className={styles["skeleton-card__title"]} />
        <div className={styles["skeleton-card__detail"]}>
          <div className={styles["skeleton-card__info-item"]} />
          <div className={styles["skeleton-card__info-item"]} />
          <div className={styles["skeleton-card__info-item"]} />
        </div>
      </div>
    </li>
  );
}
