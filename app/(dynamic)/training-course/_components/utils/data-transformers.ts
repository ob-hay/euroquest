import { CourseDetailResponse } from "@/services/services";
import { MONTH_NAMES, MONTH_NAMES_LOWERCASE, DATE_FORMAT_OPTIONS } from "./constants";

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
};

/**
 * Get city name by ID from cities array
 */
export const getCityName = (cityId: number, cities: City[]): string => {
  if (cities && cities.length > 0) {
    const city = cities.find((c) => c.id === cityId);
    return city?.title || `City ${cityId}`;
  }
  return `City ${cityId}`;
};

/**
 * Convert CourseDetailResponse timing to Timing type
 */
export const convertToTimingType = (
  timing: CourseDetailResponse["timings"][0],
  cities: City[]
): Timing => {
  const cityName = getCityName(timing.city_id, cities);
  return {
    id: timing.id,
    start_date: timing.start_date,
    end_date: timing.end_date,
    fees: parseFloat(timing.fees),
    city: {
      id: timing.city_id,
      title: cityName,
      slug: cityName.toLowerCase().replace(/\s+/g, "-"),
      image: "",
    },
  };
};

/**
 * Convert CourseDetail to Course type
 */
export const convertToCourseType = (courseDetail: CourseDetail): Course => {
  return {
    id: courseDetail.id,
    slug: courseDetail.slug,
    title: courseDetail.title,
    code: courseDetail.code,
    h1: courseDetail.h1,
    description: courseDetail.description,
    content: courseDetail.content,
    meta_title: courseDetail.meta_title,
    meta_description: courseDetail.meta_description,
    canonical: courseDetail.canonical,
    category: courseDetail.category
      ? {
          ...courseDetail.category,
          courses_count: 0,
          icon: "",
          additional_description: "",
        }
      : undefined,
  };
};

/**
 * Get unique months from timings data
 */
export const getUniqueMonths = (timings: CourseDetailResponse["timings"]) => {
  const monthsSet = new Set<string>();

  timings.forEach((timing) => {
    const startDate = new Date(timing.start_date);
    const endDate = new Date(timing.end_date);

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const monthName = MONTH_NAMES[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      monthsSet.add(`${monthName} - ${year}`);

      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  });

  return Array.from(monthsSet)
    .sort((a, b) => {
      // Extract year and month from strings like "January - 2024"
      const [monthA, yearA] = a.split(" - ");
      const [monthB, yearB] = b.split(" - ");
      
      const yearNumA = parseInt(yearA);
      const yearNumB = parseInt(yearB);
      
      // First sort by year
      if (yearNumA !== yearNumB) {
        return yearNumA - yearNumB;
      }
      
      // Then sort by month within the same year
      const monthIndexA = MONTH_NAMES.indexOf(monthA as any);
      const monthIndexB = MONTH_NAMES.indexOf(monthB as any);
      
      return monthIndexA - monthIndexB;
    })
    .map((month) => ({
      id: month.toLowerCase().split(" - ")[0],
      title: month,
      value: month.toLowerCase().split(" - ")[0],
    }));
};

/**
 * Get unique cities from timings data
 */
export const getUniqueCities = (timings: CourseDetailResponse["timings"], cities: City[]) => {
  const cityIdsSet = new Set<number>();
  
  timings.forEach((timing) => {
    cityIdsSet.add(timing.city_id);
  });

  return Array.from(cityIdsSet)
    .map(cityId => cities.find(city => city.id === cityId))
    .filter((city): city is City => city !== undefined)
    .sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Filter timings by month
 */
export const filterTimingsByMonth = (
  timings: CourseDetailResponse["timings"],
  selectedMonth: string | null
): CourseDetailResponse["timings"] => {
  if (!selectedMonth) return timings;

  return timings.filter((timing) => {
    const startDate = new Date(timing.start_date);
    const endDate = new Date(timing.end_date);
    const selectedMonthIndex = MONTH_NAMES_LOWERCASE.indexOf(selectedMonth.toLowerCase() as any);

    if (selectedMonthIndex === -1) return true;

    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    let monthInRange = false;
    if (startDate.getFullYear() === endDate.getFullYear()) {
      monthInRange = selectedMonthIndex >= startMonth && selectedMonthIndex <= endMonth;
    } else {
      monthInRange = selectedMonthIndex >= startMonth || selectedMonthIndex <= endMonth;
    }

    return monthInRange;
  });
};

/**
 * Filter timings by city
 */
export const filterTimingsByCity = (
  timings: CourseDetailResponse["timings"],
  selectedCityId: string | null
): CourseDetailResponse["timings"] => {
  if (!selectedCityId) return timings;

  const cityId = parseInt(selectedCityId);
  return timings.filter((timing) => timing.city_id === cityId);
};

/**
 * Filter timings by month and city
 */
export const filterTimingsByMonthAndCity = (
  timings: CourseDetailResponse["timings"],
  selectedMonth: string | null,
  selectedCityId: string | null
): CourseDetailResponse["timings"] => {
  let filtered = timings;
  
  if (selectedMonth) {
    filtered = filterTimingsByMonth(filtered, selectedMonth);
  }
  
  if (selectedCityId) {
    filtered = filterTimingsByCity(filtered, selectedCityId);
  }
  
  return filtered;
};

/**
 * Sort timings by date or price
 */
export const sortTimings = (
  timings: CourseDetailResponse["timings"],
  sortBy: "date" | "price"
): CourseDetailResponse["timings"] => {
  return [...timings].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      case "price":
        return parseFloat(a.fees) - parseFloat(b.fees);
      default:
        return 0;
    }
  });
};
