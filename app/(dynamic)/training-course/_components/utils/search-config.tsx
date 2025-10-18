import { FieldConfig } from "@/components/shared/search-banner";
import { getUniqueMonths, getUniqueCities } from "./data-transformers";
import { CourseDetailResponse } from "@/services/services";
import { RotateCcw } from "lucide-react";

export type SearchPageType = "course" | "city-course";

/**
 * Create search fields configuration for SearchBanner based on page type
 */
export const createSearchFields = (
  timings: CourseDetailResponse["timings"], 
  pageType: SearchPageType,
  cities: City[] = []
): FieldConfig[] => {
  const uniqueMonths = getUniqueMonths(timings);
  const uniqueCities = getUniqueCities(timings, cities);
  
  if (pageType === "city-course") {
    // For city course page: only month select
    return [
      {
        name: "month",
        type: "select",
        placeholder: "Select Month",
        options: uniqueMonths.map((month) => ({
          id: month.id,
          title: month.title,
          value: month.value,
        })),
        required: false,
      },
    ];
  } else {
    // For main course page: month and city selects
    return [
      {
        name: "month",
        type: "select",
        placeholder: "Select Month",
        options: uniqueMonths.map((month) => ({
          id: month.id,
          title: month.title,
          value: month.value,
        })),
        required: false,
      },
      {
        name: "city",
        type: "select",
        placeholder: "Select City",
        options: uniqueCities.map((city) => ({
          id: city!.id.toString(),
          title: city!.title,
          value: city!.id.toString(),
        })),
        required: false,
      },
    ];
  }
};

/**
 * Create custom actions for SearchBanner based on page type
 */
export const createCustomActions = (courseSlug: string, pageType: SearchPageType) => {
  if (pageType === "city-course") {
    // For city course page: back button
    return [
      {
        type: 'button' as const,
        label: 'Back to Course Page',
        href: `/training-course/${courseSlug}`,
        variant: 'secondary' as const,
        className: 'bg-[#3E5EC0] hover:bg-[#3E5EC0] text-white cursor-pointer'
      }
    ];
  } else {
    // For main course page: clear button
    return [
      {
        type: 'reset' as const,
        label: 'Clear',
        icon: <RotateCcw size={16} />,
        variant: 'secondary' as const,
        className: 'bg-white border border-[#3E5EC0] text-[#3E5EC0] cursor-pointer'
      }
    ];
  }
};
