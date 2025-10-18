interface SearchSummaryProps {
  totalCount: number;
  resultType: "timings" | "courses";
  appliedFilters: SearchFilters;
  cacheStatus: "hit" | "miss" | null;
  loading?: boolean;
  performance?: {
    duration: number;
    fromCache: boolean;
  };
}

export default function SearchSummary({ appliedFilters }: SearchSummaryProps) {
  const hasFilters = Object.values(appliedFilters).some((value) => value);

  return (
    <>
      {hasFilters && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Applied Filters:
          </h3>
          <div className="flex flex-wrap gap-2">
            {appliedFilters.keyword && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Keyword: {appliedFilters.keyword}
              </span>
            )}
            {appliedFilters.city_slug && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                City: {appliedFilters.city_slug}
              </span>
            )}
            {appliedFilters.category_slug && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                Category: {appliedFilters.category_slug}
              </span>
            )}
            {appliedFilters.month && (
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                Month: {appliedFilters.month}
              </span>
            )}
            {appliedFilters.duration && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                Duration:{" "}
                {Number(appliedFilters.duration) === 10 ? "2 Weeks" : "1 Week"}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
