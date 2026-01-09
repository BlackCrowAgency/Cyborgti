"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatPEN } from "@/lib/money";
import { useCartStore } from "@/features/cart/store";
import type { Promo } from "@/data/promos/schema";
import { computeCheckoutTotals } from "@/data/promos/applyPromo";

type Props = {
  basePriceBySlug: Record<string, number>;
  titleBySlug: Record<string, string>;
  promos: Promo[];
};

export function CheckoutClient({ basePriceBySlug, titleBySlug, promos }: Props) {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const [fullName, setFullName] = useState("");
  const [netAcadEmail, setNetAcadEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");

  const totals = useMemo(() => {
    return computeCheckoutTotals({
      items,
      basePriceBySlug,
      titleBySlug,
      promos,
    });
  }, [items, basePriceBySlug, titleBySlug, promos]);

  const isEmailValid = netAcadEmail.trim().includes("@") && netAcadEmail.trim().includes(".");
  const digits = whatsApp.replace(/\D/g, "");
  const isWhatsAppValid = digits.length >= 8; // simple y flexible
  const canContinue = fullName.trim().length >= 3 && isEmailValid && isWhatsAppValid;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-white/5 p-8 shadow-card">
        <p className="text-white/80">Tu carrito está vacío.</p>
        <div className="mt-4">
          <Link href="/cursos">
            <Button className="bg-brand-500 hover:bg-brand-500/90">Explorar cursos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Resumen */}
      <div className="rounded-2xl border border-border/60 bg-white/5 p-6 shadow-card">
        <h2 className="text-lg font-semibold text-white/95">Resumen</h2>

        <div className="mt-4 space-y-3">
          {totals.lines.map((l) => {
            if (l.kind === "bundle") {
              return (
                <div key={`bundle-${l.promoId}`} className="border-b border-border/40 pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white/90 font-semibold">{l.title}</div>
                      <div className="text-sm text-white/60">
                        Incluye: {l.includes.join(" + ")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/90">{formatPEN(l.unitPricePEN)}</div>
                      <div className="text-sm text-white/60">{formatPEN(l.lineTotalPEN)}</div>
                    </div>
                  </div>
                </div>
              );
            }

            const hasDiscount = l.unitPricePEN < l.baseUnitPricePEN;

            return (
              <div
                key={l.slug}
                className="flex items-start justify-between gap-4 border-b border-border/40 pb-3"
              >
                <div>
                  <div className="text-white/90">{l.title}</div>
                  <div className="text-sm text-white/60">Cantidad: {l.qty}</div>
                </div>

                <div className="text-right">
                  {hasDiscount ? (
                    <>
                      <div className="text-xs text-white/50 line-through">
                        {formatPEN(l.baseUnitPricePEN)}
                      </div>
                      <div className="text-white/90">{formatPEN(l.unitPricePEN)}</div>
                    </>
                  ) : (
                    <div className="text-white/90">{formatPEN(l.unitPricePEN)}</div>
                  )}
                  <div className="text-sm text-white/60">{formatPEN(l.lineTotalPEN)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Subtotal</span>
            <span className="text-white/95 font-semibold">{formatPEN(totals.subtotalPEN)}</span>
          </div>

          {totals.discounts.length ? (
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white/90">Descuentos</div>
              <div className="mt-2 space-y-1">
                {totals.discounts.map((d) => (
                  <div key={d.label} className="flex items-center justify-between text-sm">
                    <span className="text-white/70">{d.label}</span>
                    <span className="text-white/90">- {formatPEN(d.amountPEN)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between pt-2">
            <span className="text-white/80">Total</span>
            <span className="text-white font-semibold text-lg">{formatPEN(totals.totalPEN)}</span>
          </div>
        </div>
      </div>

      {/* Datos */}
      <aside className="rounded-2xl border border-border/60 bg-white/5 p-6 shadow-card">
        <h2 className="text-lg font-semibold text-white/95">Datos para activar tu acceso</h2>

        <p className="mt-2 text-sm text-white/70">
          Necesitamos tu nombre, tu correo Cisco NetAcad y tu WhatsApp (para enviarte el link de
          clases grabadas).
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-white/60">
              Nombres completos
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-brand-500/50"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-white/60">
              Correo Cisco NetAcad
            </label>
            <input
              value={netAcadEmail}
              onChange={(e) => setNetAcadEmail(e.target.value)}
              placeholder="Ej: tucorreo@dominio.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-brand-500/50"
            />
            <p className="mt-2 text-xs text-white/45">
              * Debe ser el correo con el que accedes a NetAcad.
            </p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-white/60">
              WhatsApp
            </label>
            <input
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
              placeholder="Ej: +51 999 999 999"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-brand-500/50"
            />
            <p className="mt-2 text-xs text-white/45">
              * Enviaremos por WhatsApp el link de clases grabadas.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-sm font-semibold text-white/90">Pago</div>
          <p className="mt-2 text-sm text-white/70">
            Mercado Pago se conectará en la siguiente etapa. Por ahora, este checkout es demo.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full bg-brand-500 hover:bg-brand-500/90 disabled:opacity-50"
            disabled={!canContinue}
            title={!canContinue ? "Completa tus datos para continuar" : "Continuar"}
          >
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

        {!canContinue ? (
          <p className="mt-3 text-xs text-white/45">
            Completa nombre, correo válido y WhatsApp para continuar.
          </p>
        ) : null}
      </aside>
    </section>
  );
}
