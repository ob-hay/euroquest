import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import CitiesSection from "./_components/cities-section";
import { getCities, getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";

// Generate metadata dynamically for SEO optimization
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("cities");
    const seo = seoData.seo;
    const baseUrl = "https://euroqst.com";

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords,
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      // robots: {
      //   index: true,
      //   follow: false,
      //   googleBot: {
      //     index: true,
      //     follow: false,
      //     "max-video-preview": -1,
      //     "max-image-preview": "large",
      //     "max-snippet": -1,
      //   },
      // },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: seo.canonical || `${baseUrl}/training-cities`,
        siteName: "EuroQuest International",
        title: seo.meta_title,
        description: seo.meta_description,
        images: [
          {
            url: seo.meta_image,
            width: 1200,
            height: 630,
            alt: seo.meta_title,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@euroquest",
        creator: "@euroquest",
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical || `${baseUrl}/training-cities`,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for cities page:", error);
    const baseUrl = "https://euroqst.com";

    // SEO-optimized fallback metadata
    return {
      title:
        "Training Cities | EuroQuest International Global Training Locations",
      description:
        "Explore training courses in leading global capitals and cities. Browse professional training programs in Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva.",
      keywords:
        "training cities, global training locations, Dubai training, London courses, Barcelona training, Istanbul courses, Vienna training, Paris courses, Geneva training",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: false,
      },
      alternates: {
        canonical: `${baseUrl}/training-cities`,
      },
    };
  }
}

interface CitiesPageProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function CitiesPage({ searchParams }: CitiesPageProps) {
  const params = await searchParams;
  const cities = await getCities();
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
      label: "Training Cities",
    },
  ];

  // Generate JSON-LD structured data for cities listing
  const cityListSchema = cities
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Training Cities | EuroQuest International",
        description:
          "Explore training courses in leading global capitals and cities. Browse professional training programs in Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva.",
        url: `${baseUrl}/training-cities`,
        publisher: {
          "@type": "Organization",
          name: "EuroQuest International",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/assets/images/logo.png`,
          },
        },
        hasPart: cities.map((city: City) => ({
          "@type": "Place",
          name: city.title,
          url: `${baseUrl}/training-cities/${city.slug}`,
          image: city.image,
        })),
      }
    : null;

  if (!cities || cities.length === 0) {
    return (
      <>
        <Schema
          pageType="cities"
          pageTitle="Training Cities | EuroQuest International Global Training Locations"
          pageDescription="Explore training courses in leading global capitals and cities. Browse professional training programs in Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva."
          pageUrl={`${baseUrl}/training-cities`}
        />
        <header>
          <HeroBanner
            backgroundImage="/assets/images/hero-cities.webp"
            title="Explore training courses in leading global capitals and cities"
            description="Browse a wide range of training cities across different fields"
            breadcrumbs={breadcrumbs}
            enableTypewriter={true}
            typewriterSpeed={100}
            typewriterDelay={500}
          />
        </header>
        <main>
          <Container className="text-center md:pb-12 pb-10">
            <article className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Cities Available
              </h2>
              <p className="text-gray-600">
                We're working on adding new training cities. Please check back soon!
              </p>
            </article>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Schema.org JSON-LD for Cities Listing */}
      {cityListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListSchema) }}
        />
      )}

      <Schema
        pageType="cities"
        pageTitle="Training Cities | EuroQuest International Global Training Locations"
        pageDescription="Explore training courses in leading global capitals and cities. Browse professional training programs in Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva."
        pageUrl={`${baseUrl}/training-cities`}
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-cities.webp"
          title="Explore training courses in leading global capitals and cities"
          description="Browse a wide range of training cities across different fields"
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
      </header>

      {/* Main content with semantic HTML */}
      <main>
        <Container className="md:pb-12 pb-10">
          <section aria-label="Training cities and search">
            <CitiesSection cities={cities} />
          </section>
        </Container>
      </main>
    </>
  );
}
