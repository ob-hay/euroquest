import { Metadata } from "next";
import Schema from "@/components/shared/schema";
import SearchSection from "./_components/search-section";

// Generate dynamic metadata for search page with enhanced SEO
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    city_slug?: string;
    category_slug?: string;
    month?: string;
    duration?: string;
  }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const baseUrl = "https://euroqst.com";

  // Build dynamic title and description based on search params
  let title = "Search Training Courses | EuroQuest International";
  let description =
    "Search for professional training courses, categories, and cities at EuroQuest International. Find the perfect training program for your career development.";

  const searchTerms: string[] = [];

  if (params.keyword) {
    searchTerms.push(params.keyword);
  }
  if (params.city_slug) {
    searchTerms.push(params.city_slug.replace(/-/g, " "));
  }
  if (params.category_slug) {
    searchTerms.push(params.category_slug.replace(/-/g, " "));
  }

  if (searchTerms.length > 0) {
    const searchQuery = searchTerms.join(", ");
    title = `Search Results for "${searchQuery}" | EuroQuest International`;
    description = `Find professional training courses matching "${searchQuery}" at EuroQuest International. Explore expert-led programs designed to enhance your skills and career prospects.`;
  }

  const keywords = [
    "training courses search",
    "professional development",
    "course finder",
    "EuroQuest International",
    "skill development",
    "career training",
    ...searchTerms,
  ].join(", ");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "EuroQuest International" }],
    creator: "EuroQuest International",
    publisher: "EuroQuest International",
    // robots: {
    //   index: true,
    //   follow: true,
    //   googleBot: {
    //     index: true,
    //     follow: true,
    //     "max-video-preview": -1,
    //     "max-image-preview": "large",
    //     "max-snippet": -1,
    //   },
    // },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/search`,
      siteName: "EuroQuest International",
      title,
      description,
      images: [
        {
          url: `${baseUrl}/assets/images/hero-about.webp`,
          width: 1200,
          height: 630,
          alt: "EuroQuest International Training Courses",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@euroquest",
      creator: "@euroquest",
      title,
      description,
      images: [`${baseUrl}/assets/images/hero-about.webp`],
    },
    alternates: {
      canonical: `${baseUrl}/search`,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

interface SearchPageProps {
  searchParams: Promise<{
    keyword?: string;
    city_slug?: string;
    category_slug?: string;
    month?: string;
    duration?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const baseUrl = "https://euroqst.com";

  // Build search query for structured data
  const searchTerms: string[] = [];
  if (params.keyword) searchTerms.push(params.keyword);
  if (params.city_slug) searchTerms.push(params.city_slug.replace(/-/g, " "));
  if (params.category_slug)
    searchTerms.push(params.category_slug.replace(/-/g, " "));

  const searchQuery = searchTerms.length > 0 ? searchTerms.join(", ") : "all courses";

  // Generate JSON-LD structured data for search page
  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: "Training Course Search Results",
    description:
      "Search results for professional training courses at EuroQuest International",
    url: `${baseUrl}/search`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Search",
          item: `${baseUrl}/search`,
        },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?keyword={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "EuroQuest International",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/images/logo.png`,
      },
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD for Search Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }}
      />

      <Schema
        pageType="search"
        pageTitle="Search Training Courses | EuroQuest International"
        pageDescription="Search for professional training courses, categories, and cities at EuroQuest International. Find the perfect training program for your career development."
        pageUrl={`${baseUrl}/search`}
      />

      {/* Main content with semantic HTML */}
      <main>
        <SearchSection />
      </main>
    </>
  );
}
