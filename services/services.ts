import cacheService, { CACHE_CONFIG } from "@/lib/cache";
import { API_ENDPOINTS } from "@/constants";
import apiClient from "@/lib/api-client";

// Category detail API response
export interface CategoryDetailResponse {
  status: string;
  category: CategoryDetail;
  count: number;
  courses: Course[];
}

// Generic API response wrapper
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: number;
  success?: boolean;
}

// Service to fetch all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Check cache first
    const cached = cacheService.get<Category[]>(API_ENDPOINTS.CATEGORIES);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(API_ENDPOINTS.CATEGORIES, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch categories");
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Service to fetch a single category by slug
export const getCategoryBySlug = async (
  slug: string
): Promise<Category | null> => {
  try {
    const categories = await getCategories();
    const category = categories.find((cat) => cat.slug === slug);
    return category || null;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    throw error;
  }
};

// Service to search categories by title
export const searchCategories = async (
  searchTerm: string
): Promise<Category[]> => {
  try {
    const categories = await getCategories();
    return categories.filter((category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching categories:", error);
    throw error;
  }
};

// Service to fetch category details with courses
export const getCategoryDetails = async (
  slug: string
): Promise<CategoryDetailResponse> => {
  try {
    const endpoint = `${API_ENDPOINTS.CATEGORIES}/${slug}`;

    // Check cache first
    const cached = cacheService.get<CategoryDetailResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CategoryDetailResponse>(endpoint);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch category details");
  } catch (error) {
    console.error(`Error fetching category details for ${slug}:`, error);
    throw error;
  }
};

// City detail API response with courses
export interface CityDetailResponse {
  status: string;
  city: CityDetail;
  courses: Course[];
  categories: Category[];
}

// Service to fetch all cities
export const getCities = async (): Promise<City[]> => {
  try {
    // Check cache first
    const cached = cacheService.get<City[]>(API_ENDPOINTS.CITIES);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<City[]>(API_ENDPOINTS.CITIES);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(API_ENDPOINTS.CITIES, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch cities");
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

// Service to fetch a single city by slug
export const getCityBySlug = async (slug: string): Promise<City | null> => {
  try {
    const cities = await getCities();
    const city = cities.find((city) => city.slug === slug);
    return city || null;
  } catch (error) {
    console.error(`Error fetching city with slug ${slug}:`, error);
    throw error;
  }
};

// Service to search cities by title
export const searchCities = async (searchTerm: string): Promise<City[]> => {
  try {
    const cities = await getCities();
    return cities.filter((city) =>
      city.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching cities:", error);
    throw error;
  }
};

// Service to fetch city details with courses
export const getCityDetails = async (
  slug: string
): Promise<CityDetailResponse> => {
  try {
    const endpoint = `${API_ENDPOINTS.CITIES}/${slug}`;

    // Check cache first
    const cached = cacheService.get<CityDetailResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CityDetailResponse>(endpoint);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch city details");
  } catch (error) {
    console.error(`Error fetching city details for ${slug}:`, error);
    throw error;
  }
};

// Course detail API response
export interface CourseDetailResponse {
  status: string;
  course: CourseDetail;
  timings: {
    id: number;
    start_date: string;
    end_date: string;
    fees: string;
    duration: number;
    city_id: number;
  }[];
}

// Service to fetch course details
export const getCourseDetails = async (
  slug: string
): Promise<CourseDetailResponse> => {
  try {
    const endpoint = `/training-course/${slug}`;

    // Check cache first
    const cached = cacheService.get<CourseDetailResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CourseDetailResponse>(endpoint);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch course details");
  } catch (error) {
    console.error(`Error fetching course details for ${slug}:`, error);
    throw error;
  }
};

// City-Course API Response Interface
export interface CityCourseResponse {
  status: string;
  course: CourseDetail;
  city: {
    id: number;
    title: string;
    slug: string;
  };
  timings: {
    id: number;
    start_date: string;
    end_date: string;
    fees: string;
    duration: number;
    city_id: number;
  }[];
  seo: {
    id: number;
    course_id: number;
    city_id: number;
    h1: string;
    description: string;
    additional_description: string;
    canonical: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string | null;
    meta_image?: string;
    created_at: string;
    updated_at: string;
  };
}

// City-Category API Response Interface
export interface CityCategoryResponse {
  status: string;
  city: {
    id: number;
    title: string;
    slug: string;
  };
  category: {
    id: number;
    title: string;
    slug: string;
  };
  courses: {
    id: number;
    title: string;
    slug: string;
    code: string;
    duration_label: string | null;
  }[];
  seo: {
    id: number;
    category_id: number;
    city_id: number;
    h1: string;
    description: string;
    additional_description: string;
    canonical: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string | null;
    meta_image?: string;
    created_at: string;
    updated_at: string;
  };
}

export const getCityCourseDetails = async (
  courseSlug: string,
  citySlug: string
): Promise<CityCourseResponse> => {
  try {
    const endpoint = `/training-course/${courseSlug}/${citySlug}`;

    // Check cache first
    const cached = cacheService.get<CityCourseResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CityCourseResponse>(endpoint);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch city course details");
  } catch (error) {
    console.error(
      `Error fetching city course details for ${courseSlug}/${citySlug}:`,
      error
    );
    throw error;
  }
};

export const getCityCategoryDetails = async (
  citySlug: string,
  categorySlug: string
): Promise<CityCategoryResponse> => {
  try {
    const endpoint = `/training-courses/${citySlug}/${categorySlug}`;

    // Check cache first
    const cached = cacheService.get<CityCategoryResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CityCategoryResponse>(endpoint);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error(
      response.message || "Failed to fetch city category details"
    );
  } catch (error) {
    console.error(
      `Error fetching city category details for ${citySlug}/${categorySlug}:`,
      error
    );
    throw error;
  }
};


export interface SearchResponse {
  status: string;
  type: string;
  count: number;
  filters: SearchFilters;
  data: SearchTiming[] | SearchCourse[];
}

// Search service
export const searchTimings = async (
  filters: SearchFilters
): Promise<SearchResponse> => {
  try {
    const params: Record<string, string> = {};

    // Convert filters to API parameters
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.city_slug) params.city_slug = filters.city_slug;
    if (filters.category_slug) params.category_slug = filters.category_slug;
    if (filters.month) params.month = filters.month;
    if (filters.duration) params.duration = filters.duration;

    const endpoint = "/search-home";

    // Create cache key with all parameters
    const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
    
    // Check cache first
    const cached = cacheService.get<SearchResponse>(cacheKey);
    if (cached) {
      console.log('Cache hit for search:', cacheKey);
      return cached;
    }

    console.log('Cache miss for search:', cacheKey);
    const response = await apiClient.get<SearchResponse>(endpoint, { params });

    if (response.success && response.data) {
      // Cache the result with shorter TTL for search results
      cacheService.set(cacheKey, response.data, undefined, CACHE_CONFIG.SEARCH_TTL);
      return response.data;
    }

    throw new Error(response.message || "Failed to search timings");
  } catch (error) {
    console.error("Error searching timings:", error);
    throw error;
  }
};

// Service to fetch upcoming courses
export const getUpcomingCourses = async (): Promise<UpcomingCourse[]> => {
  try {
    // Check cache first
    const cached = cacheService.get<UpcomingCourse[]>(
      API_ENDPOINTS.UPCOMING_COURSES
    );
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<UpcomingCourse[]>(
      API_ENDPOINTS.UPCOMING_COURSES
    );

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(API_ENDPOINTS.UPCOMING_COURSES, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch upcoming courses");
  } catch (error) {
    console.error("Error fetching upcoming courses:", error);
    throw error;
  }
};

// Cache management functions
export const cacheManagement = {
  // Clear all cache
  clearAll: () => {
    cacheService.clear();
  },

  // Clear cache for specific endpoints
  clearEndpoints: (endpoints: string[]) => {
    cacheService.invalidateEndpoints(endpoints);
  },

  // Clear categories cache
  clearCategoriesCache: () => {
    cacheService.invalidateEndpoints([API_ENDPOINTS.CATEGORIES]);
  },

  // Clear cities cache
  clearCitiesCache: () => {
    cacheService.invalidateEndpoints([API_ENDPOINTS.CITIES]);
  },

  // Clear courses cache
  clearCoursesCache: () => {
    cacheService.clearByPattern("^/training-course");
  },

  // Clear upcoming courses cache
  clearUpcomingCoursesCache: () => {
    cacheService.delete(API_ENDPOINTS.UPCOMING_COURSES);
  },

  // Clear search cache
  clearSearchCache: () => {
    cacheService.delete("/search-home");
  },

  // Get cache statistics
  getStats: () => {
    return cacheService.getStats();
  },

  // Preload critical data
  preloadCriticalData: async () => {
    try {
      await Promise.all([
        cacheService.preload(API_ENDPOINTS.CATEGORIES, getCategories),
        cacheService.preload(API_ENDPOINTS.CITIES, getCities),
        cacheService.preload(
          API_ENDPOINTS.UPCOMING_COURSES,
          getUpcomingCourses
        ),
        cacheService.preload(API_ENDPOINTS.BLOGS, () => getBlogs()),
      ]);
      console.log("Critical data preloaded successfully");
    } catch (error) {
      console.error("Error preloading critical data:", error);
    }
  },
};

// Blog service functions
export const getBlogs = async (filters?: BlogSearchFilters): Promise<BlogsApiResponse> => {
  try {
    const params: Record<string, string> = {};
    
    // Add search parameters
    if (filters?.keyword) params.keyword = filters.keyword;
    if (filters?.tag) params.tag = filters.tag;
    if (filters?.page) params.page = filters.page.toString();

    // Create cache key with parameters
    const cacheKey = `${API_ENDPOINTS.BLOGS}_${JSON.stringify(params)}`;
    
    // Check cache first
    const cached = cacheService.get<BlogsApiResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<BlogsApiResponse>(API_ENDPOINTS.BLOGS, { params });

    if (response.success && response.data) {
      // Cache the result with shorter TTL for search results
      cacheService.set(cacheKey, response.data, undefined, CACHE_CONFIG.SEARCH_TTL);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch blogs");
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Search blogs using GET method with search parameters in query string
export const searchBlogs = async (filters: BlogSearchFilters): Promise<BlogsApiResponse> => {
  try {
    // Create query parameters with search key and value
    const params: Record<string, string> = {};
    
    if (filters.keyword) {
      params.search = filters.keyword;
    }
    if (filters.tag) {
      params.tag = filters.tag;
    }
    if (filters.page) {
      params.page = filters.page.toString();
    }

    // Create cache key with search parameters
    const cacheKey = `${API_ENDPOINTS.BLOGS}_search_${JSON.stringify(params)}`;
    
    // Check cache first
    const cached = cacheService.get<BlogsApiResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Use GET method with search parameters in query string
    const response = await apiClient.get<BlogsApiResponse>(API_ENDPOINTS.BLOGS, { params });

    if (response.success && response.data) {
      // Cache the result with shorter TTL for search results
      cacheService.set(cacheKey, response.data, undefined, CACHE_CONFIG.SEARCH_TTL);
      return response.data;
    }

    throw new Error(response.message || "Failed to search blogs");
  } catch (error) {
    console.error("Error searching blogs:", error);
    throw error;
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const endpoint = `${API_ENDPOINTS.BLOGS}/${slug}`;

    // Check cache first
    const cached = cacheService.get<Blog>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<SingleBlogApiResponse>(endpoint);

    if (response.success && response.data && response.data.blog) {
      // Cache the result
      cacheService.set(endpoint, response.data.blog);
      return response.data.blog;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw error;
  }
};

// Sitemap service function
export const getSitemapData = async (): Promise<SitemapApiResponse> => {
  try {
    // Check cache first
    const cached = cacheService.get<SitemapApiResponse>(API_ENDPOINTS.SITEMAP);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<SitemapApiResponse>(API_ENDPOINTS.SITEMAP);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(API_ENDPOINTS.SITEMAP, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch sitemap data");
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    throw error;
  }
};

// SEO API Response Interface
export interface SeoApiResponse {
  status: string;
  seo: {
    id: number;
    section: string;
    canonical: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    meta_image: string;
    created_at: string;
    updated_at: string;
  };
}

// SEO service function
export const getSeoData = async (section: string = 'home'): Promise<SeoApiResponse> => {
  try {
    const endpoint = `/seo/${section}`;
    
    // Check cache first
    const cached = cacheService.get<SeoApiResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<SeoApiResponse>(endpoint);

    if (response.success && response.data) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch SEO data");
  } catch (error) {
    console.error(`Error fetching SEO data for ${section}:`, error);
    throw error;
  }
};
