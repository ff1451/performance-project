import styles from "./SkeletonDetail.module.css";

export default function PerformanceDetailSkeleton() {
  return (
    <div className={styles["skeleton-detail"]}>
      <div className={styles["skeleton-detail__header"]}>
        <div className={styles["skeleton-detail__title"]} />
        <div className={styles["skeleton-detail__genre"]} />
        <div className={styles["skeleton-detail__button-group"]}>
          <div className={styles["skeleton-detail__button"]} />
          <div className={styles["skeleton-detail__button"]} />
        </div>
      </div>

      <div className={styles["skeleton-detail__info"]}>
        <div className={styles["skeleton-detail__poster"]} />
        <div className={styles["skeleton-detail__table"]}>
          <div className={styles["skeleton-detail__cell"]} />
          <div className={styles["skeleton-detail__cell"]} />
          <div className={styles["skeleton-detail__cell"]} />
          <div className={styles["skeleton-detail__cell"]} />
          <div className={styles["skeleton-detail__cell"]} />
          <div className={styles["skeleton-detail__cell"]} />
          <div className={styles["skeleton-detail__cell"]} />
        </div>
      </div>

      <div className={styles["skeleton-detail__tab"]}>
        <div className={styles["skeleton-detail__tab-button"]} />
        <div className={styles["skeleton-detail__tab-button"]} />
      </div>

      <div className={styles["skeleton-detail__body"]}>
        <div className={styles["skeleton-detail__image"]} />
        <div className={styles["skeleton-detail__image"]} />
      </div>
    </div>
  );
}
