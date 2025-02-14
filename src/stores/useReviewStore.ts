import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Review } from "@/types/Review";

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (review: Review) => void;
  deleteReview: (id: string) => void;
  getReviewsByPerformance: (performanceId: string) => Review[];
  getNewestReviews: () => Review[];
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (review) =>
        set((state) => ({
          reviews: [...state.reviews, review],
        })),

      updateReview: (updatedReview) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          ),
        })),

      deleteReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== id),
        })),

      getReviewsByPerformance: (performanceId) =>
        get().reviews.filter(
          (review) => review.performanceId === performanceId
        ),

      getNewestReviews: () =>
        [...get().reviews]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5),
    }),
    { name: "reviews-storage" }
  )
);
