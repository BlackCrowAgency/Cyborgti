import { PromoStoreSchema, type PromoStore } from "./schema";
import { readPublicJson } from "@/lib/readPublicJson";

/**
 * Lee promos desde:
 * - Producción (Vercel): Edge Config key "promos"
 * - Local/dev: /public/content/promos.json
 */
export async function getPromos(): Promise<PromoStore> {
  // 1) Intentar Edge Config si existe EDGE_CONFIG (Vercel lo inyecta al conectar el store)
  if (process.env.EDGE_CONFIG) {
    try {
      const { get } = await import("@vercel/edge-config");
      const raw = await get("promos");
      if (raw) {
        return PromoStoreSchema.parse(raw);
      }
    } catch {
      // si falla Edge Config, caemos al fallback local
    }
  }

  // 2) Fallback local (public/content/promos.json)
  try {
    const raw = await readPublicJson<unknown>("/content/promos.json");
    return PromoStoreSchema.parse({ home: raw, items: [] });
  } catch {
    // 3) Fallback final vacío
    return PromoStoreSchema.parse({ home: { top: [], featured: undefined }, items: [] });
  }
}
