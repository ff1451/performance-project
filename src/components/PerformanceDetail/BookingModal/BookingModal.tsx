import { BookingSite } from "@/types/performance";
import styles from "./BookingModal.module.css";
import Modal from "../../UI/Modal/Modal";

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
    <Modal onClose={onClose} width="400px">
      <div className={styles["booking-modal__header"]}>
        <h2 className={styles["booking-modal__title"]}>예매 페이지</h2>
        <p className={styles["booking-modal__description"]}>
          링크 클릭시 이동합니다
        </p>
      </div>

      <ul className={styles["booking-modal__list"]}>
        {bookingUrl.map((site, index) => (
          <li key={index} className={styles["booking-modal__item"]}>
            <a
              href={site.url}
              target="_blank"
              className={styles["booking-modal__link"]}
            >
              {site.name} 예매하기
            </a>
          </li>
        ))}
      </ul>

      <button onClick={onClose} className={styles["booking-modal__close"]}>
        닫기
      </button>
    </Modal>
  );
}
