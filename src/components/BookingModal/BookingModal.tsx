import { BookingSite } from "@/types/performance";
import styles from "./BookingModal.module.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: BookingSite[];
}

export default function BookingModal({
  isOpen,
  onClose,
  bookingUrl,
}: BookingModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h2 className={styles["modal-title"]}>예매 페이지</h2>
        <p className={styles["modal-description"]}>링크 클릭시 이동합니다</p>
        <ul className={styles["booking-list"]}>
          {bookingUrl.map((site, index) => (
            <li key={index} className={styles["booking-item"]}>
              <a
                href={site.url}
                target="_blank"
                className={styles["booking-link"]}
              >
                {site.name} 예매하기
              </a>
            </li>
          ))}
        </ul>

        <button onClick={onClose} className={styles["modal-close"]}>
          닫기
        </button>
      </div>
    </div>
  );
}
