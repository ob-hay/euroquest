"use client";
import { useCityCategoryDetails } from "@/services/hooks";
import CoursesList from "@/components/shared/courses-list";
import Container from "@/components/shared/container";
import CityCategorySearch from "./city-category-search";

interface CityCategorySectionProps {
  citySlug: string;
  categorySlug: string;
  searchParams: {
    keyword?: string;
  };
}

export default function CityCategorySection({
  citySlug,
  categorySlug,
  searchParams,
}: CityCategorySectionProps) {
  const { data: categoryData, isLoading } = useCityCategoryDetails(
    citySlug,
    categorySlug
  );

  const keyword = searchParams.keyword?.toLowerCase() || "";

  if (!categoryData) {
    return (
      <Container className="py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Category Not Found
        </h2>
        <p className="text-gray-600">
          The requested category could not be found in this city.
        </p>
      </Container>
    );
  }

  const { courses } = categoryData;

  // Client-side filtering based on search params
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
      <CityCategorySearch />

      {/* Courses List */}
      <CoursesList filteredCourses={filteredCourses} />
    </>
  );
}

