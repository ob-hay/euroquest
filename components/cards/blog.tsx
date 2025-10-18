import { Eye } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export default function BlogCard({ blog, className = "" }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <div className={`swiper-slide flex-shrink-0 ${className}`}>
      <Link
        className="w-full h-auto bg-white overflow-hidden transition-all duration-300 ease-in-out p-3 shadow-[4px_4px_40px_0_rgba(62,94,192,0.1)] rounded-xl cursor-pointer hover:shadow-[4px_4px_20px_0_rgba(62,94,192,0.27)] block"
        href={`/blog/${blog.slug}`}
      >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[170px] md:h-[170px] sm:h-[150px] xs:h-[140px] object-cover rounded-md"
      />

      <div className="py-2 border-b border-gray-200">
        <p className="text-sm leading-6">
          <span className="font-medium leading-6 mb-2 text-[#3E5EC0] text-base md:text-base sm:text-sm h-12 md:h-12 sm:h-[42px] overflow-hidden line-clamp-2 block">
            {blog.title}
          </span>
        </p>
      </div>

      <div className="flex pt-2 justify-between items-center bg-white border-t border-gray-200">
        <p className="text-gray-900 text-sm">{formatDate(blog.created_at)}</p>
        <div className="flex items-center gap-4">
          <div className="text-xs flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{blog.number_of_views || 0}</span>
          </div>
          <button
            type="button"
            className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-gray-50 to-gray-100 text-[#667eea] flex items-center justify-center no-underline transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden border-2 border-transparent hover:border-[#667eea] hover:scale-105"
          >
            <svg
              className="w-4 h-4 -rotate-45 transition-transform duration-500 ease-in-out"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      </Link>
    </div>
  );
}
