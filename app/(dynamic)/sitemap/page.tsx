import HeroBanner from "@/components/shared/hero-banner";
import { getSitemapData } from "@/services/services";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Schema from "@/components/shared/schema";


export const metadata: Metadata = {
  title: "Sitemap | EuroQuest International",
  description:
    "Complete sitemap of EuroQuest International training courses, categories, cities, and all available pages.",
  // robots: "noindex, nofollow",
};

export default async function SitemapPage() {
  let sitemapData: SitemapApiResponse | null = null;

  try {
    sitemapData = await getSitemapData();
  } catch (err) {
    // Handle error if needed
    // console.error("Failed to fetch sitemap data:", err);
  }

  const breadcrumbs = [
    {
      href: "/",
      label: "",
      icon: <Home width={16} height={16} />,
    },
    {
      href: "/sitemap",
      label: "sitemap",
    },
  ];

  return (
    <>
      <Schema 
        pageType="sitemap"
        pageTitle="Sitemap | EuroQuest International"
        pageDescription="Complete sitemap of EuroQuest International training courses, categories, cities, and all available pages."
        pageUrl="https://euroqst.com/sitemap"
      />
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-sitemap.png"
        title="Sitemap"
        description="Complete sitemap of EuroQuest International training courses, categories, cities, and all available pages."
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      {/* Sitemap Section */}
      <section className="py-14">
        <div className="container mx-auto">
          <div className="flex flex-col gap-24 max-w-4xl w-full">
            {/* Pages Section */}
            <div className="relative flex flex-col gap-10">
              {/* Background stripe */}
              <div className="absolute left-0 top-0 w-14 h-full bg-blue-50 -z-10 hidden md:block"></div>

              <h2 className="text-4xl font-semibold ml-0 md:ml-10">Pages</h2>

              <div className="ml-0 md:ml-28 flex flex-wrap gap-12 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  <li>
                    <a
                      href="/"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/training-courses"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      href="/training-cities"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Cities
                    </a>
                  </li>
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  <li>
                    <a
                      href="/blogs"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      About us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Contact us
                    </a>
                  </li>
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  <li>
                    <a
                      href="/privacy-policy"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Terms & conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="/join"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      Join Our Team
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Categories Section */}
            <div className="relative flex flex-col gap-10">
              {/* Background stripe */}
              <div className="absolute left-0 top-0 w-14 h-full bg-teal-50 -z-10 hidden md:block"></div>

              <h2 className="text-4xl font-semibold ml-0 md:ml-10">
                Categories
              </h2>

              <div className="ml-0 md:ml-28 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-2">
                  {sitemapData?.categories
                    .slice(0, Math.ceil(sitemapData.categories.length / 2))
                    .map((category) => (
                      <li key={category.id}>
                        <a
                          href={`/training-courses/${category.slug}`}
                          className="hover:text-blue-600 transition-colors duration-300"
                        >
                          {category.title}
                        </a>
                      </li>
                    ))}
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  {sitemapData?.categories
                    .slice(Math.ceil(sitemapData.categories.length / 2))
                    .map((category) => (
                      <li key={category.id}>
                        <a
                          href={`/training-courses/${category.slug}`}
                          className="hover:text-blue-600 transition-colors duration-300"
                        >
                          {category.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Cities Section */}
            <div className="relative flex flex-col gap-10">
              {/* Background stripe */}
              <div className="absolute left-0 top-0 w-14 h-full bg-blue-50 -z-10 hidden md:block"></div>

              <h2 className="text-4xl font-semibold ml-0 md:ml-10">Cities</h2>

              <div className="ml-0 md:ml-28 flex flex-wrap gap-12 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  {sitemapData?.cities.map((city) => (
                    <li key={city.id}>
                      <a
                        href={`/training-cities/${city.slug}`}
                        className="hover:text-blue-600 transition-colors duration-300"
                      >
                        {city.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* City-Category Combinations Section */}
            {sitemapData?.city_category_seos &&
              Object.keys(sitemapData.city_category_seos).length > 0 && (
                <div className="relative flex flex-col gap-10">
                  {/* Background stripe */}
                  <div className="absolute left-0 top-0 w-14 h-full bg-green-50 -z-10 hidden md:block"></div>

                  <h2 className="text-4xl font-semibold ml-0 md:ml-10">
                    City Category Combinations
                  </h2>

                  <div className="ml-0 md:ml-28 space-y-8 max-w-4xl">
                    {Object.entries(sitemapData.city_category_seos).map(
                      ([categoryId, combinations]) => {
                        const category = sitemapData.categories.find(
                          (cat) => cat.id.toString() === categoryId
                        );
                        if (!category) return null;

                        return (
                          <div key={categoryId} className="space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-800">
                              {category.title}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {combinations.map((combination, index) => (
                                <a
                                  key={index}
                                  href={`/training-courses/${combination.city.slug}/${combination.category.slug}`}
                                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 block"
                                >
                                  {combination.city.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

            {/* City-Course Combinations Section */}
            {sitemapData?.city_course_seos &&
              Object.keys(sitemapData.city_course_seos).length > 0 && (
                <div className="relative flex flex-col gap-10">
                  {/* Background stripe */}
                  <div className="absolute left-0 top-0 w-14 h-full bg-purple-50 -z-10 hidden md:block"></div>

                  <h2 className="text-4xl font-semibold ml-0 md:ml-10">
                    City Course Combinations
                  </h2>

                  <div className="ml-0 md:ml-28 space-y-8 max-w-4xl">
                    {Object.entries(sitemapData.city_course_seos).map(
                      ([courseId, combinations]) => {
                        const course = combinations[0]?.course;
                        if (!course) return null;

                        return (
                          <div key={courseId} className="space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-800">
                              {course.title}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {combinations.map((combination, index) => (
                                <a
                                  key={index}
                                  href={`/training-course/${combination.course.slug}/${combination.city.slug}`}
                                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 block"
                                >
                                  {combination.city.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>
    </>
  );
}
