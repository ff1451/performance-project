import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styles["modal-overlay"]}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["modal-close"]} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
