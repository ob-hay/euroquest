import Container from "@/components/shared/container";
import { Check } from "lucide-react";
import Link from "next/link";

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className = "" }: AboutSectionProps) {
  return (
    <section className={`py-8 bg-[#F2F8FF] ${className}`}>
      <Container>
        <div className="flex items-center justify-between flex-wrap md:flex-row flex-col gap-8">
          {/* About Content */}
          <div className="about-content relative max-w-[600px]">
            {/* Decorative bullets shape */}
            <img
              src="/assets/images/bullets-shape.svg"
              alt=""
              className="absolute -top-8 -left-8 w-16 h-16 opacity-20"
            />

            {/* Section Header */}
            <div className="mb-4">
              <h2 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight">
                <span className="text-gray-800">About</span>
                <div className="inline-block ml-3 relative">
                  <span className="text-[#3E5EC0] font-bold">EuroQuest</span>
                  <img
                    src="/assets/images/line.svg"
                    alt=""
                    className="absolute -bottom-1 left-0 w-full h-auto"
                  />
                </div>
              </h2>
            </div>

            {/* About Text Points */}
            <div className="space-y-6 mb-5">
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

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-5 max-w-[400px] w-full">
            {/* Courses */}
            <div className="bg-white rounded-2xl p-8 w-full h-full flex items-center justify-center text-center flex-col">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                1000<span className="text-[#3E5EC0]">+</span>
              </div>
              <div className="text-sm text-[#6E6E6E]">Courses</div>
            </div>

            {/* Cities */}
            <div className="bg-white rounded-2xl p-8 w-full h-full flex items-center justify-center text-center flex-col">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                24<span className="text-[#3E5EC0]">+</span>
              </div>
              <div className="text-sm text-[#6E6E6E]">Cities</div>
            </div>

            {/* Happy Clients */}
            <div className="bg-white rounded-2xl p-8 w-full h-full flex items-center justify-center text-center flex-col">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                200<span className="text-[#3E5EC0]">+</span>
              </div>
              <div className="text-sm text-[#6E6E6E]">
                Happy
                <br />
                Clients
              </div>
            </div>

            {/* On Going Projects */}
            <div className="bg-white rounded-2xl p-8 w-full h-full flex items-center justify-center text-center flex-col">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                100<span className="text-[#3E5EC0]">+</span>
              </div>
              <div className="text-sm text-[#6E6E6E]">
                On Going
                <br />
                Projects
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
