import { useState } from "react";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewList from "./ReviewList/ReviewList";
import Modal from "@/components/UI/Modal/Modal";
import { useReviewStore } from "@/stores/useReviewStore";
import { Review } from "@/types/Review";
import styles from "./ReviewSection.module.css";

export default function ReviewSection({
  performanceId,
  performanceName,
  performancePoster,
}: {
  performanceId: string;
  performanceName: string;
  performancePoster: string;
}) {
  const { getReviewsByPerformance, addReview, updateReview, deleteReview } =
    useReviewStore();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = getReviewsByPerformance(performanceId);

  const handleSaveReview = (review: Review) => {
    if (editingReview) {
      updateReview(review);
      setEditingReview(null);
    } else {
      addReview(review);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ReviewForm
        performanceId={performanceId}
        performanceName={performanceName}
        performancePoster={performancePoster}
        onSave={handleSaveReview}
      />
      <h3 className={styles["review-list__title"]}>작성된 리뷰</h3>
      <ReviewList
        reviews={reviews}
        onDelete={deleteReview}
        onEdit={(review) => {
          setEditingReview(review);
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && editingReview && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ReviewForm
            performanceId={performanceId}
            performanceName={performanceName}
            performancePoster={performancePoster}
            editingReview={editingReview}
            onSave={handleSaveReview}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
