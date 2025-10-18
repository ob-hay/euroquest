
// Enhanced search result types
export interface SearchResultItem {
  id: number;
  type: "timing" | "course";
}

export interface TimingSearchResult extends SearchResultItem {
  type: "timing";
  data: SearchTiming;
}

export interface CourseSearchResult extends SearchResultItem {
  type: "course";
  data: SearchCourse;
}

export type UnifiedSearchResult = TimingSearchResult | CourseSearchResult;

// Search state types
export interface SearchState {
  results: UnifiedSearchResult[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  appliedFilters: SearchFilters;
  cacheStatus: "hit" | "miss" | null;
}

// Search action types
export interface SearchActions {
  retry: () => void;
  clearError: () => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
}

// Search hook return type
export interface UseSearchReturn {
  // State
  searchResults: SearchTiming[] | SearchCourse[];
  resultType: "timings" | "courses";
  loading: boolean;
  error: string | null;
  totalCount: number;
  appliedFilters: SearchFilters;
  searchBannerValues: Record<string, string>;
  cacheStatus: "hit" | "miss" | null;
  isRetrying: boolean;
  
  // Actions
  retry: () => void;
}

// Component prop types
export interface SearchResultsProps {
  results: SearchTiming[] | SearchCourse[];
  resultType: "timings" | "courses";
  onRegisterClick: (timing: SearchTiming) => void;
  onInquireClick: (timing: SearchTiming) => void;
  onDownloadClick: (timing: SearchTiming) => void;
}

export interface SearchHeroProps {
  totalCount: number;
  resultType: "timings" | "courses";
}

export interface SearchPopupsProps {
  selectedTiming: SearchTiming | null;
  isRegisterOpen: boolean;
  isInquireOpen: boolean;
  isDownloadOpen: boolean;
  onCloseRegister: () => void;
  onCloseInquire: () => void;
  onCloseDownload: () => void;
}

// Error types
export interface SearchError {
  message: string;
  code?: string;
  retryable: boolean;
}

export interface SearchErrorState {
  hasError: boolean;
  error?: SearchError;
}

// Loading types
export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

// Cache types
export interface CacheInfo {
  status: "hit" | "miss" | null;
  timestamp?: number;
  ttl?: number;
}

// Search performance types
export interface SearchPerformance {
  startTime: number;
  endTime: number;
  duration: number;
  cacheHit: boolean;
}

// Search analytics types
export interface SearchAnalytics {
  query: string;
  filters: SearchFilters;
  resultCount: number;
  performance: SearchPerformance;
  userAgent?: string;
  timestamp: number;
}
