import CardList from "@/components/Performance/CardList/CardList";
import Pagination from "@/components/Performance/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.css";
import { usePerformancePagination } from "@/hooks/usePerformancePagination";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { paginatedData, currentPage, totalPages, handlePageChange } =
    usePerformancePagination("", query);

  return (
    <div className={styles["searchResults__container"]}>
      <h1 className={styles["searchResults__title"]}>
        {paginatedData.length > 0
          ? `“${query}”에 대한 검색 결과`
          : "검색 결과가 없습니다."}
      </h1>

      {paginatedData.length > 0 && (
        <>
          <CardList performances={paginatedData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
