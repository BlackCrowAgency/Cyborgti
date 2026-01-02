import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Promo } from "@/data/promos/schema";

export function PromoBanner({ promo }: { promo: Promo }) {
  const content = (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        {promo.badge ? <Badge variant="secondary">{promo.badge}</Badge> : null}
        <Badge variant="outline">
          {promo.type === "percent" ? `-${promo.discountPercent}%` : "Bundle"}
        </Badge>
      </div>

      <div className="mt-2 text-white/90 font-semibold">{promo.title}</div>
      {promo.subtitle ? <div className="mt-1 text-white/70 text-sm">{promo.subtitle}</div> : null}
    </div>
  );

  // Si href es null => informativo, no navega
  if (!promo.href) return content;

  return (
    <Link href={promo.href} className="block transition-cyborg hover:glow-brand-soft">
      {content}
    </Link>
  );
}
