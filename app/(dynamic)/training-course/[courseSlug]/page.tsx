import { Metadata } from "next";
import { getCourseDetails } from "@/services/services";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import HeroBanner from "@/components/shared/hero-banner";
import Container from "@/components/shared/container";
import CourseContent from "../_components/course-content";
import CourseTimings from "../_components/course-timings";
import Schema from "@/components/shared/schema";


// Generate metadata dynamically with enhanced SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  try {
    const { courseSlug } = await params;
    const courseData = await getCourseDetails(courseSlug);
    const { course } = courseData;
    const baseUrl = "https://euroqst.com";

    return {
      title:
        course.meta_title ||
        `${course.title} | EuroQuest International Training Course`,
      description:
        course.meta_description ||
        course.description ||
        `Professional training course: ${course.title}. Enhance your skills with EuroQuest International's expert-led program.`,
      keywords:
        course.keywords ||
        `${course.title}, professional training, ${course.category?.title}, EuroQuest International, skill development`,
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
          course.canonical ||
          `${baseUrl}/training-course/${course.slug}`,
        siteName: "EuroQuest International",
        title: course.meta_title || course.title,
        description: course.meta_description || course.description,
        images: [
          {
            url: course.meta_image || course.image || "/assets/images/hero-course.webp",
            width: 1200,
            height: 630,
            alt: course.title,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@euroquest",
        creator: "@euroquest",
        title: course.meta_title || course.title,
        description: course.meta_description || course.description,
        images: [course.meta_image || course.image || "/assets/images/hero-course.webp"],
      },
      alternates: {
        canonical:
          course.canonical ||
          `${baseUrl}/training-course/${course.slug}`,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for course page:", error);
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

export default async function Page({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  // Fetch course details from API
  const { courseSlug } = await params;
  const courseData = await getCourseDetails(courseSlug);
  const { course, timings } = courseData;
  const baseUrl = "https://euroqst.com";

  // Breadcrumb configuration
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "",
      icon: <Home size={14} />,
    },
    {
      href: "/training-courses",
      label: "categories",
    },
    {
      href: `/training-courses/${course.category.slug}`,
      label: course.category.title,
    },
    {
      href: `/training-course/${course.slug}`,
      label: course.title,
    },
  ];

  // Generate JSON-LD structured data for course page
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description || `Professional training course: ${course.title}`,
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
    url: `${baseUrl}/training-course/${course.slug}`,
    image: course.image || "/assets/images/hero-course.webp",
    about: {
      "@type": "Thing",
      name: course.category?.title,
    },
    hasCourseInstance: timings.map((timing) => ({
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: {
        "@type": "Place",
        // name: timing.city.title,
        address: {
          "@type": "PostalAddress",
          // addressLocality: timing.city.title,
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
          name: "Training Categories",
          item: `${baseUrl}/training-courses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: course.category.title,
          item: `${baseUrl}/training-courses/${course.category.slug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: course.title,
          item: `${baseUrl}/training-course/${course.slug}`,
        },
      ],
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD for Course Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <Schema
        pageType="courses"
        pageTitle={course.meta_title || `${course.title} | EuroQuest International Training Course`}
        pageDescription={
          course.meta_description ||
          course.description ||
          `Professional training course: ${course.title}. Enhance your skills with EuroQuest International's expert-led program.`
        }
        pageUrl={course.canonical || `${baseUrl}/training-course/${course.slug}`}
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage={"/assets/images/hero-course.webp"}
          title={course.h1 || course.title}
          description={course.description || "Loading course details..."}
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
      </main>
    </>
  );
}
