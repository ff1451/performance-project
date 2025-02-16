import { useState } from "react";
import { Review } from "@/types/Review";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import { useReviewStore } from "@/stores/useReviewStore";
import styles from "./MyPage.module.css";
import CardList from "@/components/Performance/CardList/CardList";
import Modal from "@/components/UI/Modal/Modal";
import ReviewForm from "@/components/Review/ReviewForm/ReviewForm";
import ReviewList from "@/components/Review/ReviewList/ReviewList";
import useUserProfile from "@/hooks/useUserProfile";
import Profile from "@/components/Profile/Profile";

export default function MyPage() {
  const { user, isLoggedIn } = useAuthStore();
  const { favorites } = useFavoriteStore();
  const { reviews, addReview, updateReview, deleteReview } = useReviewStore();

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleSaveReview = (review: Review) => {
    if (editingReview) {
      updateReview(review);
    } else {
      addReview(review);
    }
    setIsModalOpen(false);
    setEditingReview(null);
  };

  if (!isLoggedIn || !user) {
    return <p className={styles["mypage__message"]}>로그인이 필요합니다.</p>;
  }

  const userFavorites = favorites[user.email] || [];
  const userReviews = reviews.filter((review) => review.email === user.email);

  const {
    nickname,
    setNickname,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    nicknameError,
    passwordError,
    editMode,
    setEditMode,
    handleNicknameBlur,
    handleUpdateProfile,
  } = useUserProfile();

  return (
    <>
      <div className={styles["mypage"]}>
        <h2 className={styles["mypage__title"]}>마이페이지</h2>

        <section className={styles["mypage__profile"]}>
          <h3 className={styles["mypage__section-title"]}>기본 정보</h3>
          <Profile
            user={user}
            editMode={editMode}
            nickname={nickname}
            currentPassword={currentPassword}
            newPassword={newPassword}
            nicknameError={nicknameError}
            passwordError={passwordError}
            onNicknameChange={(e) => setNickname(e.target.value)}
            onCurrentPasswordChange={(e) => setCurrentPassword(e.target.value)}
            onNewPasswordChange={(e) => setNewPassword(e.target.value)}
            onNicknameBlur={handleNicknameBlur}
            onEdit={() => setEditMode(true)}
            onSave={handleUpdateProfile}
            onCancel={() => setEditMode(false)}
          />
        </section>

        <section className={styles["mypage__favorites"]}>
          <h3 className={styles["mypage__section-title"]}>관심 공연 리스트</h3>
          {userFavorites.length > 0 ? (
            <CardList performances={userFavorites} />
          ) : (
            <p className={styles["mypage__empty"]}>관심 공연이 없습니다.</p>
          )}
        </section>

        <section className={styles["mypage__reviews"]}>
          <h3 className={styles["mypage__section-title"]}>작성한 리뷰</h3>
          <ReviewList
            reviews={userReviews}
            onEdit={handleEditReview}
            onDelete={deleteReview}
            showPerformanceInfo={true}
          />
        </section>
      </div>

      {isModalOpen && editingReview && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ReviewForm
            performanceId={editingReview.performanceId}
            performanceName={editingReview.performanceName}
            performancePoster={editingReview.performancePoster}
            editingReview={editingReview}
            onSave={handleSaveReview}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
