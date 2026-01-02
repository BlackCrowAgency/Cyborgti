import { getAllCourses } from "@/data/courses/getAll";
import { CourseGrid } from "@/components/course/CourseGrid";
import { getTopActivePromo } from "@/data/promos/getActivePromos";
import { applyPromoToCoursePrice, promoAppliesToCourse } from "@/data/promos/applyPromo";

export default async function CursosPage() {
  const courses = getAllCourses();

  // Tomamos 1 promo activa “principal” (por ahora)
  const promo = await getTopActivePromo();

  const coursesWithPricing = courses.map((c) => {
    const inPromo = promo ? promoAppliesToCourse(promo, c.slug) : false;

    const finalPricePEN = applyPromoToCoursePrice(
      c.pricePEN,
      promo,
      c.slug
    );

    return {
      ...c,
      promo: promo && inPromo ? promo : null,
      finalPricePEN,
    };
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <h1 className="h2">Cursos</h1>
        <p className="muted mt-2">
          Elige tu especialidad y empieza hoy.
        </p>
      </header>

      <CourseGrid courses={coursesWithPricing as any} />
    </main>
  );
}
