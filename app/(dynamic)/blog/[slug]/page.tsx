import { getBlogBySlug } from "@/services/services";
import HeroBanner from "@/components/shared/hero-banner";
import { Home } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate comprehensive metadata for SEO optimization
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const baseUrl = "https://euroqst.com";

  if (!blog) {
    return {
      title: "Blog Not Found | EuroQuest International",
      description: "The requested blog article could not be found.",
      // robots: {
      //   index: false,
      //   follow: false,
      // },
    };
  }

  const publishedDate = new Date(blog.created_at).toISOString();
  const modifiedDate = new Date(blog.updated_at).toISOString();

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description,
    keywords: blog.meta_keywords,
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
      type: "article",
      locale: "en_US",
      url: blog.canonical || `${baseUrl}/blogs/${slug}`,
      siteName: "EuroQuest International",
      title: blog.meta_title || blog.title,
      description: blog.meta_description,
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ["EuroQuest International"],
      tags: blog.tag_name ? [blog.tag_name] : undefined,
      images: [
        {
          url: blog.meta_image || blog.image,
          width: 1200,
          height: 630,
          alt: blog.image_alt || blog.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@euroquest",
      creator: "@euroquest",
      title: blog.meta_title || blog.title,
      description: blog.meta_description,
      images: [blog.meta_image || blog.image],
    },
    alternates: {
      canonical: blog.canonical || `${baseUrl}/blogs/${slug}`,
    },
    other: {
      "article:published_time": publishedDate,
      "article:modified_time": modifiedDate,
      ...(blog.tag_name && { "article:tag": blog.tag_name }),
      "article:author": "EuroQuest International",
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const baseUrl = "https://euroqst.com";

  if (!blog) {
    notFound();
  }

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
    {
      href: `/blogs/${slug}`,
      label: blog.title,
    },
  ];

  // Generate Article JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.meta_description || blog.description,
    image: {
      "@type": "ImageObject",
      url: blog.image,
      width: 1200,
      height: 630,
      caption: blog.image_alt || blog.title,
    },
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    author: {
      "@type": "Organization",
      name: "EuroQuest International",
      url: baseUrl,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blog.canonical || `${baseUrl}/blogs/${slug}`,
    },
    keywords: blog.meta_keywords,
    articleSection: blog.tag_name || "Training & Development",
    wordCount: blog.content ? blog.content.split(/\s+/).length : 0,
    inLanguage: "en-US",
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        name: "Blogs",
        item: `${baseUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${baseUrl}/blogs/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Schema
        pageType="blogs"
        pageTitle={blog.meta_title || blog.title}
        pageDescription={blog.meta_description}
        pageUrl={blog.canonical || `${baseUrl}/blogs/${slug}`}
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-blogs.png"
          title={blog.h1 || blog.title}
          description={blog.meta_description}
          breadcrumbs={breadcrumbs}
          enableTypewriter={false}
        />
      </header>

      {/* Main article content */}
      <main>
        <Container className="md:py-12 py-10">
        <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
          {/* Hidden metadata for SEO */}
          <meta itemProp="headline" content={blog.title} />
          <meta itemProp="datePublished" content={blog.created_at} />
          <meta itemProp="dateModified" content={blog.updated_at} />
          <meta itemProp="author" content="EuroQuest International" />
          <link itemProp="url" href={`${baseUrl}/blogs/${slug}`} />

          {/* Blog Image */}
          <figure className="mb-8" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <img
              src={blog.image}
              alt={blog.image_alt || blog.title}
              title={blog.image_title || blog.title}
              className="w-full md:h-96 h-64 object-cover rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
              loading="eager"
              itemProp="url"
              width={1200}
              height={630}
            />
            <meta itemProp="caption" content={blog.image_alt || blog.title} />
          </figure>

          {/* Blog Meta Information */}
          <aside className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl md:p-6 p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600">
              <div className="flex flex-wrap items-center gap-4">
                <time className="flex items-center" dateTime={blog.created_at} itemProp="datePublished">
                  <i className="far fa-calendar mr-2 text-blue-600" aria-hidden="true"></i>
                  <span>
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </time>
                <span className="flex items-center" aria-label={`${blog.number_of_views} views`}>
                  <i className="far fa-eye mr-2 text-blue-600" aria-hidden="true"></i>
                  <span itemProp="interactionCount">{blog.number_of_views} views</span>
                </span>
                {blog.updated_at !== blog.created_at && (
                  <time className="text-xs text-gray-500" dateTime={blog.updated_at} itemProp="dateModified">
                    Updated:{" "}
                    {new Date(blog.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
              {blog.tag_name && (
                <span 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide"
                  itemProp="articleSection"
                >
                  {blog.tag_name}
                </span>
              )}
            </div>
          </aside>

          {/* Blog Content Section */}
          <section className="bg-white rounded-xl md:p-8 md:shadow-lg" itemProp="articleBody">
            <div
              className="blog-content prose prose-lg max-w-none 
              prose-headings:text-[#3E5EC0] prose-headings:font-semibold prose-headings:mb-6 prose-headings:mt-8
              prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-8 prose-h1:mt-12 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4 prose-h1:text-[#3E5EC0] prose-h1:font-bold
              prose-h2:text-3xl prose-h2:leading-tight prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-[#3E5EC0] prose-h2:font-bold prose-h2:border-b prose-h2:border-blue-100 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:leading-tight prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-800 prose-h3:font-semibold
              prose-h4:text-xl prose-h4:leading-tight prose-h4:mb-4 prose-h4:mt-6 prose-h4:text-gray-700 prose-h4:font-semibold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base prose-p:text-gray-600
              prose-ul:mb-8 prose-ul:pl-0 prose-ul:space-y-4 prose-ul:list-none
              prose-ol:mb-8 prose-ol:pl-0 prose-ol:space-y-4 prose-ol:list-none
              prose-li:mb-3 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:pl-6 prose-li:relative prose-li:before:content-['✓'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-0 prose-li:before:text-green-600 prose-li:before:font-bold prose-li:before:text-lg
              prose-a:text-blue-600 prose-a:no-underline prose-a:font-semibold prose-a:border-b-2 prose-a:border-blue-200 hover:prose-a:text-blue-800 hover:prose-a:border-blue-400 hover:prose-a:transition-all hover:prose-a:duration-200
              prose-strong:text-[#3E5EC0] prose-strong:font-bold prose-strong:text-[#3E5EC0]
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
              prose-hr:my-12 prose-hr:border-gray-200
              [&_li_p]:m-0 [&_li_p]:inline [&_li_p]:text-gray-600 [&_li_p]:leading-relaxed
              [&_h2]:text-[#3E5EC0] [&_h2]:font-bold [&_h2]:text-3xl [&_h2]:mb-6 [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-blue-100 [&_h2]:pb-3
              [&_h3]:text-gray-800 [&_h3]:font-semibold [&_h3]:text-2xl [&_h3]:mb-4 [&_h3]:mt-8
              [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base
              [&_strong]:text-[#3E5EC0] [&_strong]:font-bold
              [&_a]:text-blue-600 [&_a]:no-underline [&_a]:font-semibold [&_a]:border-b-2 [&_a]:border-blue-200 hover:[&_a]:text-blue-800 hover:[&_a]:border-blue-400
              [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-4 [&_ul]:mb-8
              [&_li]:pl-6 [&_li]:relative [&_li]:mb-3 [&_li]:text-gray-600 [&_li]:leading-relaxed [&_li]:before:content-['✓'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0 [&_li]:before:text-green-600 [&_li]:before:font-bold [&_li]:before:text-lg"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content || blog.description,
                }}
              />
            </div>
          </section>
        </article>
      </Container>
      </main>
    </>
  );
}
