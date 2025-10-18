import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

interface UpcomingCourseCardProps {
  course: UpcomingCourse;
}

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function UpcommingCourseCard({
  course,
}: UpcomingCourseCardProps) {
  const router = useRouter();

  return (
    <Link
      className="course-slide px-2"
      href={`/training-course/${course.course_slug}/${course.city_slug}`}
    >
      <div className="course-card block group cursor-pointer">
        <div>
          {/* Course Image */}
          <div className="course-image relative h-48 overflow-hidden">
            <img
              src={course.course_image}
              alt={course.course_image_alt || course.course_title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          </div>

          {/* Course Content */}
          <div className="course-content p-4">
            <h3 className="course-title text-sm font-bold text-[#2B2B2B] mb-3 group-hover:text-[#3E5EC0] transition-colors duration-300 line-clamp-2">
              {course.course_title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <MapPin size={16} className="text-[#3E5EC0]" />
              </div>
              <span className="text-[#3E5EC0] text-sm font-medium">
                {course.city_title}
              </span>
            </div>
          </div>

          {/* Course Footer */}
          <div className="course-footer p-4 pt-0">
            <div className="date-info flex items-center justify-between">
              <div className="flex-1">
                {/* Start Date */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Calendar size={14} className="text-[#3E5EC0]" />
                  </div>
                  <span className="text-sm text-[#2B2B2B] flex items-center gap-2">
                    <b className="font-semibold">Start Date:</b>
                    <p className="text-xs">{formatDate(course.start_date)}</p>
                  </span>
                </div>

                {/* End Date */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Calendar size={14} className="text-[#3E5EC0]" />
                  </div>
                  <span className="text-sm text-[#2B2B2B] flex items-center gap-2">
                    <b className="font-semibold">End Date:</b>
                    <p className="text-xs">{formatDate(course.end_date)}</p>
                  </span>
                </div>
              </div>

              {/* Arrow Button */}
              <div
                className="arrow-link w-8 h-8 bg-[#3E5EC0] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#2B4A9E] group-hover:scale-110"
                aria-label={`View course details for ${course.course_title}`}
              >
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
