import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/training-courses/${category.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow-[1px_1px_37px_0_rgba(62,94,192,0.25)] transition-all duration-300 relative border border-white/20 cursor-pointer group hover:transform hover:-translate-y-1.5"
    >
      {/* Top border gradient - appears on hover */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#314EA9] to-[#446AE1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

      {/* Category Info */}
      <div className="p-4 pb-2 relative bg-gradient-to-br from-[#f8faff] to-[#f0f4ff]">
        {/* Icon Container */}
        <div className="bg-gradient-to-r from-[#314EA9] to-[#446AE1] mb-2 w-10 h-10 rounded-lg flex items-center justify-center shadow-[0_6px_20px_rgba(102,126,234,0.3)] transition-all duration-300 relative overflow-hidden group-hover:transform group-hover:scale-110 group-hover:rotate-1 group-hover:shadow-[0_8px_24px_rgba(102,126,234,0.4)]">
          <img
            src={category.icon}
            alt=""
            className="w-5 h-5 brightness-0 invert transition-all duration-300 z-10 relative group-hover:scale-110"
          />
        </div>

        {/* Category Title */}
        <h3 className="text-[15px] font-semibold text-[#2d3748] leading-tight m-0 transition-all duration-300 min-h-[45px] line-clamp-2 mt-1.5 group-hover:text-[#1a202c] group-hover:transform group-hover:translate-x-1">
          {category.title}
        </h3>
      </div>

      {/* Category Footer */}
      <div className="flex items-center justify-between p-2 px-4 bg-white border-t border-[rgba(226,232,240,0.8)]">
        <span className="text-[#718096] font-medium text-xs flex items-center gap-1.5">
          {category.courses_count}+ Courses
        </span>
        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#f7fafc] to-[#edf2f7] text-[#667eea] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden border-2 border-transparent">
          <ArrowRight
            size={16}
            className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-in-out"
          />
        </div>
      </div>
    </Link>
  );
}
