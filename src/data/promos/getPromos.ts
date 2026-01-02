import { cache } from "react";
import { readPublicJson } from "@/lib/readPublicJson";
import { promosSchema, type Promo } from "./schema";

type PromosFile = {
  promos?: unknown;
};

export const getPromos = cache(async (): Promise<Promo[]> => {
  const raw = await readPublicJson<PromosFile>("content/promos.json");
  return promosSchema.parse(raw.promos ?? []);
});
