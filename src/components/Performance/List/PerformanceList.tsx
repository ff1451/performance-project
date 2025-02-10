import styles from "./PerformanceList.module.css";
import { usePerformanceList } from "@/hooks/usePerformanceList";
import PerformanceCard from "@/components/Performance/Card/PerformanceCard";
import PerformanceCategoryNav from "@/components/Performance/CategoryNav/PerformanceCategoryNav";
import Pagination from "@/components/Performance/Pagination/Pagination";
import { usePerformanceListStore } from "@/stores/usePerformanceListStore";

const PAGE_SIZE = 18;

export default function PerformanceList() {
  const { selectedCategory, currentPage, setCurrentPage } =
    usePerformanceListStore();

  const { data, fetchNextPage, hasNextPage } =
    usePerformanceList(selectedCategory);

  const allPerformances = data?.pages.flat() || [];

  const totalPages = Math.ceil(allPerformances.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = allPerformances.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    if (page > allPerformances.length / PAGE_SIZE && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className={styles["performance"]}>
      <PerformanceCategoryNav />
      <div className={styles["performance__list-container"]}>
        <ul className={styles["performance__list"]}>
          {paginatedData.map((item) => (
            <PerformanceCard key={item.id} performance={item} />
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
