import { DirectionButton } from "@/components/UI/DirectionButton/DirectionButton";
import styles from "./SliderNav.module.css";

interface SliderNavProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function SliderNav({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: SliderNavProps) {
  return (
    <div className={styles["slider-container__left"]}>
      <h2 className={styles["slider-container__title"]}>예매 순위</h2>
      <div className={styles["slider-container__button-container"]}>
        <DirectionButton direction="prev" onClick={onPrev} />
        <span className={styles["slider-container__page"]}>
          {currentPage + 1} / {totalPages}
        </span>
        <DirectionButton direction="next" onClick={onNext} />
      </div>
    </div>
  );
}
