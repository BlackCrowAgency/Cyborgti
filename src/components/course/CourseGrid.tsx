import type { Course } from "@/types/course";
import type { getActivePromos } from "@/data/promos/getActivePromos";
import { CourseCard } from "./CourseCard";

type ActivePromos = Awaited<ReturnType<typeof getActivePromos>>;

type Props = {
  courses: Course[];
  promos: ActivePromos;
};

export function CourseGrid({ courses, promos }: Props) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} promos={promos} />
      ))}
    </div>
  );
}
