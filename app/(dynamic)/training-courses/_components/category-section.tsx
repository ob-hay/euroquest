import CoursesList from "@/components/shared/courses-list";
import SearchInput from "@/components/shared/search-input";

interface CategorySectionProps {
  courses: Course[];
  searchParams: {
    keyword?: string;
  };
}

export default function CategorySection({
  courses,
  searchParams,
}: CategorySectionProps) {
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
      <CoursesList filteredCourses={filteredCourses} />
    </>
  );
}

