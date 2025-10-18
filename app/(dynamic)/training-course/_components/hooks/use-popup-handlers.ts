"use client";
import { usePopupStore } from "@/store/popup-store";
export const usePopupHandlers = () => {
  const { openDownload, openRegister, openInquire } = usePopupStore();

  const handleDownload = (timing: Timing, course: Course) => {
    openDownload({
      course,
      timing,
      courseTitle: course.title,
      timingId: timing.id.toString(),
    });
  };

  const handleRegister = (timing: Timing, course: Course) => {
    openRegister({
      course,
      timing,
      courseTitle: course.title,
      timingId: timing.id.toString(),
    });
  };

  const handleInquire = (timing: Timing, course: Course) => {
    openInquire({
      course,
      timing,
      courseTitle: course.title,
      timingId: timing.id.toString(),
    });
  };

  return {
    handleDownload,
    handleRegister,
    handleInquire,
  };
};
