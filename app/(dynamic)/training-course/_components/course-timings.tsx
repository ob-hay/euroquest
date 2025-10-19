"use client";
import { CourseDetailResponse } from "@/services/services";
import { useCities } from "@/services/hooks";
import { useTimingFilters } from "./hooks/use-timing-filters";
import { usePopupHandlers } from "./hooks/use-popup-handlers";
import SearchSection from "./shared/search-section";
import TimingGrid from "./shared/timing-grid";
import { createSearchFields, createCustomActions, SearchPageType } from "./utils/search-config";
import { usePathname } from "next/navigation";

interface CourseTimingsProps {
  course: CourseDetail;
  timings: CourseDetailResponse["timings"];
}

export default function CourseTimings({ course, timings }: CourseTimingsProps) {
  const { data: cities, isLoading: citiesLoading } = useCities();
  const pathname = usePathname();
  
  // Determine page type based on pathname
  const isCityCoursePage = pathname.includes(`/${course.slug}/`) && pathname.split('/').length > 3;
  const pageType: SearchPageType = isCityCoursePage ? "city-course" : "course";
  const enableCityFilter = !isCityCoursePage;
  
  const { 
    filteredTimings, 
    selectedMonth, 
    selectedCity,
    handleMonthChange, 
    handleCityChange,
    resetFilters 
  } = useTimingFilters({ timings, enableCityFilter });
  
  const { handleDownload, handleRegister, handleInquire } = usePopupHandlers();

  // Create search configuration based on page type
  const searchFields = createSearchFields(timings, pageType, cities || []);
  const customActions = createCustomActions(course.slug, pageType);

  // Handle search form submission
  const handleSearchSubmit = (data: Record<string, string>) => {
    const city = data.city || null;
    const month = data.month || null;
    
    handleMonthChange(month);
    
    if (enableCityFilter) {
      handleCityChange(city);
    }
  };

  // Handle search form reset
  const handleSearchReset = () => {
    resetFilters();
  };

  // Initial values for SearchBanner
  const searchInitialValues = {
    month: selectedMonth || "",
    ...(enableCityFilter && { city: selectedCity || "" }),
  };

  // if (citiesLoading) {
  //   return <LoadingSpinner/>;
  // }

  return (
    <div>
      <SearchSection
        fields={searchFields}
        actions={customActions}
        onSubmit={handleSearchSubmit}
        onReset={handleSearchReset}
        initialValues={searchInitialValues}
        resetBehavior="local"
      />

      <TimingGrid
        timings={filteredTimings}
        course={course}
        cities={cities || []}
        onDownload={handleDownload}
        onRegister={handleRegister}
        onInquire={handleInquire}
      />
    </div>
  );
}
