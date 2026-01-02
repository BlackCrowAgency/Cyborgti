"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store";
import { hydrateCartItems, calcSubtotal } from "@/features/cart/selectors";
import { getAllCourses } from "@/data/courses/getAll";
import { formatPEN } from "@/lib/money";

export function CheckoutClient() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const courses = useMemo(() => getAllCourses(), []);
  const hydrated = useMemo(() => hydrateCartItems(items, courses), [items, courses]);
  const subtotal = useMemo(() => calcSubtotal(hydrated), [hydrated]);

  if (hydrated.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold text-white">Checkout</h1>
        <p className="mt-2 text-white/70">No tienes cursos en tu carrito.</p>

        <div className="mt-6 flex gap-2">
          <Link href="/cursos">
            <Button className="bg-brand-500 shadow-brand hover:glow-brand-soft">
              Ver cursos
            </Button>
          </Link>
          <Link href="/carrito">
            <Button variant="outline">Ir al carrito</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold text-white">Checkout</h1>
        <p className="mt-2 text-white/70">
          Esta es una base estática. La pasarela (Mercado Pago) se integra después.
        </p>

        <div className="mt-6 space-y-3">
          {hydrated.map(({ course, qty }) => (
            <div
              key={course.slug}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3"
            >
              <div>
                <div className="text-sm font-semibold text-white/90">{course.title}</div>
                <div className="text-xs text-white/60">
                  {qty} × {formatPEN(course.pricePEN)}
                </div>
              </div>
              <div className="text-sm font-semibold text-white">
                {formatPEN(course.pricePEN * qty)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <Link href="/carrito">
            <Button variant="outline">Volver al carrito</Button>
          </Link>
          <Button
            onClick={clear}
            className="bg-brand-500 shadow-brand hover:glow-brand-soft"
          >
            Simular pago (luego MP)
          </Button>
        </div>
      </div>

      <aside className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Resumen</h2>

        <div className="mt-4 flex items-center justify-between text-sm text-white/80">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatPEN(subtotal)}</span>
        </div>

        <p className="mt-3 text-xs text-white/60">
          * Aquí luego conectamos Mercado Pago con tus precios/promos ya listos.
        </p>
      </aside>
    </div>
  );
}
