import { useState, useEffect, useRef } from "react";
import { boxoffice } from "@/types/performance";
import { Link } from "react-router-dom";
import styles from "./Slider.module.css";
import SliderSkeleton from "./Skeleton/SliderSkeleton";
import SliderNav from "./SliderNav/SliderNav";
import { ImagePreLoading } from "@/utils/ImagePreLoading";

interface SliderProps {
  data: boxoffice[];
  isLoading?: boolean;
}

export default function Slider({ data, isLoading = false }: SliderProps) {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = () => {
    if (totalPages > 0) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      resetTimer();
    }
  };

  const prevSlide = () => {
    if (totalPages > 0) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      resetTimer();
    }
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(nextSlide, 4000);
  };

  useEffect(() => {
    const nextSlide = (currentPage + 1) % totalPages;
    const nextSlideItems = data.slice(
      nextSlide * itemsPerPage,
      (nextSlide + 1) * itemsPerPage
    );
    ImagePreLoading(nextSlideItems.map((item) => item.poster));
  }, [currentPage, totalPages, data]);

  useEffect(() => {
    if (data.length > 0) {
      intervalRef.current = window.setInterval(nextSlide, 4000);
    }
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [data, totalPages]);

  return (
    <div className={styles["slider-container"]}>
      <SliderNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={prevSlide}
        onNext={nextSlide}
      />

      {isLoading ? (
        <SliderSkeleton itemsCount={itemsPerPage} />
      ) : (
        <div className={styles["slider-container__right"]}>
          <div className={styles["slider-wrapper"]}>
            {data
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
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
      )}
    </div>
  );
}
