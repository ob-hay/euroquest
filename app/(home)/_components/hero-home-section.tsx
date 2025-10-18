import { ChevronDown } from "lucide-react";
import SearchBannerHome from "./search-banner-home";
import Container from "@/components/shared/container";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      className={`relative min-h-[calc(100vh-70px)] mt-[70px] overflow-hidden bg-gradient-to-br from-blue-50 to-white ${className}`}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-blue-400/70 to-transparent rounded-full blur-[80px] animate-float opacity-70"></div>
        <div className="absolute -bottom-36 -right-36 w-72 h-72 bg-gradient-to-br from-blue-400/70 to-transparent rounded-full blur-[80px] animate-float-delayed opacity-70"></div>
      </div>

      <Container className="h-full min-h-[calc(100vh-160px)] flex flex-col items-center justify-center gap-5 text-center static">
        <div className="max-w-full w-full">
          {/* Hero Title */}
          <h1 className="font-jost text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight max-w-5xl mx-auto animate-slide-up">
            Join
            <span className="relative inline-block mx-2">
              <span className="text-[#3E5EC0] font-bold">1000+</span>
              <img
                src="/assets/images/line.svg"
                alt=""
                className="absolute right-0 -bottom-1 max-w-full h-auto"
              />
            </span>
            Training Programs and Courses in Global Destinations Worldwide
          </h1>

          {/* Hero Description */}
          <p className="text-gray-600 mx-auto mb-2 text-base md:text-lg leading-relaxed max-w-4xl animate-fade-in-delay opacity-0 transform translate-y-5">
            EuroQuest International is a leading educational and training
            institution, offering 1000+ high-quality training programs and
            courses worldwide, designed to develop skills and meet our clients'
            needs.
          </p>
        </div>

        {/* Search Bar Home */}
        <SearchBannerHome />
      </Container>
      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 transform flex flex-col items-center gap-2 cursor-pointer z-20 animate-scroll-bounce">
        <div className="text-[#3E5EC0] font-medium text-xs uppercase tracking-wide transition-all duration-300 hover:text-blue-700">
          Explore More
        </div>
        <div className="text-[#3E5EC0] text-xs transition-all duration-300 hover:text-blue-700 hover:translate-y-1 animate-arrow-bounce">
          <ChevronDown size={12} />
        </div>
      </div>
    </section>
  );
}
