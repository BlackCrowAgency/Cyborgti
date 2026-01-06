import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/types/course";
import type { getActivePromos } from "@/data/promos/getActivePromos";

import { formatPEN } from "@/lib/money";
import { AddIconToCart } from "@/components/course/AddIconToCart";
import { getDisplayPriceForCourse } from "@/data/promos/applyPromo";

type ActivePromos = Awaited<ReturnType<typeof getActivePromos>>;

type Props = {
  course: Course;
  promos: ActivePromos;
};

function pickCover(course: any) {
  return course.cover || course.image || "/images/course-placeholder.jpg";
}

export function CourseCard({ course, promos }: Props) {
  // ✅ firma real en tu proyecto
  const display: any = getDisplayPriceForCourse(promos, course.slug, course.pricePEN);

  const finalPEN =
    display?.finalPEN ??
    display?.finalPricePEN ??
    display?.pricePEN ??
    course.pricePEN;

  const basePEN =
    display?.basePEN ??
    display?.oldPEN ??
    display?.oldPricePEN ??
    display?.originalPEN ??
    display?.originalPricePEN ??
    null;

  const badge = display?.badge ?? null;
  const hasDiscount = typeof basePEN === "number" && basePEN > finalPEN;

  const cover = pickCover(course);

  return (
    <div className="group relative">
      <Link
        href={`/cursos/${course.slug}`}
        className="block rounded-2xl bg-white/3 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/5 hover:ring-white/20"
      >
        <div className="relative overflow-hidden rounded-2xl">
          {/* borde glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-indigo-500/25 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative aspect-4/5 w-full">
            <Image
              src={cover}
              alt={course.title}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/5" />
          </div>

          {/* badge promo */}
          {badge ? (
            <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[11px] text-white ring-1 ring-white/15 backdrop-blur">
              {badge}
            </div>
          ) : null}

          {/* botón carrito */}
          <div className="absolute bottom-4 right-4 z-10">
            <AddIconToCart slug={course.slug} />
          </div>
        </div>

        {/* info abajo */}
        <div className="px-1 pt-4 pb-2">
          <h3 className="truncate text-base font-semibold tracking-tight">{course.title}</h3>

          <div className="mt-1 flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-sm text-muted-foreground line-through">{formatPEN(basePEN)}</span>
                <span className="text-sm font-semibold">{formatPEN(finalPEN)}</span>
              </>
            ) : (
              <span className="text-sm font-semibold">{formatPEN(finalPEN)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
