import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewList from "./ReviewList/ReviewList";
import Modal from "@/components/UI/Modal/Modal";
import { Review } from "@/types/Review";

export default function ReviewSection({
  performanceId,
  performanceName,
}: {
  performanceId: string;
  performanceName: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allReviews = JSON.parse(
      localStorage.getItem("reviews") || "[]"
    ) as Review[];

    const filteredReviews = allReviews.filter(
      (review: Review) => review.performanceId === performanceId
    );

    setReviews(filteredReviews);
  }, [performanceId]);

  const handleSaveReview = (review: Review) => {
    const allReviews = JSON.parse(
      localStorage.getItem("reviews") || "[]"
    ) as Review[];

    const reviewExists = allReviews.some((r) => r.id === review.id);

    const updatedAllReviews = reviewExists
      ? allReviews.map((r) => (r.id === review.id ? review : r))
      : [...allReviews, review];

    localStorage.setItem("reviews", JSON.stringify(updatedAllReviews));

    const filteredReviews = updatedAllReviews.filter(
      (r) => r.performanceId === performanceId
    );
    setReviews(filteredReviews);
  };

  const handleDeleteReview = (id: string) => {
    const allReviews = JSON.parse(
      localStorage.getItem("reviews") || "[]"
    ) as Review[];

    const updatedAllReviews = allReviews.filter((r) => r.id !== id);
    localStorage.setItem("reviews", JSON.stringify(updatedAllReviews));

    const filteredReviews = updatedAllReviews.filter(
      (r) => r.performanceId === performanceId
    );
    setReviews(filteredReviews);
  };

  const handleEditInitiate = (review: Review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (review: Review) => {
    handleSaveReview(review);
    setEditingReview(null);
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
        onDelete={handleDeleteReview}
        onEdit={handleEditInitiate}
      />

      {isModalOpen && editingReview && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ReviewForm
            performanceId={performanceId}
            performanceName={performanceName}
            editingReview={editingReview}
            onSave={handleSaveEdit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
