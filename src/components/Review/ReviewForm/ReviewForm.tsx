import React, { useState } from "react";
import styles from "./ReviewForm.module.css";
import { Review } from "@/types/Review";

export default function ReviewForm({
  performanceId,
}: {
  performanceId: string;
}) {
  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now().toString(),
      performanceId,
      nickname,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    setNickname("");
    setRating(0);
    setComment("");
  };

  return (
    <form className={styles["review-form"]} onSubmit={handleSubmit}>
      <input
        className={styles["review-form__input"]}
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <select
        className={styles["review-form__select"]}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star}점
          </option>
        ))}
      </select>
      <textarea
        className={styles["review-form__textarea"]}
        placeholder="리뷰를 작성하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button className={styles["review-form__button"]} type="submit">
        리뷰 등록
      </button>
    </form>
  );
}
