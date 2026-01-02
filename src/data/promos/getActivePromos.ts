import { getPromos } from "./getPromos";
import type { Promo } from "./schema";

function toTime(dateStr: string): number {
  const t = new Date(dateStr).getTime();
  return Number.isFinite(t) ? t : 0;
}

export async function getActivePromos(now = new Date()): Promise<Promo[]> {
  const store = await getPromos();
  const nowT = now.getTime();

  return store.items
    .filter((p) => {
      const from = toTime(p.activeFrom);
      const to = toTime(p.activeTo);
      return from <= nowT && nowT <= to;
    })
    .sort((a, b) => toTime(b.activeFrom) - toTime(a.activeFrom));
}

export async function getTopActivePromo(): Promise<Promo | null> {
  const actives = await getActivePromos();
  return actives[0] ?? null;
}
