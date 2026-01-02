import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseDTO } from "@/data/courses/schema";
import { formatPEN } from "@/lib/money";

type Props = {
  course: CourseDTO;
  finalPricePEN?: number; // precio con promo
};

export function CourseCard({ course, finalPricePEN }: Props) {
  const hasDiscount = typeof finalPricePEN === "number" && finalPricePEN !== course.pricePEN;

  return (
    <Link href={`/cursos/${course.slug}`} className="block">
      <Card className="transition hover:bg-muted/40">
        <CardHeader className="space-y-2">
          <CardTitle className="text-base">{course.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{course.shortDescription}</p>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {course.level} • {course.durationWeeks} sem
          </span>

          <div className="text-right">
            {hasDiscount ? (
              <>
                <div className="text-xs text-muted-foreground line-through">
                  {formatPEN(course.pricePEN)}
                </div>
                <div className="text-sm font-medium">{formatPEN(finalPricePEN!)}</div>
              </>
            ) : (
              <span className="text-sm font-medium">{formatPEN(course.pricePEN)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
