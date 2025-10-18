"use client";
import { useState, useMemo } from "react";
import { CourseDetailResponse } from "@/services/services";
import { filterTimingsByMonth, filterTimingsByMonthAndCity, sortTimings } from "../utils/data-transformers";

interface UseTimingFiltersProps {
  timings: CourseDetailResponse["timings"];
  enableCityFilter?: boolean;
}

export const useTimingFilters = ({ timings, enableCityFilter = false }: UseTimingFiltersProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "price">("date");

  const filteredTimings = useMemo(() => {
    let filtered;
    
    if (enableCityFilter) {
      filtered = filterTimingsByMonthAndCity(timings, selectedMonth, selectedCity);
    } else {
      filtered = filterTimingsByMonth(timings, selectedMonth);
    }
    
    return sortTimings(filtered, sortBy);
  }, [timings, selectedMonth, selectedCity, sortBy, enableCityFilter]);

  const handleMonthChange = (month: string | null) => {
    setSelectedMonth(month);
  };

  const handleCityChange = (city: string | null) => {
    setSelectedCity(city);
  };

  const handleSortChange = (sort: "date" | "price") => {
    setSortBy(sort);
  };

  const resetFilters = () => {
    setSelectedMonth(null);
    setSelectedCity(null);
    setSortBy("date");
  };

  return {
    selectedMonth,
    selectedCity,
    sortBy,
    filteredTimings,
    handleMonthChange,
    handleCityChange,
    handleSortChange,
    resetFilters,
  };
};
