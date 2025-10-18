import Container from "@/components/shared/container";
import SectionTitle from "../../../components/shared/section-title";
import UpcomingCoursesSlider from "./upcoming-courses-slider";
import { getUpcomingCourses } from "@/services/services";

export default async function UpcomingCoursesSection() {
  const upcomingCourses = await getUpcomingCourses();

  return (
    <section className="courses-section bg-white py-14 relative">
      {/* Background Shape */}
      <img
        src="/assets/images/categories-shape.svg"
        alt=""
        className="categories-shape absolute left-[-100px] top-0 w-[250px] h-[250px]"
      />

      <Container>
        <div className="md:mb-10 mb-8">
          {/* Section Header */}
          <SectionTitle
            title="Upcoming"
            highlight="Courses"
            description="Upcoming Training Courses to develop skills and improve performance"
          />
        </div>

        {/* Courses Slider */}
        <UpcomingCoursesSlider upcomingCourses={upcomingCourses} />
      </Container>
    </section>
  );
}
