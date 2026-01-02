import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Promo } from "@/data/promos/schema";

export function PromoBanner({ promo }: { promo: Promo }) {
  const isBundle = promo.type === "bundle";
  const isPercent = promo.type === "percent";

  // Texto corto para la “pill”
  const pill = isBundle
    ? `PACK S/${promo.bundlePricePEN}`
    : `-${promo.discountPercent}%`;

  // Si no hay href (promo informativa), no hacemos Link
  const Wrapper = promo.href ? Link : ("div" as any);
  const wrapperProps = promo.href ? { href: promo.href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="block rounded-2xl border border-white/10 bg-white/5 p-5 shadow-card transition-cyborg hover:border-brand-500/40 hover:shadow-brand"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{isBundle ? "PROMO" : "DESCUENTO"}</Badge>
        <Badge variant="outline">{pill}</Badge>
      </div>

      <div className="mt-3 text-white/95 font-semibold">{promo.title}</div>
      {promo.subtitle ? (
        <div className="mt-1 text-sm text-white/70">{promo.subtitle}</div>
      ) : null}

      <div className="mt-3 text-xs text-white/60">
        Vigencia: {promo.activeFrom} → {promo.activeTo}
      </div>

      {promo.href ? (
        <div className="mt-4 text-sm font-semibold text-brand-100">
          Ver detalles →
        </div>
      ) : (
        <div className="mt-4 text-sm text-white/70">
          * Descuento automático al comprar desde la web.
        </div>
      )}
    </Wrapper>
  );
}
