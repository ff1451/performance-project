import { usePerformanceDetail } from "@/hooks/usePerformanceDetail";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BookingModal from "@/components/BookingModal/BookingModal";
import DetailHeader from "@/components/PerformanceDetail/Header/Header";
import Info from "@/components/PerformanceDetail/PerformanceInfo/Info";
import Tab from "@/components/PerformanceDetail/Tab/Tab";
import DetailBody from "@/components/PerformanceDetail/DetailBody/DetailBody";
import ReviewSection from "@/components/Review/ReviewSection";
import styles from "./PerformanceDetail.module.css";
import PerformanceDetailSkeleton from "@/components/PerformanceDetail/SkeletonDetail/SkeletonDetail";

export default function PerformanceDetail() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "review">("info");

  if (!id) {
    return <div className={styles["error-message"]}>잘못된 접근</div>;
  }

  const { data, isLoading } = usePerformanceDetail(id);

  if (isLoading) {
    return <PerformanceDetailSkeleton />;
  }

  if (!data) {
    return (
      <div className={styles["error-message"]}>데이터를 불러오는 중...</div>
    );
  }

  return (
    <div className={styles["detail"]}>
      <DetailHeader
        performance={data}
        onBookingButtonClick={() => setIsOpen(true)}
      />
      <Info performance={data} />

      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "info" ? (
        <DetailBody performance={data} />
      ) : (
        <ReviewSection
          performanceId={id}
          performanceName={data.name}
          performancePoster={data.poster}
        />
      )}

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingUrl={data?.bookingSite || []}
      />
    </div>
  );
}
