import { useState } from "react";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewList from "./ReviewList/ReviewList";
import Modal from "@/components/UI/Modal/Modal";
import { useReviewStore } from "@/stores/useReviewStore";
import { Review } from "@/types/Review";

export default function ReviewSection({
  performanceId,
  performanceName,
}: {
  performanceId: string;
  performanceName: string;
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
        onSave={handleSaveReview}
      />

      <ReviewList
        performanceId={performanceId}
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
            editingReview={editingReview}
            onSave={handleSaveReview}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
