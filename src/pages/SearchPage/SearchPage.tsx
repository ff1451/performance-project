import CardList from "@/components/Performance/CardList/CardList";
import Pagination from "@/components/Performance/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.css";
import { usePerformancePagination } from "@/hooks/usePerformancePagination";
import LoadingUI from "@/components/UI/LoadingUI/LoadingUI";

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const { paginatedData, totalPages, handlePageChange, isLoading, isFetching } =
    usePerformancePagination(currentPage, "", query);

  const handlePageChangeWithUrl = (page: number) => {
    setSearchParams({ q: query, page: page.toString() });
    handlePageChange(page);
  };

  return (
    <div className={styles["searchResults__container"]}>
      <h1 className={styles["searchResults__title"]}>
        {isLoading
          ? "검색 결과를 불러오는 중..."
          : paginatedData.length > 0
          ? `“${query}”에 대한 검색 결과`
          : "검색 결과가 없습니다."}
      </h1>

      <CardList performances={paginatedData} isLoading={isLoading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChangeWithUrl}
      />

      {!isLoading && isFetching && <LoadingUI />}
    </div>
  );
}
