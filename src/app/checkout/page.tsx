import { getAllCourses } from "@/data/courses/getAll";
import { getTopActivePromo } from "@/data/promos/getActivePromos";
import { applyPromo, promoAppliesToCourse } from "@/data/promos/applyPromo";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export default async function CheckoutPage() {
  const courses = getAllCourses();
  const promo = await getTopActivePromo();

  const priceBySlug = Object.fromEntries(
    courses.map((c) => {
      const eligible = promo && promoAppliesToCourse(promo, c.slug);
      const final = eligible ? applyPromo(c.pricePEN, promo) : c.pricePEN;
      return [c.slug, final];
    })
  );

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-muted-foreground">
          Completa tus datos. Luego conectamos Mercado Pago.
        </p>
      </header>

      <CheckoutClient courses={courses} priceBySlug={priceBySlug} />
    </main>
  );
}
