import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CategoryHomeProps {
  category: Category;
  citySlug?: string;
}

export default function CategoryHome({ category, citySlug }: CategoryHomeProps) {
  return (
    <Link
    href={citySlug ? `/training-cities/${citySlug}/${category.slug}` : `/training-courses/${category.slug}`}
    className="group block text-inherit no-underline transition-all duration-[400ms] cubic-bezier-[0.175,0.885,0.32,1.275] relative overflow-hidden hover:transform hover:translate-y-[-2px] hover:shadow-[1px_1px_37px_0_rgb(62_94_192_/_15%)]"
  >
    {/* Shimmer effect */}
    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-blue-600/10 to-transparent transition-all duration-600 ease-out group-hover:left-full z-[1]"></div>

    <div className="flex items-center justify-between gap-4 bg-white p-[10px_16px] rounded-md shadow-[0_4px_20px_rgba(62,94,192,0.15)] transition-all duration-[400ms] cubic-bezier-[0.175,0.885,0.32,1.275] relative z-[2] group-hover:shadow-[0_8px_30px_rgba(62,94,192,0.25)] group-hover:border-none group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-50">
      {/* Category Icon */}
      <img
        src={category.icon}
        alt={category.title}
        className="max-w-[25px] h-[25px] transition-all duration-[400ms] cubic-bezier-[0.175,0.885,0.32,1.275] drop-shadow-[0_2px_4px_rgba(62,94,192,0.2)] group-hover:drop-shadow-[0_4px_8px_rgba(62,94,192,0.3)] group-hover:animate-pulse"
      />

      {/* Category Title */}
      <h3 className="text-[12.5px] font-semibold capitalize flex-1 transition-all duration-[400ms] cubic-bezier-[0.175,0.885,0.32,1.275] text-[#2B2B2B] group-hover:text-[#3E5EC0] group-hover:transform group-hover:translate-x-1">
        {category.title}
      </h3>

      {/* Arrow Icon */}
      <ArrowRight
        size={14}
        className="text-[#3E5EC0] transition-all duration-[400ms] cubic-bezier-[0.175,0.885,0.32,1.275] transform rotate-[-45deg] drop-shadow-[0_2px_4px_rgba(62,94,192,0.2)] group-hover:text-[#3E5EC0] group-hover:rotate-0 group-hover:drop-shadow-[0_4px_8px_rgba(62,94,192,0.3)]"
      />
    </div>
  </Link>
  );
}
