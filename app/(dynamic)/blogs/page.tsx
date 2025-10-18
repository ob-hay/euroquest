import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import BlogsSection from "@/app/(dynamic)/blogs/_components/blogs-section";
import { Home } from "lucide-react";
import { getBlogs, getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";

// Generate metadata dynamically for SEO optimization
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("blogs");
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
        url: seo.canonical || `${baseUrl}/blogs`,
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
        canonical: seo.canonical || `${baseUrl}/blogs`,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for blogs page:", error);
    const baseUrl = "https://euroqst.com";

    // SEO-optimized fallback metadata
    return {
      title:
        "Training & Development Blogs | EuroQuest International Expert Articles",
      description:
        "Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends.",
      keywords:
        "training blogs, development articles, leadership insights, management tips, HR resources, project planning, career growth, professional development, industry trends",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${baseUrl}/blogs`,
      },
    };
  }
}

interface BlogsPageProps {
  searchParams: Promise<{
    keyword?: string;
    page?: string;
  }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams;
  const blogsData = await getBlogs();
  const baseUrl = "https://euroqst.com";

  const breadcrumbs = [
    {
      href: "/",
      label: "",
      icon: <Home size={14} />,
    },
    {
      href: "/blogs",
      label: "Blogs",
    },
  ];

  // Generate JSON-LD structured data for blog listing (using initial data for SEO)
  const blogListSchema = blogsData?.blogs?.data
    ? {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "EuroQuest International Training & Development Blog",
        description:
          "Expert articles on leadership, management, human resources, project planning, and career growth",
        url: `${baseUrl}/blogs`,
        publisher: {
          "@type": "Organization",
          name: "EuroQuest International",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/assets/images/logo.png`,
          },
        },
        blogPost: blogsData.blogs.data.slice(0, 10).map((blog: Blog) => ({
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.description,
          image: blog.image,
          url: `${baseUrl}/blogs/${blog.slug}`,
          datePublished: blog.created_at,
          dateModified: blog.updated_at,
          author: {
            "@type": "Organization",
            name: "EuroQuest International",
          },
        })),
      }
    : null;

  if (!blogsData || !blogsData.blogs || blogsData.blogs.data.length === 0) {
    return (
      <>
        <Schema
          pageType="blogs"
          pageTitle="Training & Development Blogs | EuroQuest International Expert Articles"
          pageDescription="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
          pageUrl={`${baseUrl}/blogs`}
        />
        <HeroBanner
          backgroundImage="/assets/images/hero-blogs.png"
          title="Training & Development Blogs"
          description="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
        <Container className="text-center">
          <article className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Blogs Available
            </h2>
            <p className="text-gray-600">
              We're working on adding new blog content. Please check back soon!
            </p>
          </article>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* Schema.org JSON-LD for Blog Listing */}
      {blogListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />
      )}

      <Schema
        pageType="blogs"
        pageTitle="Training & Development Blogs | EuroQuest International Expert Articles"
        pageDescription="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
        pageUrl={`${baseUrl}/blogs`}
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-blogs.png"
          title="Training & Development Blogs"
          description="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
      </header>

      {/* Main content with semantic HTML */}
      <main>
        <Container className="md:pb-12 pb-10">
          <section aria-label="Blog articles and search">
            <BlogsSection searchParams={params} />
          </section>
        </Container>
      </main>
    </>
  );
}
