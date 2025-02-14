import { Performance } from "@/types/performance";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import { Heart } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  performance: Performance;
  onBookingButtonClick: () => void;
}

export default function DetailHeader({
  performance,
  onBookingButtonClick,
}: HeaderProps) {
  const { isLoggedIn, user } = useAuthStore();
  const { favorites, toggleFavorite } = useFavoriteStore();

  const isFavorite =
    isLoggedIn && user
      ? favorites[user.email]?.some((fav) => fav.id === performance.id)
      : false;

  const handleFavoriteClick = () => {
    if (!isLoggedIn || !user) {
      alert("로그인이 필요합니다.");
      return;
    }
    toggleFavorite(user.email, performance);
  };

  const genreClass = `detail__genre--${performance?.genre
    .replace(/\s/g, "-")
    .replace(/[()]/g, "")
    .replace("/", "")}`;

  return (
    <div className={styles["detail__header"]}>
      <div className={styles["detail__container"]}>
        <h3 className={styles["detail__title"]}>{performance.name}</h3>
        <span className={`${styles["detail__genre"]} ${styles[genreClass]}`}>
          {performance.genre}
        </span>
      </div>

      <div className={styles["detail__button-group"]}>
        <button
          className={styles["detail__favorite-button"]}
          onClick={handleFavoriteClick}
        >
          <Heart
            className={styles["heart-icon"]}
            fill={isFavorite ? "#e63946" : "none"}
            stroke="#e63946"
          />
        </button>

        <button
          className={styles["detail__booking-button"]}
          onClick={onBookingButtonClick}
        >
          예매 바로가기
        </button>
      </div>
    </div>
  );
}
