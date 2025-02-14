import styles from "./PerformanceListPage.module.css";
import PerformanceCategoryNav from "@/components/Performance/CategoryNav/PerformanceCategoryNav";
import Pagination from "@/components/Performance/Pagination/Pagination";
import CardList from "@/components/Performance/CardList/CardList";
import { usePerformancePagination } from "@/hooks/usePerformancePagination";
import { useState } from "react";

export default function PerformanceList() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const { paginatedData, currentPage, totalPages, handlePageChange } =
    usePerformancePagination(selectedCategory);

  return (
    <div className={styles["performance"]}>
      <PerformanceCategoryNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <CardList performances={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
