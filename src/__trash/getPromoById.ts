import { getPromos } from "./getPromos";
import type { Promo } from "./schema";

export async function getPromoById(id: string): Promise<Promo | null> {
  const payload = await getPromos();

  console.log("[getPromoById] id:", id);
  console.log("[getPromoById] items length:", payload.items?.length);
  console.log("[getPromoById] ids:", payload.items?.map((p) => p.id));

  return payload.items.find((p) => p.id === id) ?? null;
}
