import styles from "./PerformanceListPage.module.css";
import PerformanceCategoryNav from "@/components/Performance/CategoryNav/PerformanceCategoryNav";
import Pagination from "@/components/Performance/Pagination/Pagination";
import CardList from "@/components/Performance/CardList/CardList";
import { usePerformancePagination } from "@/hooks/usePerformancePagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PerformanceList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const currentPage = Number(searchParams.get("page")) || 1;

  const { paginatedData, totalPages, handlePageChange } =
    usePerformancePagination(currentPage, selectedCategory);

  const handlePageChangeWithUrl = (page: number) => {
    setSearchParams({ page: page.toString() });
    handlePageChange(page);
  };

  useEffect(() => {
    const newPage = Number(searchParams.get("page")) || 1;
    handlePageChange(newPage);
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ page: "1" });
  }, [selectedCategory]);

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
        onPageChange={handlePageChangeWithUrl}
      />
    </div>
  );
}
