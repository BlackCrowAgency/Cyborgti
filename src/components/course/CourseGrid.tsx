import type { CourseDTO } from "@/data/courses/schema";
import { CourseCard } from "./CourseCard";

type PriceMap = Record<string, number>;

type Props = {
  courses: CourseDTO[];
  finalPrices?: PriceMap; // slug -> finalPrice
};

export function CourseGrid({ courses, finalPrices }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <CourseCard
          key={c.slug}
          course={c}
          finalPricePEN={finalPrices?.[c.slug]}
        />
      ))}
    </div>
  );
}
