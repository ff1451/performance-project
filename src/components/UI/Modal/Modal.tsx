import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  height?: string;
}

export default function Modal({
  children,
  onClose,
  width,
  height,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles["modal__overlay"]}>
      <div
        ref={modalRef}
        className={styles["modal__content"]}
        style={{ width, height }}
      >
        <button className={styles["modal__close-button"]} onClick={onClose}>
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
