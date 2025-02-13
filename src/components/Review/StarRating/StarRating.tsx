import { useState } from "react";
import Star from "@/assets/star.svg?react";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
  starSize?: number;
  valueSize?: number;
}

export default function StarRating({
  rating,
  setRating,
  readOnly = false,
  starSize = 40,
  valueSize = 20,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);

  const isInteractive = !readOnly && setRating !== undefined;

  const calculateRating = (
    e: React.MouseEvent<HTMLDivElement>,
    star: number
  ): number => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - left;
    return star - (relativeX < width / 2 ? 0.5 : 0);
  };

  const displayRating = isInteractive ? hover || rating : rating;

  return (
    <div className={styles["star-rating__container"]}>
      <svg className={styles["star-rating__svg"]}>
        <defs>
          {[1, 2, 3, 4, 5].map((star) => (
            <linearGradient
              key={star}
              id={`halfGradient-${star}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="50%" stopColor="gold" />
              <stop offset="50.01%" stopColor="gray" />
            </linearGradient>
          ))}
        </defs>
      </svg>

      <div
        className={styles["star-rating__stars"]}
        {...(isInteractive ? { onMouseLeave: () => setHover(0) } : {})}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          let fillType: "empty" | "half" | "full" = "empty";
          if (displayRating >= star) {
            fillType = "full";
          } else if (displayRating >= star - 0.5) {
            fillType = "half";
          }

          const fillColor =
            fillType === "full"
              ? "gold"
              : fillType === "half"
              ? `url(#halfGradient-${star})`
              : "gray";

          return (
            <div
              key={star}
              {...(isInteractive
                ? {
                    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) =>
                      setHover(calculateRating(e, star)),
                    onClick: (e: React.MouseEvent<HTMLDivElement>) =>
                      setRating && setRating(calculateRating(e, star)),
                  }
                : {})}
            >
              <Star
                fill={fillColor}
                className={`${styles["star-rating__star"]} ${
                  isInteractive ? styles["star-rating__star--interactive"] : ""
                }`}
                style={{ width: `${starSize}px`, height: `${starSize}px` }}
              />
            </div>
          );
        })}

        <span
          className={styles["star-rating__value"]}
          style={{ fontSize: valueSize }}
        >
          {displayRating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
