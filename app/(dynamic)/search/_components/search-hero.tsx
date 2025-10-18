import HeroBanner from "@/components/shared/hero-banner";
import { generateHeroDescription, generateSearchBreadcrumbs } from "./utils/search-utils";

interface SearchHeroProps {
  totalCount: number;
  resultType: "timings" | "courses";
}

export default function SearchHero({ totalCount, resultType }: SearchHeroProps) {
  const breadcrumbs = generateSearchBreadcrumbs();
  const description = generateHeroDescription(totalCount, resultType);

  return (
    <HeroBanner
      backgroundImage="/assets/images/hero-about.webp"
      title="Search Results"
      description={description}
      breadcrumbs={breadcrumbs}
      enableTypewriter={true}
    />
  );
}
