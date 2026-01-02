"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { formatPEN } from "@/lib/money";
import { useCartStore } from "@/features/cart/store";
import type { CourseDTO } from "@/data/courses/schema";

type Props = {
  courses: CourseDTO[];
  priceBySlug: Record<string, number>;
};

type HydratedItem = {
  slug: string;
  qty: number;
  title: string;
  unitPricePEN: number;
};

export function CheckoutClient({ courses, priceBySlug }: Props) {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  // Mapa rápido para buscar cursos por slug
  const courseBySlug = useMemo(() => {
    return Object.fromEntries(courses.map((c) => [c.slug, c]));
  }, [courses]);

  // “Hydratamos” items del carrito con data del curso
  const hydrated: HydratedItem[] = useMemo(() => {
    return items
      .map((i) => {
        const c = courseBySlug[i.slug];
        if (!c) return null;

        const unitPrice =
          priceBySlug[i.slug] ?? c.pricePEN ?? 0;

        return {
          slug: i.slug,
          qty: i.qty,
          title: c.title,
          unitPricePEN: unitPrice,
        };
      })
      .filter(Boolean) as HydratedItem[];
  }, [items, courseBySlug, priceBySlug]);

  const subtotal = useMemo(() => {
    return hydrated.reduce((acc, it) => acc + it.unitPricePEN * it.qty, 0);
  }, [hydrated]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-white/5 p-8 shadow-card">
        <p className="text-white/80">Tu carrito está vacío.</p>
        <div className="mt-4">
          <Link href="/cursos">
            <Button className="bg-brand-500 hover:bg-brand-500/90">
              Explorar cursos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border/60 bg-white/5 p-6 shadow-card">
        <h2 className="text-lg font-semibold text-white/95">Resumen</h2>

        <div className="mt-4 space-y-3">
          {hydrated.map((it) => (
            <div
              key={it.slug}
              className="flex items-start justify-between gap-4 border-b border-border/40 pb-3"
            >
              <div>
                <div className="text-white/90">{it.title}</div>
                <div className="text-sm text-white/60">Cantidad: {it.qty}</div>
              </div>

              <div className="text-right">
                <div className="text-white/90">{formatPEN(it.unitPricePEN)}</div>
                <div className="text-sm text-white/60">
                  {formatPEN(it.unitPricePEN * it.qty)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-white/70">Subtotal</span>
          <span className="text-white/95 font-semibold">{formatPEN(subtotal)}</span>
        </div>
      </div>

      <aside className="rounded-2xl border border-border/60 bg-white/5 p-6 shadow-card">
        <h2 className="text-lg font-semibold text-white/95">Pago</h2>

        <p className="mt-2 text-sm text-white/70">
          Mercado Pago se conectará en la siguiente etapa. Por ahora esto es un checkout demo.
        </p>

        <div className="mt-6 space-y-3">
          <Button className="w-full bg-brand-500 hover:bg-brand-500/90">
            Continuar (Demo)
          </Button>

          <Button
            variant="outline"
            className="w-full border-brand-500/40 text-white hover:bg-brand-500/10"
            onClick={clear}
          >
            Vaciar carrito
          </Button>

          <Link href="/carrito" className="block">
            <Button
              variant="outline"
              className="w-full border-white/15 text-white/90 hover:bg-white/5"
            >
              Volver al carrito
            </Button>
          </Link>
        </div>
      </aside>
    </section>
  );
}
