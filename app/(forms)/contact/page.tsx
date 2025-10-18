import { Metadata } from "next";
import { getSeoData } from "@/services/services";
import ContactPageClient from "./_components/contact-page-client";
import Schema from "@/components/shared/schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('contact');
    const { seo } = seoData;

    return {
      title: seo.meta_title || "Contact Us | EuroQuest International Training",
      description: seo.meta_description || "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
      keywords: seo.meta_keywords || "contact EuroQuest International, training inquiries, professional development, management training, HSE training, finance training, HR training, IT training, engineering training",
      openGraph: {
        title: seo.meta_title || "Contact Us | EuroQuest International Training",
        description: seo.meta_description || "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
        images: [
          {
            url: seo.meta_image || "/assets/images/contact-img.svg",
            width: 1200,
            height: 630,
            alt: "Contact EuroQuest International for Professional Training",
          },
        ],
        type: "website",
        url: seo.canonical || "https://euroqst.com/contact",
      },
      twitter: {
        card: "summary_large_image",
        title: seo.meta_title || "Contact Us | EuroQuest International Training",
        description: seo.meta_description || "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
        images: [seo.meta_image || "/assets/images/contact-img.svg"],
      },
      alternates: {
        canonical: seo.canonical || "https://euroqst.com/contact",
      },
    };
  } catch (error) {
    console.error("Error generating metadata for contact page:", error);
    
    // Fallback metadata
    return {
      title: "Contact Us | EuroQuest International Professional Development",
      description: "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
      keywords: "contact EuroQuest International, training inquiries, professional development, management training, HSE training, finance training, HR training, IT training, engineering training",
    };
  }
}

export default function ContactPage() {
  return (
    <>
      <Schema 
        pageType="contact"
        pageTitle="Contact Us | EuroQuest International Training"
        pageDescription="Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs."
        pageUrl="https://euroqst.com/contact"
      />
      <ContactPageClient />
    </>
  );
}
