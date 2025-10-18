import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import CourseCode from "../shared/course-code";

interface CourseCardProps {
  course: Course;
  citySlug?: string;
}

export default function CourseCard({ course, citySlug }: CourseCardProps) {
  return (
    <Link
      href={`/training-course/${course.slug}${citySlug ? `/${citySlug}` : ""}`}
      className="w-full px-6 py-1 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_4px_20px_rgba(62,94,192,0.15)] rounded-lg cursor-pointer transition-all duration-300 hover:shadow-[4px_4px_40px_rgba(62,94,192,0.20)] hover:-translate-y-0.5 group"
    >
      {/* Course Left */}
      <div className="flex items-center justify-between gap-4 md:w-1/2 w-full">
        <h3 className="md:text-[15px] text-[13px] font-semibold text-[#3E5EC0] m-0">
          {course.title}
        </h3>

        {Number(course.duration) === 10 && (
          <span className="text-xs w-fit flex items-center px-2 py-1 gap-1 bg-gradient-to-br from-[#f7fafc] to-[#edf2f7] rounded-full text-[#3e5ec0] whitespace-nowrap font-semibold">
            <Clock size={12} className="mt-0.5" />2 Weeks
          </span>
        )}
      </div>

      {/* Course Actions */}
      <div className="flex items-center gap-4 justify-between">
        {/* Course Code */}
        <CourseCode code={course.code} />

        {/* Arrow Link */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f7fafc] to-[#edf2f7] text-[#667eea] flex items-center justify-center transition-all duration-300 border-2 border-transparent">
          <ArrowRight
            size={16}
            className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </Link>
  );
}
