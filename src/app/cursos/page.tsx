import { getAllCourses } from "@/data/courses/getAll";
import { CourseGrid } from "@/components/course/CourseGrid";
import { getTopActivePromo } from "@/data/promos/getActivePromos";
import { applyPromoToCoursePrice } from "@/data/promos/applyPromo";

export default async function CursosPage() {
  const courses = getAllCourses();
  const topPromo = await getTopActivePromo(); // Promo | null

  const coursesWithPrice = courses.map((c) => ({
    ...c,
    // si tu CourseDTO no permite esto, NO lo pases y úsalo solo al renderizar
    promoPricePEN: applyPromoToCoursePrice(topPromo, c.slug, c.pricePEN),
  }));

  // Si tu CourseGrid no acepta promoPricePEN, entonces pásale courses normal y aplica price al render.
  return <CourseGrid courses={coursesWithPrice as any} />;
}
