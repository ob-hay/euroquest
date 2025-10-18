import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import SectionTitle from "@/components/shared/section-title";
import Button from "@/components/ui/button";
import { Home } from 'lucide-react';
import { services } from "@/constants";
import { getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";

const breadcrumbs = [
  { label: '', href: '/', icon: <Home width={16} height={16}/> },
  { label: 'About', href: '/about' }
];


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('about');
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
    console.error('Error generating metadata for about page:', error);
    
    // Fallback metadata
    return {
      title: "About EuroQuest International | Professional Training & Development",
      description: "Learn about EuroQuest International, a leading educational institute providing high-quality training and learning experiences. Founded in 2015 with over 25 years of expertise.",
      keywords: "about euroquest, training institute, professional development, educational services, management training",
    };
  }
}

export default function AboutPage() {
  return (
    <> 
      <Schema 
        pageType="about"
        pageTitle="About EuroQuest International"
        pageDescription="Learn about EuroQuest International, a leading educational institute providing high-quality training and learning experiences. Founded in 2015 with over 25 years of expertise."
        pageUrl="https://euroqst.com/about"
      />
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-about.webp"
        title="About EuroQuest International"
        description="Founded in 2015 by a team with over 25 years of expertise, EuroQuest International has delivered more than 1000 training programs, benefiting over 15,000 participants across diverse sectors in global hubs including Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva."
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
      />

      {/* About Section */}
      <section className="bg-white md:py-12 py-10">
        <Container className="flex flex-col gap-12 relative z-10">
          <img 
            src="/assets/images/bullets-shape.svg" 
            alt="" 
            className="absolute -top-7 -left-44 z-[-1] hidden lg:block" 
          />
          <div className="w-full">
            <SectionTitle title="Who is" highlight="EuroQuest" className="!mb-4" />
            <p className="font-normal text-base leading-7">
              EuroQuest International is a leading educational institute that
              provides high-quality training and learning experiences tailored to
              meet our clients' needs. We aim to facilitate both professional and
              personal excellence while enhancing organizational effectiveness. By
              developing and delivering world-class management development
              services, we align with the latest management thinking and
              strategies. We strive to transform personal, team, and company
              performance through high-powered solutions that empower managers and
              develop leaders. We are committed to delivering services that are
              always relevant and applicable, maintaining a customer-focused
              approach
            </p>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="md:py-12 py-10">
        <Container className="flex items-center justify-between gap-8 lg:flex-nowrap flex-wrap">
          <SectionTitle title="Our" highlight="Services" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {services.map((service, index) => (
              <div key={index} className="h-full flex flex-col justify-between text-center items-center gap-2.5">
                <div className="w-20 h-20">
                  <img src={service.icon} alt={service.title} className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#3E5EC0] text-lg font-bold mb-4">{service.title}</h3>
                  <p className="text-[#757575] leading-6">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Goals Section */}
      <section className="bg-[#F0FAF7] md:py-12 py-10">
        <Container>
          <div className="w-full">
            <SectionTitle title="Our" highlight="Goals" className="!mb-4" />
            <p className="font-normal text-base leading-7">
              Provide Human Resources with the knowledge, skills and trends that
              enhance performance. Develop the professional practices of trainees
              in alignment with the latest professional developments in the field
              of training. Increase the number of training centers worldwide.
              Expand professional cooperation relations with the international
              institutions concerned with training and human resources
              development. Continue to be an active leader in capacity building at
              both the regional and international levels. Seek to obtain
              international professional accreditation for the training programs.
            </p>
          </div>
        </Container>
      </section>

      {/* About Contact Section */}
      <section className="bg-[#F2F8FF] md:py-12 py-10">
        <Container className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          <div className="max-w-[540px] text-center lg:text-left">
            <p className="text-2xl md:text-4xl font-semibold leading-tight mb-8">
              space where individuals{" "}
              <span className="text-[#3E5EC0]">individuals</span> grow
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button>
                <span>contact us</span>
                <i className="fa-solid fa-chevron-right ml-2"></i>
              </Button>
            </div>
          </div>
          <div className="w-full max-w-[400px]">
            <img
              src="/assets/images/about-contact-img.png"
              alt="Request a call illustration"
              className="w-full h-auto"
            />
          </div>
        </Container>
      </section>

      {/* Coverage Section */}
      {/* <section className="mt-10">
        <div className="w-full">
          <div className="relative w-full">
            <img 
              src="/assets/images/global-map2.png" 
              alt="Map showing our global presence" 
              className="w-full h-auto" 
            />
            <div className="absolute top-1/2 left-[15%] md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 text-center flex flex-col justify-center items-center gap-3 w-full md:w-auto px-4">
              <h2 className="font-semibold text-2xl md:text-4xl text-black">
                Geographical <span className="text-[#3E5EC0]">Coverage</span>
              </h2>
              <p className="text-[#7C7B7B]">find our services in 25 cities around the world</p>
              <Button className="max-w-[200px]">
                See All
                <i className="fa-solid fa-chevron-right ml-2"></i>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
