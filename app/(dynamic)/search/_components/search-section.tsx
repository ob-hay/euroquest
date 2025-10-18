"use client";

import React from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import SmallLoadingSpinner from "@/components/ui/small-loading-spinner";
import SearchBanner from "@/components/shared/search-banner";
import SearchHero from "./search-hero";
import SearchResults from "./search-results";
import SearchSummary from "./search-summary";
import { useSearch } from "./hooks/use-search";

export default function SearchSection() {
  // Use custom hooks for search logic
  const {
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
  } = useSearch();

  // Handle error state with retry functionality
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <article className="text-center">
          <div className="text-red-500 text-6xl mb-6" aria-hidden="true">
            ⚠️
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Search Error
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={retry}
            disabled={isRetrying}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isRetrying ? "Retrying search" : "Try search again"}
          >
            {isRetrying ? "Retrying..." : "Try Again"}
          </button>
        </article>
      </div>
    );
  }

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <>
      {/* Hero Banner */}
      <SearchHero totalCount={totalCount} resultType={resultType} />

      {/* Search Banner */}
      <div className="container mx-auto -mt-9 relative z-10">
        <SearchBanner
          initialValues={searchBannerValues}
          searchRoute="/search"
          resetBehavior="navigate"
        />
      </div>

      <div className="container mx-auto pb-13">
        {/* Search Summary */}
        <SearchSummary
          totalCount={totalCount}
          resultType={resultType}
          appliedFilters={appliedFilters}
          cacheStatus={cacheStatus}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <SmallLoadingSpinner 
              size="lg" 
              text="Searching courses..." 
              className="flex-col gap-3"
            />
          </div>
        )}

        {/* Search Results */}
        {!loading && (
          <SearchResults results={searchResults} resultType={resultType} />
        )}
      </div>
    </>
  );
}

