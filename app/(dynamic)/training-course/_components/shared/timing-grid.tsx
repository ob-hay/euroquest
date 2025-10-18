import { CourseDetailResponse } from "@/services/services";
import TimingCard from "@/components/cards/timing-card";
import { convertToTimingType, convertToCourseType, formatDate } from "../utils/data-transformers";
import { GRID_CLASSES, NO_RESULTS_CLASSES } from "../utils/constants";

interface TimingGridProps {
  timings: CourseDetailResponse["timings"];
  course: CourseDetail;
  cities: City[];
  onDownload?: (timing: Timing, course: Course) => void;
  onRegister?: (timing: Timing, course: Course) => void;
  onInquire?: (timing: Timing, course: Course) => void;
}

export default function TimingGrid({
  timings,
  course,
  cities,
  onDownload,
  onRegister,
  onInquire,
}: TimingGridProps) {
  if (timings.length === 0) {
    return (
      <div className={NO_RESULTS_CLASSES}>
        <i className="fas fa-search text-4xl mb-4 opacity-50"></i>
        <h3 className="mb-2">No timings found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className={GRID_CLASSES}>
      {timings.map((timing) => (
        <TimingCard
          key={timing.id}
          timing={convertToTimingType(timing, cities)}
          course={convertToCourseType(course)}
          onDownload={onDownload}
          onRegister={onRegister}
          onInquire={onInquire}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
}
