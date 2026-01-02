"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store";
import { hydrateCartItems, calcSubtotal } from "@/features/cart/selectors";
import { formatPEN } from "@/lib/money";
import { getAllCourses } from "@/data/courses/getAll";

export function CartClient() {
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  // cursos (estático) → lo usamos para hidratar slugs del carrito
  const courses = useMemo(() => getAllCourses(), []);
  const hydrated = useMemo(() => hydrateCartItems(items, courses), [items, courses]);
  const subtotal = useMemo(() => calcSubtotal(hydrated), [hydrated]);

  if (hydrated.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold text-white">Carrito</h1>
        <p className="mt-2 text-white/70">Tu carrito está vacío.</p>

        <div className="mt-6">
          <Link href="/cursos">
            <Button className="bg-brand-500 shadow-brand hover:glow-brand-soft">
              Ver cursos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Lista */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-white">Carrito</h1>
          <button
            onClick={clear}
            className="text-sm text-white/60 hover:text-white transition-cyborg"
          >
            Vaciar
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {hydrated.map(({ course, qty }) => (
            <div
              key={course.slug}
              className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="text-sm font-semibold tracking-[0.08em] uppercase text-white/90">
                  {course.title}
                </div>
                <div className="mt-1 text-sm text-white/60">
                  {formatPEN(course.pricePEN)} c/u
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 md:justify-end">
                <div className="flex items-center gap-2">
                  <button
                    className="h-10 w-10 rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-cyborg"
                    onClick={() => setQty(course.slug, qty - 1)}
                    aria-label="Disminuir"
                  >
                    −
                  </button>
                  <div className="min-w-10 text-center text-white">{qty}</div>
                  <button
                    className="h-10 w-10 rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-cyborg"
                    onClick={() => setQty(course.slug, qty + 1)}
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                </div>

                <div className="w-28 text-right text-sm font-semibold text-white">
                  {formatPEN(course.pricePEN * qty)}
                </div>

                <button
                  className="text-sm text-white/60 hover:text-white transition-cyborg"
                  onClick={() => removeItem(course.slug)}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen */}
      <aside className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Resumen</h2>

        <div className="mt-4 flex items-center justify-between text-sm text-white/80">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatPEN(subtotal)}</span>
        </div>

        <p className="mt-3 text-xs text-white/60">
          * El pago (Mercado Pago) se conecta en una etapa posterior.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link href="/checkout">
            <Button className="bg-brand-500 shadow-brand hover:glow-brand-soft w-full">
              Continuar al checkout
            </Button>
          </Link>
          <Link href="/cursos">
            <Button variant="outline" className="w-full">
              Seguir comprando
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
