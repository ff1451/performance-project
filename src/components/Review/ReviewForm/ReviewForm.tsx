import React, { useEffect, useState } from "react";
import styles from "./ReviewForm.module.css";
import { Review } from "@/types/Review";
import { useAuthStore } from "@/stores/useAuthStore";
import StarRating from "../StarRating/StarRating";
import LoginModal from "@/components/LoginModal/LoginModal";

interface ReviewFormProps {
  performanceId: string;
  performanceName: string;
  performancePoster: string;
  editingReview?: Review | null;
  onSave: (review: Review) => void;
  onCancel?: () => void;
}

export default function ReviewForm({
  performanceId,
  performanceName,
  performancePoster,
  editingReview,
  onSave,
  onCancel,
}: ReviewFormProps) {
  const { user, isLoggedIn } = useAuthStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const MAX_LENGTH = 1000;

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating);
      setComment(editingReview.comment);
    } else {
      setRating(0);
      setComment("");
    }
  }, [editingReview]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (rating === 0) {
      alert("별점을 최소 0.5 이상 입력해주세요.");
      return;
    }

    const newReview: Review = {
      id: editingReview ? editingReview.id : Date.now().toString(),
      performanceId,
      performanceName,
      performancePoster,
      nickname: user.nickname,
      email: user.email,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    onSave(newReview);

    if (!editingReview) {
      setRating(5);
      setComment("");
    }
  };

  return (
    <div className={styles["review-form__container"]}>
      <form className={styles["review-form"]} onSubmit={handleSubmit}>
        <h3 className={styles["review-form__title"]}>
          {editingReview ? "리뷰 수정" : "리뷰 작성"}
        </h3>

        <StarRating rating={rating} setRating={setRating} starSize={35} />
        <div>
          <textarea
            className={styles["review-form__textarea"]}
            placeholder="리뷰를 작성하세요(최대 1000자)"
            value={comment}
            onChange={handleCommentChange}
            required
          />

          <p className={styles["review-form__length"]}>
            {comment.length}/{MAX_LENGTH}
          </p>
        </div>

        <div className={styles["review-form__button-container"]}>
          <button className={styles["review-form__button"]} type="submit">
            {editingReview ? "수정 완료" : "리뷰 등록"}
          </button>

          {editingReview ? (
            <button
              className={styles["review-form__reset-button"]}
              type="button"
              onClick={onCancel}
            >
              취소
            </button>
          ) : (
            <button
              className={styles["review-form__reset-button"]}
              type="button"
              onClick={() => {
                setRating(0);
                setComment("");
              }}
            >
              초기화
            </button>
          )}
        </div>
      </form>

      {!isLoggedIn && (
        <div className={styles["review-overlay"]}>
          <div className={styles["review-overlay__content"]}>
            <p>리뷰를 작성하려면 로그인이 필요합니다.</p>
            <button
              className={styles["review-overlay__button"]}
              onClick={() => setIsOpen(true)}
            >
              로그인
            </button>
          </div>
        </div>
      )}

      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
