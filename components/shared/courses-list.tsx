import CourseCard from "@/components/cards/course";

interface CoursesListProps {
  filteredCourses: Course[];
  citySlug?: string;
}

export default function CoursesList({
  filteredCourses,
  citySlug,
}: CoursesListProps) {
  return (
    <section className="flex flex-col gap-4">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course: Course) => (
          <CourseCard key={course.slug} course={course} citySlug={citySlug} />
        ))
      ) : (
        <div>
          <p>No courses found matching your search criteria.</p>
        </div>
      )}
    </section>
  );
}
