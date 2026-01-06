import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Promo } from "@/data/promos/schema";

export function PromoBanner({ promo }: { promo: Promo }) {
  const kindLabel =
    promo.type === "percent" ? `-${promo.discountPercent}%` : "Pack / Bundle";

  const content = (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        {promo.badge ? <Badge variant="secondary">{promo.badge}</Badge> : null}
        <Badge variant="outline">{kindLabel}</Badge>
      </div>

      <div className="mt-3 font-semibold text-white/95">{promo.title}</div>
      {promo.subtitle ? <div className="mt-1 text-white/70">{promo.subtitle}</div> : null}
    </div>
  );

  if (!promo.href) return content;

  return (
    <Link href={promo.href} className="block transition hover:opacity-95">
      {content}
    </Link>
  );
}
