import { cache } from "react";
import { getPromos } from "./getPromos";
import type { Promo } from "./schema";

function isActive(p: Promo, now: Date) {
  const from = new Date(p.activeFrom);
  const to = new Date(p.activeTo);
  return now >= from && now <= to;
}

export const getActivePromos = cache(async (now: Date = new Date()): Promise<Promo[]> => {
  const promos = await getPromos();
  return promos
    .filter((p) => isActive(p, now))
    .sort((a, b) => +new Date(a.activeFrom) - +new Date(b.activeFrom));
});

export const getTopActivePromo = cache(async (now: Date = new Date()): Promise<Promo | null> => {
  const active = await getActivePromos(now);
  return active[0] ?? null;
});
