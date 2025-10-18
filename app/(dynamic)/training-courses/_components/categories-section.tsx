import { AnimatedCategoriesGrid } from "@/components/shared/animated";
import CategoryCard from "@/components/cards/category";
import SearchBanner from "@/components/shared/search-banner";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  return (
    <>
      {/* Search Banner */}
      <SearchBanner resetBehavior="local" />

      {/* Display Categories */}
      <section>
        <AnimatedCategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </AnimatedCategoriesGrid>
      </section>
    </>
  );
}
