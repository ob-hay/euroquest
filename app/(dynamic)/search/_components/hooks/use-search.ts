import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { searchTimings } from "@/services/services";

export interface UseSearchReturn {
  searchResults: SearchTiming[] | SearchCourse[];
  resultType: "timings" | "courses";
  loading: boolean;
  error: string | null;
  totalCount: number;
  appliedFilters: SearchFilters;
  searchBannerValues: Record<string, string>;
  cacheStatus: "hit" | "miss" | null;
  retry: () => void;
  isRetrying: boolean;
}

export function useSearch(): UseSearchReturn {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchTiming[] | SearchCourse[]>([]);
  const [resultType, setResultType] = useState<"timings" | "courses">("timings");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({});
  const [searchBannerValues, setSearchBannerValues] = useState<Record<string, string>>({});
  const [cacheStatus, setCacheStatus] = useState<"hit" | "miss" | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const performSearch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Extract search parameters from URL
      const filters: SearchFilters = {
        keyword: searchParams.get("keyword") || undefined,
        city_slug: searchParams.get("city_slug") || undefined,
        category_slug: searchParams.get("category_slug") || undefined,
        month: searchParams.get("month") || undefined,
        duration: searchParams.get("duration") || undefined,
      };

      setAppliedFilters(filters);

      // Convert filters to search banner values
      const bannerValues = convertFiltersToBannerValues(filters);
      setSearchBannerValues(bannerValues);

      // Perform search
      const startTime = performance.now();
      const response = await searchTimings(filters);
      const endTime = performance.now();

      setSearchResults(response.data);
      setTotalCount(response.count);
      setResultType(response.type as "timings" | "courses");
      
      // Set cache status based on response time (simplified)
      setCacheStatus(endTime - startTime < 100 ? "hit" : "miss");
    } catch (err) {
      console.error("Search error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while searching"
      );
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  }, [searchParams]);

  const retry = useCallback(() => {
    setIsRetrying(true);
    performSearch();
  }, [performSearch]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  return {
    searchResults,
    resultType,
    loading,
    error,
    totalCount,
    appliedFilters,
    searchBannerValues,
    cacheStatus,
    retry,
    isRetrying,
  };
}

function convertFiltersToBannerValues(filters: SearchFilters): Record<string, string> {
  const bannerValues: Record<string, string> = {};

  // Category and city slugs stay the same
  if (filters.category_slug) {
    bannerValues.category_slug = filters.category_slug;
  }

  if (filters.city_slug) {
    bannerValues.city_slug = filters.city_slug;
  }

  // Convert month from YYYY-MM to MM
  if (filters.month) {
    const monthValue = filters.month.split("-")[1]; // Extract MM from YYYY-MM
    bannerValues.month = monthValue;
  }

  // Duration stays the same
  if (filters.duration) {
    bannerValues.duration = filters.duration;
  }

  return bannerValues;
}
