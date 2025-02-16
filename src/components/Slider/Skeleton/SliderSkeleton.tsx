import styles from "./SliderSkeleton.module.css";

export default function SliderSkeleton({ itemsCount }: { itemsCount: number }) {
  const items = new Array(itemsCount).fill(0);
  return (
    <div className={styles["slider-container--skeleton"]}>
      <div className={styles["slider__wrapper--skeleton"]}>
        {items.map((_, idx) => (
          <div key={idx} className={styles["slider__item--skeleton"]}>
            <div className={styles["slider__image--skeleton"]} />
            <div className={styles["slider__text--skeleton"]}>
              <div className={styles["slider__name--skeleton"]} />
              <div className={styles["slider__period--skeleton"]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
