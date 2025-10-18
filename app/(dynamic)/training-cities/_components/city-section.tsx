import CoursesList from "@/components/shared/courses-list";
import SearchInput from "@/components/shared/search-input";

interface CitySectionProps {
  courses: Course[];
  citySlug: string;
  searchParams: {
    keyword?: string;
  };
}

export default function CitySection({
  courses,
  citySlug,
  searchParams,
}: CitySectionProps) {
  
  const keyword = searchParams.keyword?.toLowerCase() || "";

  // Server-side filtering based on search params
  const filteredCourses = keyword
    ? courses.filter(
        (course) =>
          course.title.toLowerCase().includes(keyword) ||
          course.code.toLowerCase().includes(keyword)
      )
    : courses;

  return (
    <>
      {/* Course Search - Client Component */}
      <SearchInput placeholder="Search for Course" />

      {/* Courses List */}
      <CoursesList filteredCourses={filteredCourses} citySlug={citySlug} />
    </>
  );
}

