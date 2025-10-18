import { Metadata } from "next";
import Script from "next/script";
import HeroSection from "./_components/hero-home-section";
import AboutSection from "./_components/about-section";
import ContactSection from "./_components/contact-section";
import CitiesSection from "./_components/cities-section";
import UpcomingCoursesSection from "./_components/upcoming-courses-section";
import { getCategories, getSeoData } from "@/services/services";
import CategoriesSection from "./_components/categories-section";


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('home');
    const seo = seoData.seo;

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords,
      openGraph: {
        title: seo.meta_title,
        description: seo.meta_description,
        images: [
          {
            url: seo.meta_image,
            width: 1200,
            height: 630,
            alt: seo.meta_title,
          },
        ],
        type: 'website',
        url: seo.canonical,
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "EuroQuest International Training | Professional Training Courses & Programs",
      description: "EuroQuest International Training provides diverse professional courses in management, HR, IT, finance, and quality. Advance your skills and grow your career with expert programs.",
      keywords: "professional training, development programs, management courses, HR training, IT skills, finance training, quality courses",
    };
  }
}

export default async function HomePage() {
  const categories = await getCategories();
  
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://euroqst.com/#organization",
        "name": "EuroQuest International Training",
        "url": "https://euroqst.com",
        "logo": "https://euroqst.com/assets/images/logo.svg",
        "sameAs": [
          "https://www.facebook.com/euroquest.international"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+421 911 803 183",
            "email": "info@euroqst.com",
            "contactType": "customer support",
            "areaServed": [
              "JO",
              "NL",
              "ES",
              "BE",
              "HU",
              "EG",
              "AE",
              "CH",
              "TR",
              "ID",
              "MY",
              "GB",
              "BH",
              "FR",
              "SG",
              "AT"
            ],
            "availableLanguage": [
              "en",
              "ar"
            ]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Šancová 3568/61, Mestská časť Nové Mesto",
          "addressLocality": "Bratislava",
          "postalCode": "831 04",
          "addressCountry": "SK"
        },
        "description": "Founded in 2015 by a team with over 25 years of expertise, EuroQuest International has delivered more than 1000 training courses, benefiting over 15,000 participants across diverse sectors in global hubs including Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva.",
        "foundingDate": "2015",
        "slogan": "Empowering Professionals Worldwide",
        "knowsAbout": [
          "Administrative Skills Courses",
          "Artificial Intelligence Courses",
          "Aviation Compliance Courses",
          "Aviation Operations Courses",
          "Aviation Procurement Courses",
          "Aviation Safety Courses",
          "Brand Management Courses",
          "Budgeting and Forecasting Courses",
          "Business Communication Courses",
          "Business Continuity Courses",
          "Business Intelligence Courses",
          "CRM Courses",
          "Change Leadership Courses",
          "Change Management Courses",
          "Compensation and Benefits Courses",
          "Compliance Management Courses",
          "Contract Drafting Courses",
          "Contract Management Courses",
          "Contract Negotiation Courses",
          "Corporate Communication Courses",
          "Corporate Finance Courses",
          "Corporate Law Courses",
          "Crisis Communication Courses",
          "Crisis Management Courses",
          "Culture Transformation Courses",
          "Customer Experience Courses",
          "Cybersecurity Courses",
          "Data Analytics Courses",
          "Data-Driven Decision Making Courses",
          "Design Thinking Courses",
          "Digital Marketing Courses",
          "Digital Transformation Courses",
          "Distribution Management Courses",
          "Downstream Operations Courses",
          "Emergency Management Courses",
          "Energy Management Courses",
          "Engineering Management Courses",
          "Enterprise Risk Management Courses",
          "Entrepreneurship Courses",
          "Environmental Geology Courses",
          "Event Management Courses",
          "Executive Assistant Courses",
          "Executive Leadership Courses",
          "Financial Management Courses",
          "Geosciences Courses",
          "Governance Courses",
          "Healthcare Administration Courses",
          "Healthcare Management Courses",
          "Hospital Operations Courses",
          "Hospitality Management Courses",
          "Human Resources Courses",
          "ISO Standards Courses",
          "IT Governance Courses",
          "Information Security Courses",
          "Innovation Management Courses",
          "Internal Audit Courses",
          "Internal Controls Courses",
          "Investment Analysis Courses",
          "Leadership Courses",
          "Learning and Development Courses",
          "Logistics Management Courses",
          "MRO Courses",
          "Machine Learning Courses",
          "Maintenance Management Courses",
          "Marketing Management Courses",
          "Media Relations Courses",
          "Natural Resource Management Courses",
          "Occupational Health and Safety Courses",
          "Office Management Courses",
          "Oil and Gas Management Courses",
          "Operational Risk Courses",
          "Operations Management Courses",
          "Organizational Development Courses",
          "PMO Courses",
          "Performance Management Courses",
          "Process Improvement Courses",
          "Procurement Courses",
          "Product Management Courses",
          "Project Management Courses",
          "Project Planning Courses",
          "Project Scheduling Courses",
          "Public Relations Courses",
          "Quality Assurance Courses",
          "Quality Management Courses",
          "Risk Management Courses",
          "Security Management Courses",
          "Service Excellence Courses",
          "Strategic Management Courses",
          "Strategic Sourcing Courses",
          "Supplier Relationship Management Courses",
          "Supply Chain Management Courses",
          "Talent Management Courses",
          "Tourism Management Courses",
          "Transportation Management Courses",
          "Upstream Operations Courses",
          "Warehousing Courses"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Training Course Categories",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Aviation Safety, Compliance, MRO, Procurement & Operations"
            },
            {
              "@type": "OfferCatalog",
              "name": "Corporate Law & Contract Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Cybersecurity & Digital Transformation"
            },
            {
              "@type": "OfferCatalog",
              "name": "Data Analytics, AI & Decision-Making"
            },
            {
              "@type": "OfferCatalog",
              "name": "Energy Oil & Gas Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Engineering & Operations Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Financial Management & Investment Analysis"
            },
            {
              "@type": "OfferCatalog",
              "name": "Geosciences & Natural Resource Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Healthcare Management & Administration"
            },
            {
              "@type": "OfferCatalog",
              "name": "Hospitality, Tourism & Event Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Human Resources Management & Training"
            },
            {
              "@type": "OfferCatalog",
              "name": "Innovation & Entrepreneurship Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Leadership & Strategic Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Logistics Distribution Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Marketing Management & Customer Experience"
            },
            {
              "@type": "OfferCatalog",
              "name": "Office Management, Secretary & Executive Support"
            },
            {
              "@type": "OfferCatalog",
              "name": "Organizational Development & Change Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Procurement Supply Chain Management"
            },
            {
              "@type": "OfferCatalog",
              "name": "Project Management & Planning"
            },
            {
              "@type": "OfferCatalog",
              "name": "Public Relations & Corporate Communication"
            },
            {
              "@type": "OfferCatalog",
              "name": "Quality Management, Governance and Audit"
            },
            {
              "@type": "OfferCatalog",
              "name": "Risk Management & Compliance"
            },
            {
              "@type": "OfferCatalog",
              "name": "Safety, Security & Emergency Management"
            }
          ]
        },
        "alternateName": "EuroQuest International"
      },
      {
        "@type": "WebSite",
        "@id": "https://euroqst.com/#website",
        "url": "https://euroqst.com",
        "name": "EuroQuest International Training",
        "description": "EuroQuest International Training provides innovative training courses across multiple industries and global hubs.",
        "publisher": {
          "@id": "https://euroqst.com/#organization"
        },
        "inLanguage": "en"
      },
      {
        "@type": "WebPage",
        "@id": "https://euroqst.com/#webpage",
        "url": "https://euroqst.com",
        "name": "EuroQuest International Training",
        "isPartOf": {
          "@id": "https://euroqst.com/#website"
        },
        "mainEntity": {
          "@id": "https://euroqst.com/#organization"
        },
        "description": "Explore EuroQuest International Training – founded in 2015, delivering more than 1000 training courses to 15,000+ participants worldwide.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://euroqst.com"
            }
          ]
        },
        "inLanguage": "en"
      }
    ]
  };

  return (
    <>
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      <HeroSection />
      <CategoriesSection  categories={categories}/>
      <CitiesSection />
      <AboutSection />
      <UpcomingCoursesSection />
      <ContactSection />
    </>
  );
}
