import { Metadata } from "next";
import { getCityCategoryDetails } from "@/services/services";
import Schema from "@/components/shared/schema";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Container from "@/components/shared/container";
import AdditionalDescription from "@/components/shared/additional-description";
import CityCategorySection from "../../_components/city-category-section";

// Generate metadata dynamically with enhanced SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string }>;
}): Promise<Metadata> {
  try {
    const { citySlug, categorySlug } = await params;
    const categoryData = await getCityCategoryDetails(citySlug, categorySlug);
    const { city, category, seo } = categoryData;
    const baseUrl = "https://euroqst.com";

    return {
      title: seo.meta_title || `${category.title} Training Courses in ${city.title} | EuroQuest International`,
      description: seo.meta_description || `Professional ${category.title} training courses in ${city.title} by EuroQuest International. Enhance your skills with our expert-led programs.`,
      keywords: seo.meta_keywords || `${category.title}, ${city.title}, training courses, professional training, EuroQuest International, skill development, ${city.title.toLowerCase()} ${category.title.toLowerCase()}`,
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
        url: seo.canonical || `${baseUrl}/training-cities/${citySlug}/${categorySlug}`,
        siteName: "EuroQuest International",
        title: seo.meta_title || `${category.title} Training Courses in ${city.title}`,
        description: seo.meta_description || `Professional ${category.title} training courses in ${city.title}`,
        images: [
          {
            url: seo.meta_image || "/assets/images/hero-course.webp",
            width: 1200,
            height: 630,
            alt: `${category.title} training courses in ${city.title}`,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@euroquest",
        creator: "@euroquest",
        title: seo.meta_title || `${category.title} Training Courses in ${city.title}`,
        description: seo.meta_description || `Professional ${category.title} training courses in ${city.title}`,
        images: [seo.meta_image || "/assets/images/hero-course.webp"],
      },
      alternates: {
        canonical: seo.canonical || `${baseUrl}/training-cities/${citySlug}/${categorySlug}`,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for city category page:", error);
    const baseUrl = "https://euroqst.com";
    
    // SEO-optimized fallback metadata
    return {
      title: "Training Courses | EuroQuest International Professional Development",
      description: "Professional training courses by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords: "professional training, courses, EuroQuest International, skill development, career advancement",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      // robots: {
      //   index: true,
      //   follow: true,
      // },
      alternates: {
        canonical: `${baseUrl}/training-cities`,
      },
    };
  }
}

interface CityCategoryPageProps {
  params: Promise<{ citySlug: string; categorySlug: string }>;
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function Page({
  params,
  searchParams,
}: CityCategoryPageProps) {
  const { citySlug, categorySlug } = await params;
  const searchParamsData = await searchParams;
  const categoryData = await getCityCategoryDetails(citySlug, categorySlug);
  const { city, category, courses, seo } = categoryData;
  const baseUrl = "https://euroqst.com";

  // Breadcrumb configuration
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "",
      icon: <Home size={14} />,
    },
    {
      href: "/training-cities",
      label: "Cities",
    },
    {
      href: `/training-cities/${city.slug}`,
      label: city.title,
    },
    {
      href: `/training-cities/${city.slug}/${category.slug}`,
      label: category.title,
    },
  ];

  // Generate JSON-LD structured data for city-category page
  const cityCategorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} Training Courses in ${city.title}`,
    description:
      seo.description ||
      `Professional ${category.title} training courses in ${city.title}`,
    url: `${baseUrl}/training-cities/${citySlug}/${categorySlug}`,
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
          name: "Training Cities",
          item: `${baseUrl}/training-cities`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: city.title,
          item: `${baseUrl}/training-cities/${citySlug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: category.title,
          item: `${baseUrl}/training-cities/${citySlug}/${categorySlug}`,
        },
      ],
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
    hasPart: courses.map((course: Course) => ({
      "@type": "Course",
      name: course.title,
      description: course.description,
      provider: {
        "@type": "Organization",
        name: "EuroQuest International",
      },
      url: `${baseUrl}/training-course/${course.slug}`,
      courseCode: course.code,
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD for City-Category Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityCategorySchema) }}
      />

      <Schema
        pageType="cities"
        pageTitle={
          seo.meta_title ||
          `${category.title} Training Courses in ${city.title} | EuroQuest International`
        }
        pageDescription={
          seo.meta_description ||
          `Professional ${category.title} training courses in ${city.title} by EuroQuest International. Enhance your skills with our expert-led programs.`
        }
        pageUrl={
          seo.canonical || `${baseUrl}/training-cities/${citySlug}/${categorySlug}`
        }
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-course.webp"
          title={seo.h1 || `${category.title} in ${city.title}`}
          description={
            seo.description ||
            `Explore ${category.title} training courses in ${city.title}`
          }
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
      </header>

      {/* Main content with semantic HTML */}
      <main>
        <Container className="md:pb-12 pb-10">
          <section aria-label="Course search and listing">
            <CityCategorySection
              citySlug={citySlug}
              categorySlug={categorySlug}
              searchParams={searchParamsData}
            />
          </section>
        </Container>

        {/* Additional description Section */}
        {seo && seo.additional_description && (
          <AdditionalDescription
            title={category.title}
            additional_description={seo.additional_description}
          />
        )}
      </main>
    </>
  );
}
