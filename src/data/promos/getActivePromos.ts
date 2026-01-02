import { getPromos } from "./getPromos";
import type { PromoDTO } from "./schema";

function isActiveNow(p: PromoDTO, now = new Date()) {
  const t = now.getTime();
  const s = new Date(p.startDate).getTime();
  const e = new Date(p.endDate).getTime();
  return t >= s && t <= e;
}

export async function getActivePromos(now = new Date()) {
  const promos = await getPromos();
  return promos.filter((p) => isActiveNow(p, now));
}

export async function getTopActivePromo(now = new Date()) {
  const active = await getActivePromos(now);
  return active[0] ?? null;
}
