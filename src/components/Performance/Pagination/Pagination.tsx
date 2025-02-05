import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const startPage = Math.max(currentPage - 4, 1);
  const endPage = Math.min(currentPage + 4, totalPages);

  return (
    <div className={styles["pagination"]}>
      <button
        className={`${styles["pagination__button"]} ${
          currentPage === 1 ? styles["pagination__button--disabled"] : ""
        }`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        ≪
      </button>

      <button
        className={`${styles["pagination__button"]} ${
          currentPage === 1 ? styles["pagination__button--disabled"] : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ＜
      </button>

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <button
          key={page}
          className={`${styles["pagination__button"]} ${
            currentPage === page ? styles["pagination__button--active"] : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`${styles["pagination__button"]} ${
          currentPage === totalPages
            ? styles["pagination__button--disabled"]
            : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ＞
      </button>

      <button
        className={`${styles["pagination__button"]} ${
          currentPage === totalPages
            ? styles["pagination__button--disabled"]
            : ""
        }`}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        ≫
      </button>
    </div>
  );
}
