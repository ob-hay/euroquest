import { Metadata } from "next";
import { getCityCourseDetails } from "@/services/services";
import HeroBanner from "@/components/shared/hero-banner";
import Container from "@/components/shared/container";
import AdditionalDescription from "@/components/shared/additional-description";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import CourseTimings from "../../_components/course-timings";
import CourseContent from "../../_components/course-content";
import Schema from "@/components/shared/schema";

// Generate metadata dynamically with enhanced SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; citySlug: string }>;
}): Promise<Metadata> {
  try {
    const { courseSlug, citySlug } = await params;
    const courseData = await getCityCourseDetails(courseSlug, citySlug);
    const { course, city, seo } = courseData;
    const baseUrl = "https://euroqst.com";

    return {
      title:
        seo.meta_title ||
        `${course.title} in ${city.title} | EuroQuest International Training`,
      description:
        seo.meta_description ||
        course.description ||
        `Professional training course: ${course.title} in ${city.title}. Enhance your skills with EuroQuest International's expert-led program.`,
      keywords:
        seo.meta_keywords ||
        `${course.title}, ${city.title}, professional training, ${
          course.category?.title
        }, EuroQuest International, skill development, ${city.title.toLowerCase()} courses`,
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
        url:
          seo.canonical ||
          `${baseUrl}/training-course/${course.slug}/${city.slug}`,
        siteName: "EuroQuest International",
        title: seo.meta_title || `${course.title} in ${city.title}`,
        description: seo.meta_description || course.description,
        images: [
          {
            url: seo.meta_image || course.image || "/assets/images/hero-course.webp",
            width: 1200,
            height: 630,
            alt:
              course.image_alt ||
              course.image_title ||
              `${course.title} training course in ${city.title}`,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@euroquest",
        creator: "@euroquest",
        title: seo.meta_title || `${course.title} in ${city.title}`,
        description: seo.meta_description || course.description,
        images: [seo.meta_image || course.image || "/assets/images/hero-course.webp"],
      },
      alternates: {
        canonical:
          seo.canonical ||
          `${baseUrl}/training-course/${course.slug}/${city.slug}`,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for city course page:", error);
    const baseUrl = "https://euroqst.com";

    // SEO-optimized fallback metadata
    return {
      title:
        "Training Course | EuroQuest International Professional Development",
      description:
        "Professional training course by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords:
        "professional training, course, EuroQuest International, skill development, career advancement",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      // robots: {
      //   index: true,
      //   follow: true,
      // },
      alternates: {
        canonical: `${baseUrl}/training-courses`,
      },
    };
  }
}

interface PageProps {
  params: Promise<{ courseSlug: string; citySlug: string }>;
}
export default async function Page({ params }: PageProps) {
  const { courseSlug, citySlug } = await params;
  const courseData = await getCityCourseDetails(courseSlug, citySlug);
  const { course, city, seo, timings } = courseData;
  const baseUrl = "https://euroqst.com";

  const breadcrumbs: BreadcrumbItem[] = [
    { href: "/", label: "", icon: <Home size={14} /> },
    { href: "/training-cities", label: "cities" },
    { href: `/training-cities/${city.slug}`, label: city.title },
    {
      href: `/training-course/${course.slug}/${city.slug}`,
      label: course.title,
    },
  ];

  // Generate JSON-LD structured data for city-course page
  const cityCourseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.title} in ${city.title}`,
    description:
      seo.description ||
      course.description ||
      `Professional training course: ${course.title} in ${city.title}`,
    provider: {
      "@type": "Organization",
      name: "EuroQuest International",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/images/logo.png`,
      },
    },
    courseCode: course.code,
    url: `${baseUrl}/training-course/${course.slug}/${city.slug}`,
    image: seo.meta_image || course.image || "/assets/images/hero-course.webp",
    about: {
      "@type": "Thing",
      name: course.category?.title,
    },
    hasCourseInstance: timings.map((timing) => ({
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: {
        "@type": "Place",
        name: city.title,
        address: {
          "@type": "PostalAddress",
          addressLocality: city.title,
        },
      },
      startDate: timing.start_date,
      endDate: timing.end_date,
      offers: {
        "@type": "Offer",
        price: timing.fees,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    })),
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
          item: `${baseUrl}/training-cities/${city.slug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: course.title,
          item: `${baseUrl}/training-course/${course.slug}/${city.slug}`,
        },
      ],
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD for City-Course Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityCourseSchema) }}
      />

      <Schema
        pageType="courses"
        pageTitle={
          seo.meta_title ||
          `${course.title} in ${city.title} | EuroQuest International Training`
        }
        pageDescription={
          seo.meta_description ||
          course.description ||
          `Professional training course: ${course.title} in ${city.title}. Enhance your skills with EuroQuest International's expert-led program.`
        }
        pageUrl={
          seo.canonical ||
          `${baseUrl}/training-course/${course.slug}/${city.slug}`
        }
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage={"/assets/images/hero-about.webp"}
          title={seo.h1 || course.title}
          description={
            seo.description || course.description || "Loading course details..."
          }
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
      </header>

      {/* Main content with semantic HTML */}
      <main>
        <Container>
          <section aria-label="Course schedule and timings">
            <CourseTimings course={course} timings={timings} />
          </section>

          <section aria-label="Course content and details">
            <CourseContent course={course} />
          </section>
        </Container>

        {/* Additional Description Section */}
        {seo && seo.additional_description && (
          <AdditionalDescription
            title={course.title}
            additional_description={seo.additional_description}
          />
        )}
      </main>
    </>
  );
}
