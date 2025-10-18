import Breadcrumb, { BreadcrumbItem } from "../ui/breadcrumb";
import Container from "./container";

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  enableTypewriter?: boolean;
  typewriterSpeed?: number;
  typewriterDelay?: number;
  typewriterLoop?: boolean;
}

export default function HeroBanner({
  backgroundImage,
  title,
  description,
  breadcrumbs = [],
  className = "",
}: HeroBannerProps) {
  return (
    <section
      className={`relative min-h-[230px] flex overflow-hidden py-6 mt-[70px] ${className}`}
    >
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content Container */}
      <Container className="h-full">
        <div className="relative z-10 text-white h-full w-full flex flex-col justify-start">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbs} />

          {/* Hero Text */}
          <div className="pb-6">
            <h1 className="text-2xl md:text-[32px] font-bold mb-4">{title}</h1>

            {description && (
              <div
                className="text-sm md:text-base leading-relaxed max-w-6xl font-medium"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
