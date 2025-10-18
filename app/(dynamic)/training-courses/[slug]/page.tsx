import { getCategoryDetails } from "@/services/services";
import { Metadata } from "next";
import Schema from "@/components/shared/schema";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Container from "@/components/shared/container";
import AdditionalDescription from "@/components/shared/additional-description";
import CategorySection from "../_components/category-section";

// Generate metadata dynamically for category pages with enhanced SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const categoryData = await getCategoryDetails(slug);
    const { category } = categoryData;
    const baseUrl = "https://euroqst.com";

    // Generate dynamic metadata based on category data
    const title = `${category.title} Training Courses | EuroQuest International`;
    const description =
      category.description ||
      `Professional ${category.title} training courses at EuroQuest International. Expert-led programs designed to enhance your skills and career prospects.`;
    const keywords = `${
      category.title
    }, training courses, professional development, ${category.title.toLowerCase()} certification, EuroQuest International`;

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
        url: `${baseUrl}/training-courses/${slug}`,
        siteName: "EuroQuest International",
        title,
        description,
        images: [
          {
            url: category.meta_image || category.image || "/assets/images/hero-categories.webp",
            width: 1200,
            height: 630,
            alt: `${category.title} Training Courses`,
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
        images: [category.meta_image || category.image || "/assets/images/hero-categories.webp"],
      },
      alternates: {
        canonical: `${baseUrl}/training-courses/${slug}`,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for category page:", error);
    const baseUrl = "https://euroqst.com";

    // SEO-optimized fallback metadata
    return {
      title: "Training Courses | EuroQuest International",
      description:
        "Professional training courses at EuroQuest International. Expert-led programs designed to enhance your skills and career prospects.",
      keywords:
        "training courses, professional development, certification, EuroQuest International",
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

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function Page({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const searchParamsData = await searchParams;
  const categoryData = await getCategoryDetails(slug);
  const { category, courses } = categoryData;
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
      href: `/training-courses/${category?.slug || slug}`,
      label: category?.title || "Category",
    },
  ];

  // Generate JSON-LD structured data for category page
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} Training Courses`,
    description:
      category.description ||
      `Professional ${category.title} training courses at EuroQuest International`,
    url: `${baseUrl}/training-courses/${slug}`,
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
          name: category.title,
          item: `${baseUrl}/training-courses/${slug}`,
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
      {/* Schema.org JSON-LD for Category Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />

      <Schema
        pageType="courses"
        pageTitle={`${category.title} Training Courses | EuroQuest International`}
        pageDescription={
          category.description ||
          `Professional ${category.title} training courses at EuroQuest International. Expert-led programs designed to enhance your skills and career prospects.`
        }
        pageUrl={`${baseUrl}/training-courses/${slug}`}
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-about.webp"
          title={category?.h1 || category?.title || "Category"}
          description={category?.description || "Loading category details..."}
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
            <CategorySection courses={courses} searchParams={searchParamsData} />
          </section>
        </Container>

        {/* Additional description Section */}
        {category && category.additional_description && (
          <AdditionalDescription
            title={category.title}
            additional_description={category.additional_description}
          />
        )}
      </main>
    </>
  );
}
