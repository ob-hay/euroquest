declare interface Category {
  id: number;
  title: string;
  slug: string;
  image?: string;
  icon: string;
  courses_count: number;
  additional_description: string;
}

declare interface City {
  id: number;
  slug: string;
  title: string;
  image: string;
  courses_count?: number;
  h1?: string;
  description?: string;
  additional_description?: string;
}

declare interface CityDetail {
  id: number;
  title: string;
  description: string;
  additional_description: string;
  slug: string;
  h1: string;
  image: string;
  image_title: string;
  image_alt: string;
  canonical: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image?: string;
  created_at: string;
  updated_at: string;
}

declare interface Timing {
  id: number;
  start_date: string;
  end_date: string;
  fees: number;
  city: City;
}

declare interface UpcomingCourse {
  timing_id: number;
  start_date: string;
  end_date: string;
  city_title: string;
  city_slug: string;
  course_title: string;
  course_slug: string;
  course_image: string;
  course_image_alt: string;
  course_image_title: string;
}

// Course timing interface
declare interface CourseTiming {
  id: number;
  fees: string;
  start_date: string;
  end_date: string;
  duration: number;
  course_id: number;
  city_id: number;
  created_at: string;
  updated_at: string;
  city: {
    id: number;
    title: string;
    slug: string;
  };
}
declare interface Course {
  id: number;
  slug: string;
  title: string;
  code: string;
  duration?: string | null;
  h1?: string;
  description?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  canonical?: string;
  category?: Category;
  timings?: Timing[];
}

declare interface CourseDetail {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  h1: string;
  image: string;
  image_title: string;
  image_alt: string;
  code: string;
  keywords: string | null;
  category_id: number;
  canonical: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image?: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    title: string;
    slug: string;
  };
  timings: CourseTiming[];
}

declare interface CategoryDetail {
  id: number;
  title: string;
  description: string;
  additional_description: string;
  slug: string;
  h1: string;
  image: string;
  icon: string;
  image_title: string;
  image_alt: string;
  canonical: string;
  meta_title: string;
  meta_description: string;
  meta_image?: string;
  created_at: string;
  updated_at: string;
}

declare interface Blog {
  id: number;
  title: string;
  content: string | null;
  description: string;
  slug: string;
  h1: string;
  image: string;
  image_alt: string;
  image_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  meta_image?: string;
  canonical: string | null;
  number_of_views: number;
  tag_name: string | null;
  created_at: string;
  updated_at: string;
}

declare interface BlogSection {
  tagName: string;
  blogs: Blog[];
}

declare interface BlogsApiResponse {
  status: string;
  blogs: {
    current_page: number;
    data: Blog[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

declare interface BlogSearchFilters {
  keyword?: string;
  tag?: string;
  page?: number;
}

declare interface SingleBlogApiResponse {
  status: string;
  blog: Blog;
}
// Search interfaces
declare interface SearchTiming {
  id: number;
  start_date: string;
  end_date: string;
  fees: string;
  duration: number;
  course_title: string;
  course_slug: string;
  category_id: number;
  category_title: string;
  city_title: string;
}

declare interface SearchCourse {
  id: number;
  title: string;
  slug: string;
  code: string;
  duration_label: string | null;
  category: any;
}

declare interface SearchFilters {
  keyword?: string;
  city_slug?: string;
  category_slug?: string;
  month?: string;
  duration?: string;
}
// Contact Form Data Interface
declare interface ContactFormData {
  full_name: string;
  phone_number: string;
  email: string;
  country: string;
  company: string;
  subject: string;
  message: string;
  recaptcha_token?: string;
}

// Register Form Data Interface
declare interface RegisterFormData {
  full_name: string;
  mobile: string;
  email: string;
  job_title: string;
  company_name: string;
  country: string;
  city: string;
  responsible_name: string;
  responsible_mobile: string;
  responsible_email: string;
  responsible_position: string;
  timing_id: number;
  recaptcha_token?: string;
}

// Inquire Form Data Interface
declare interface InquireFormData {
  full_name: string;
  mobile: string;
  email: string;
  timing_id: number;
  company: string;
  country: string;
  city: string;
  message: string;
  recaptcha_token?: string;
}

// Download Form Data Interface
declare interface DownloadFormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  timing_id: number;
  recaptcha_token?: string;
}

// Join Form Data Interface
declare interface JoinFormData {
  full_name: string;
  phone_number: string;
  email: string;
  cv: File;
  country: string;
  category_id: number;
  speciality?: string;
  message?: string;
  recaptcha_token?: string;
}

// Sitemap API Response Interfaces
declare interface SitemapApiResponse {
  categories: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
  cities: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
  city_category_seos: {
    [categoryId: string]: Array<{
      city: {
        id: number;
        slug: string;
        title: string;
      };
      category: {
        id: number;
        slug: string;
        title: string;
      };
    }>;
  };
  city_course_seos: {
    [courseId: string]: Array<{
      city: {
        id: number;
        slug: string;
        title: string;
      };
      course: {
        id: number;
        slug: string;
        title: string;
      };
      updated_at: string;
    }>;
  };
}