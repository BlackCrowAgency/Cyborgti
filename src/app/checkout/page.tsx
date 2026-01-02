import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { getAllCourses } from "@/data/courses/getAll";

export default function CheckoutPage() {
  const courses = getAllCourses();

  const priceBySlug = Object.fromEntries(
    courses.map((c) => [c.slug, c.pricePEN])
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <h1 className="h2">Checkout</h1>
        <p className="muted mt-2">
          Revisión final antes de pagar. (Mercado Pago se integra luego)
        </p>
      </header>

      <CheckoutClient courses={courses} priceBySlug={priceBySlug} />
    </main>
  );
}
