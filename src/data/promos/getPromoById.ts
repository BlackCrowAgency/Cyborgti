import { getPromos } from "./getPromos";
import type { Promo } from "./schema";

export async function getPromoById(id: string): Promise<Promo | null> {
  const store = await getPromos();
  return store.items.find((p) => p.id === id) ?? null;
}
