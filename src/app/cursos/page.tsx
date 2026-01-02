import { getAllCourses } from "@/data/courses/getAll";
import { CourseGrid } from "@/components/course/CourseGrid";
import { getTopActivePromo } from "@/data/promos/getActivePromos";
import { applyPromo, promoAppliesToCourse } from "@/data/promos/applyPromo";

export default async function CursosPage() {
  const courses = getAllCourses();
  const promo = await getTopActivePromo();

  const finalPrices = Object.fromEntries(
    courses.map((c) => {
      const eligible = promo && promoAppliesToCourse(promo, c.slug);
      const final = eligible ? applyPromo(c.pricePEN, promo) : c.pricePEN;
      return [c.slug, final];
    })
  );

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Cursos</h1>
        <p className="mt-2 text-muted-foreground">
          Catálogo de CyborgTI. (Luego aplicamos tu diseño de Figma)
        </p>
      </header>

      <CourseGrid courses={courses} finalPrices={finalPrices} />
    </main>
  );
}
