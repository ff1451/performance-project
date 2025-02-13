import { useEffect, useState } from "react";
import styles from "./NewestReview.module.css";
import { Review } from "@/types/Review";
import StarRating from "../StarRating/StarRating";

export default function NewestReview() {
  const [newestReviews, setNewestReviews] = useState<Review[]>([]);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    const sortedReviews = allReviews
      .sort(
        (a: Review, b: Review) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    setNewestReviews(sortedReviews);
  }, []);

  return (
    <div className={styles["review-list"]}>
      <h3 className={styles["review-list__title"]}>최신 공연 리뷰</h3>
      {newestReviews.length === 0 ? (
        <p className={styles["review-list__empty"]}>아직 리뷰가 없습니다.</p>
      ) : (
        <ul className={styles["review-list__items"]}>
          {newestReviews.map((review) => (
            <li key={review.id} className={styles["review-list__item"]}>
              <h4 className={styles["review-list__item-title"]}>
                {review.performanceName || review.performanceId}
              </h4>
              <div className={styles["review-list__item-rating"]}>
                <StarRating
                  rating={review.rating}
                  readOnly={true}
                  starSize={18}
                  valueSize={14}
                />
              </div>
              <p className={styles["review-list__item-comment"]}>
                {review.comment}
              </p>
              <div className={styles["review-list__item-info"]}>
                <span className={styles["review-list__item-user"]}>
                  작성자 : {review.nickname}
                </span>
                <span className={styles["review-list__item-date"]}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
