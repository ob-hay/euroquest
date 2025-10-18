"use client";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import UpcommingCourseCard from "../../../components/cards/upcomming-card";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface UpcomingCoursesSliderProps {
  upcomingCourses: UpcomingCourse[];
}

export default function UpcomingCoursesSlider({ upcomingCourses }: UpcomingCoursesSliderProps) {
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !upcomingCourses) return;

    // Initialize Swiper
    const coursesSwiper = new Swiper('.courses-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.courses-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.courses-slider .next-btn',
        prevEl: '.courses-slider .prev-btn',
      },
      breakpoints: {
        640: {
          slidesPerView: 'auto',
        },
        1024: {
          slidesPerView: 'auto',
        },
      },
    });

    return () => {
      if (coursesSwiper) coursesSwiper.destroy();
    };
  }, [upcomingCourses, isClient]);

  return (
    <div className="courses-slider relative pb-4">
      {/* Swiper Container */}
      <div className={`courses-swiper overflow-hidden ${!isClient ? "opacity-0" : "opacity-100"}`}>
        <div className="swiper-wrapper">
          {upcomingCourses.map((course) => (
            <div key={course.timing_id} className="swiper-slide">
              <UpcommingCourseCard course={course} />
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>

      {/* Navigation Buttons */}
      {isClient && upcomingCourses && upcomingCourses.length > 0 && (
        <div className="slider-navigation flex justify-center gap-4 mt-8">
          <button
            className="nav-btn prev-btn w-9 h-9 cursor-pointer bg-white border border-[#3E5EC0] rounded-full flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white active:scale-95 active:bg-[#2E4EA0] active:border-[#2E4EA0] transition-all duration-300"
            type="button"
            aria-label="Previous courses"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="nav-btn next-btn w-9 h-9 cursor-pointer bg-white border border-[#3E5EC0] rounded-full flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white active:scale-95 active:bg-[#2E4EA0] active:border-[#2E4EA0] transition-all duration-300"
            type="button"
            aria-label="Next courses"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      )}
    </div>
  );
}
