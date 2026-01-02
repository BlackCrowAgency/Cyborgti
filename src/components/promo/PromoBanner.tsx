import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PromoDTO } from "@/data/promos/schema";

export function PromoBanner({ promo }: { promo: PromoDTO }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {promo.badge && <Badge variant="secondary">{promo.badge}</Badge>}
        <Badge variant="outline">
          {promo.type === "percent" ? `-${promo.value}%` : `Precio promo`}
        </Badge>
      </div>

      <div className="mt-2 text-lg font-medium">{promo.title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{promo.description}</p>

      <div className="mt-3">
        <Link href="/promociones" className="text-sm underline underline-offset-4">
          Ver promociones
        </Link>
      </div>
    </div>
  );
}
