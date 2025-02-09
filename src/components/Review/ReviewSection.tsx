import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewList from "./ReviewList/ReviewList";

export default function ReviewSection({
  performanceId,
}: {
  performanceId: string;
}) {
  return (
    <>
      <ReviewForm performanceId={performanceId} />
      <ReviewList performanceId={performanceId} />
    </>
  );
}
