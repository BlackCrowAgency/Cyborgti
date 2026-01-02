import { cache } from "react";
import { readPublicJson } from "@/lib/readPublicJson";
import { homePromosSchema, type HomePromos } from "./homePromosSchema";

export const getHomePromos = cache(async (): Promise<HomePromos> => {
  const raw = await readPublicJson<unknown>("content/promos.json");
  return homePromosSchema.parse(raw);
});
