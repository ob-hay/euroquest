import Container from "@/components/shared/container";
import SectionTitle from "../../../components/shared/section-title";
import CategoryHome from "@/components/cards/category-home";

export default function CategoriesSection({
  categories,
  title = "Discover All",
  citySlug,
  highlight = "Categories",
  description = "Professional Training Categories to enhance skills and performance",
}: {
  categories: Category[];
  title?: string;
  citySlug?: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <section className="bg-[#F2F8FF] md:py-14 py-12 relative">
      {/* Background Shape */}
      <img
        src="/assets/images/categories-shape.svg"
        alt=""
        className="absolute left-[-100px] top-0 w-[250px] h-[250px]"
      />

      <Container>
        <div className="md:mb-10 mb-8">
          <SectionTitle
            title={title}
            highlight={highlight}
            description={description}
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryHome
              key={category.id}
              category={category}
              citySlug={citySlug}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
