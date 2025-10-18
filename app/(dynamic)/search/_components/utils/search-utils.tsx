import { Home } from "lucide-react";

/**
 * Converts search filters to banner values for the search form
 */
export function convertFiltersToBannerValues(filters: SearchFilters): Record<string, string> {
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

/**
 * Formats a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}


export function generateSearchBreadcrumbs() {
  return [
    { label: "", href: "/", icon: <Home size={16} />, },
    { label: "Search Results", href: "#" },
  ];
}

/**
 * Generates hero banner description based on search results
 */
export function generateHeroDescription(totalCount: number, resultType: "timings" | "courses"): string {
  const itemType = resultType === "timings" ? "training timing" : "training course";
  const pluralSuffix = totalCount !== 1 ? "s" : "";
  return `Found ${totalCount} ${itemType}${pluralSuffix}`;
}

/**
 * Checks if search results are empty
 */
export function hasSearchResults(results: any[]): boolean {
  return results && results.length > 0;
}

/**
 * Determines if results are timing-based
 */
export function isTimingResults(resultType: "timings" | "courses"): boolean {
  return resultType === "timings";
}
