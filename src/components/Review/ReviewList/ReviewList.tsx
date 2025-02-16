import { Review } from "@/types/Review";
import styles from "./ReviewList.module.css";
import { useAuthStore } from "@/stores/useAuthStore";
import classNames from "classnames";
import StarRating from "@/components/Review/StarRating/StarRating";
import { Link } from "react-router-dom";

interface ReviewListProps {
  reviews: Review[];
  onDelete: (id: string) => void;
  onEdit: (review: Review) => void;
  showPerformanceInfo?: boolean;
}

export default function ReviewList({
  reviews,
  onDelete,
  onEdit,
  showPerformanceInfo = false,
}: ReviewListProps) {
  const { user } = useAuthStore();

  return (
    <div className={styles["review-list"]}>
      {reviews.length === 0 ? (
        <p className={styles["review-list__empty"]}>아직 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className={styles["review-item"]}>
            {showPerformanceInfo && (
              <div className={styles["review-item__performance-image"]}>
                <Link
                  to={`/performances/${review.performanceId}`}
                  className={styles["review-item__performance-link"]}
                >
                  <img
                    src={review.performancePoster}
                    alt={review.performanceName}
                    className={styles["review-item__performance-poster"]}
                  />
                </Link>
              </div>
            )}
            <div className={styles["review-item__content-wrapper"]}>
              <div className={styles["review-item__header"]}>
                {showPerformanceInfo && (
                  <span className={styles["review-item__performance-name"]}>
                    {review.performanceName}
                  </span>
                )}
                <StarRating
                  rating={review.rating}
                  readOnly={true}
                  starSize={20}
                  valueSize={15}
                />
              </div>
              <div className={styles["review-item__content"]}>
                <p className={styles["review-item__comment"]}>
                  {review.comment}
                </p>
              </div>

              <div className={styles["review-item__info"]}>
                <span className={styles["review-item__nickname"]}>
                  {review.nickname}{" "}
                </span>
                <span className={styles["review-item__date"]}>
                  {new Date(review.createdAt).toLocaleDateString()}{" "}
                  {new Date(review.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {user?.email === review.email && (
                <div className={styles["review-item__buttons"]}>
                  <button
                    className={styles["review-item__button"]}
                    onClick={() => onEdit(review)}
                  >
                    수정
                  </button>
                  <button
                    className={classNames(
                      styles["review-item__button"],
                      styles["review-item__button--delete"]
                    )}
                    onClick={() => onDelete(review.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
