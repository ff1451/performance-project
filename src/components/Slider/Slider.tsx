import { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css";
import { boxoffice } from "../../types/performance";
import { Link } from "react-router-dom";
import { DirectionButton } from "../UI/DirectionButton";

interface SliderProps {
  data: boxoffice[];
}

export default function Slider({ data }: SliderProps) {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(nextSlide, 2000);
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(nextSlide, 2000);
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={styles["slider-container"]}>
      <div className={styles["slider-container__left"]}>
        <h2 className={styles["slider-container__title"]}>예매 순위</h2>
        <div className={styles["slider-container__button-container"]}>
          <DirectionButton direction="prev" onClick={prevSlide} />
          <span className={styles["slider-container__page"]}>
            {currentPage + 1} / {totalPages}
          </span>
          <DirectionButton direction="next" onClick={nextSlide} />
        </div>
      </div>

      <div className={styles["slider-container__right"]}>
        <div className={styles["slider-wrapper"]}>
          {data
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((item) => (
              <div key={item.id} className={styles["slider-wrapper__item"]}>
                <Link to={`/performances/${item.id}`}>
                  <img
                    src={item.poster}
                    alt={item.name}
                    className={styles["slider-wrapper__image"]}
                  />
                </Link>

                <div className={styles["slider-wrapper__text"]}>
                  <Link
                    to={`/performances/${item.id}`}
                    className={styles["slider-wrapper__link"]}
                  >
                    <h3 className={styles["slider-wrapper__name"]}>
                      {item.name}
                    </h3>
                  </Link>

                  <p className={styles["slider-wrapper__period"]}>
                    {item.period}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
