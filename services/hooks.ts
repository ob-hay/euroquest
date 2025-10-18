import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { 
  getCategories, 
  getCategoryBySlug, 
  searchCategories, 
  getCategoryDetails,
  getCities,
  getCityBySlug,
  searchCities,
  getCityDetails,
  getCourseDetails,
  getCityCourseDetails,
  getCityCategoryDetails,
  getUpcomingCourses,
  getBlogs,
  searchBlogs,
  getBlogBySlug,
  getSitemapData,
  CategoryDetailResponse,
  CityDetailResponse,
  CourseDetailResponse,
  CityCourseResponse,
  CityCategoryResponse,
} from './services';

// Query keys for React Query
export const QUERY_KEYS = {
  CATEGORIES: ['categories'] as const,
  CATEGORY: (slug: string) => ['category', slug] as const,
  CATEGORY_DETAILS: (slug: string) => ['category-details', slug] as const,
  SEARCH_CATEGORIES: (searchTerm: string) => ['categories', 'search', searchTerm] as const,
  CITIES: ['cities'] as const,
  CITY: (slug: string) => ['city', slug] as const,
  CITY_DETAILS: (slug: string) => ['city-details', slug] as const,
  SEARCH_CITIES: (searchTerm: string) => ['cities', 'search', searchTerm] as const,
  COURSE_DETAILS: (slug: string) => ['course-details', slug] as const,
  UPCOMING_COURSES: ['upcoming-courses'] as const,
  BLOGS: (filters?: BlogSearchFilters) => ['blogs', filters] as const,
  BLOG: (slug: string) => ['blog', slug] as const,
  SITEMAP: ['sitemap'] as const,
} as const;

// Hook to fetch all categories
export const useCategories = (): UseQueryResult<Category[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to fetch a single category by slug
export const useCategory = (slug: string): UseQueryResult<Category | null, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORY(slug),
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

// Hook to search categories
export const useSearchCategories = (
  searchTerm: string, 
  enabled: boolean = true
): UseQueryResult<Category[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_CATEGORIES(searchTerm),
    queryFn: () => searchCategories(searchTerm),
    enabled: enabled && searchTerm.length > 0, // Only search if term is provided and enabled
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for search results)
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook for categories with additional options
export const useCategoriesWithOptions = (options?: {
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchOnMount: options?.refetchOnMount ?? true,
  });
};

// Hook to fetch category details with courses
export const useCategoryDetails = (slug: string): UseQueryResult<CategoryDetailResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORY_DETAILS(slug),
    queryFn: () => getCategoryDetails(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to fetch all cities
export const useCities = (): UseQueryResult<City[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CITIES,
    queryFn: getCities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to fetch a single city by slug
export const useCity = (slug: string): UseQueryResult<City | null, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CITY(slug),
    queryFn: () => getCityBySlug(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

// Hook to search cities
export const useSearchCities = (
  searchTerm: string, 
  enabled: boolean = true
): UseQueryResult<City[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_CITIES(searchTerm),
    queryFn: () => searchCities(searchTerm),
    enabled: enabled && searchTerm.length > 0, // Only search if term is provided and enabled
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for search results)
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook for cities with additional options
export const useCitiesWithOptions = (options?: {
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.CITIES,
    queryFn: getCities,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchOnMount: options?.refetchOnMount ?? true,
  });
};

// Hook to fetch city details with courses
export const useCityDetails = (slug: string): UseQueryResult<CityDetailResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CITY_DETAILS(slug),
    queryFn: () => getCityDetails(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to fetch course details with timings
export const useCourseDetails = (slug: string): UseQueryResult<CourseDetailResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.COURSE_DETAILS(slug),
    queryFn: () => getCourseDetails(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCityCourseDetails = (courseSlug: string, citySlug: string): UseQueryResult<CityCourseResponse, Error> => {
  return useQuery({
    queryKey: ['city-course-details', courseSlug, citySlug],
    queryFn: () => getCityCourseDetails(courseSlug, citySlug),
    enabled: !!courseSlug && !!citySlug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCityCategoryDetails = (citySlug: string, categorySlug: string): UseQueryResult<CityCategoryResponse, Error> => {
  return useQuery({
    queryKey: ['city-category-details', citySlug, categorySlug],
    queryFn: () => getCityCategoryDetails(citySlug, categorySlug),
    enabled: !!citySlug && !!categorySlug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to fetch upcoming courses
export const useUpcomingCourses = (): UseQueryResult<UpcomingCourse[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.UPCOMING_COURSES,
    queryFn: getUpcomingCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to fetch all blogs
export const useBlogs = (filters?: BlogSearchFilters): UseQueryResult<BlogsApiResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.BLOGS(filters),
    queryFn: () => getBlogs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to search blogs
export const useSearchBlogs = (
  filters: BlogSearchFilters,
  enabled: boolean = true
): UseQueryResult<BlogsApiResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.BLOGS(filters),
    queryFn: () => searchBlogs(filters),
    enabled: enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for search results)
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to fetch a single blog by slug
export const useBlog = (slug: string): UseQueryResult<Blog | null, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.BLOG(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

// Hook to fetch sitemap data
export const useSitemap = (): UseQueryResult<SitemapApiResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.SITEMAP,
    queryFn: getSitemapData,
    staleTime: 10 * 60 * 1000, // 10 minutes (sitemap data changes less frequently)
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};