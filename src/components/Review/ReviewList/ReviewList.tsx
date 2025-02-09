import { Review } from "@/types/Review";
import { useEffect, useState } from "react";
import styles from "./ReviewList.module.css";

export default function ReviewList({
  performanceId,
}: {
  performanceId: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const filteredReviews = allReviews.filter(
      (review: Review) => review.performanceId === performanceId
    );
    setReviews(filteredReviews);
  }, [performanceId]);

  return (
    <div className={styles["review-list"]}>
      {reviews.length === 0 ? (
        <p>작성된 리뷰가 없습니다</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className={styles["review-item"]}>
            <strong>{review.nickname}</strong> ({review.rating}점)
            <p>{review.comment}</p>
            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
