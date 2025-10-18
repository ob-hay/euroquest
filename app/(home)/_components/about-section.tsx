import Container from "@/components/shared/container";
import { Check } from "lucide-react";
import Link from "next/link";

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className = "" }: AboutSectionProps) {
  return (
    <section className={`py-16 lg:py-24 bg-[#F2F8FF] ${className}`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* About Content */}
          <div className="about-content relative">
            {/* Decorative bullets shape */}
            <img
              src="/assets/images/bullets-shape.svg"
              alt=""
              className="absolute -top-8 -left-8 w-16 h-16 opacity-20"
            />

            {/* Section Header */}
            <div className="mb-8">
              <div>
                <h2 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  <span className="text-gray-800">About</span>
                  <div className="inline-block ml-3 relative">
                    <span className=" font-bold">
                      EuroQuest
                    </span>
                    <img
                      src="/assets/images/line.svg"
                      alt=""
                      className="absolute -bottom-1 left-0 w-full h-auto"
                    />
                  </div>
                </h2>
              </div>
            </div>

            {/* About Text Points */}
            <div className="space-y-6 mb-8">
              <p className="flex items-start gap-2 text-gray-700 text-base leading-relaxed">
                <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  EuroQuest International is a leading
                  <span className="text-emphasis font-semibold">
                    {" "}
                    training institute{" "}
                  </span>
                  offering
                  <span className="text-emphasis font-semibold">
                    {" "}
                    high-quality training courses
                  </span>
                  that empower individuals and organizations to excel.
                </span>
              </p>

              <p className="flex items-start gap-2 text-gray-700 text-base leading-relaxed">
                <Check className=" w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  We focus on
                  <span className="text-emphasis font-semibold ">
                    {" "}
                    innovative management and leadership development,
                  </span>
                  enhancing the performance of individuals, teams, and
                  organizations.
                </span>
              </p>

              <p className="flex items-start gap-2 text-gray-700 text-base leading-relaxed">
                <Check className=" w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  Our programs
                  <span className="text-emphasis font-semibold ">
                    {" "}
                    integrate theory with practical application{" "}
                  </span>
                  to deliver sustainable results and measurable impact.
                </span>
              </p>
            </div>

            {/* Button */}
            <Link href="/about" className="inline-block ml-6">
              <button 
                className="bg-[#3E5EC0] hover:bg-[#2d4aa7] !mt-0 text-white px-8 py-3 rounded-lg font-semibold text-sm transform flex items-center gap-3 group"
                suppressHydrationWarning={true}
              >
                Read More
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>

          {/* About Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/assets/images/about-img.png"
                alt="About EuroQuest"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#3E5EC0]/10 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#3E5EC0]/5 rounded-full blur-lg"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
