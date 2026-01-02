import "server-only";
import { get } from "@vercel/edge-config";
import { unstable_noStore as noStore } from "next/cache";
import { homePromosSchema, type HomePromos } from "./homePromosSchema";

/**
 * Lee promos desde Vercel Edge Config (key: "homePromos")
 * - No requiere redeploy para cambios
 * - Validación con Zod
 */
export async function getHomePromos(): Promise<HomePromos> {
  // evita que Next cachee el resultado del RSC (queremos promos "vivas")
  noStore(); // soportado, aunque legacy. :contentReference[oaicite:3]{index=3}

  // Si no hay EDGE_CONFIG, devolvemos fallback seguro (para no romper dev)
  if (!process.env.EDGE_CONFIG) {
    return fallbackPromos();
  }

  try {
    const raw = await get("homePromos"); // SDK usa process.env.EDGE_CONFIG :contentReference[oaicite:4]{index=4}
    const parsed = homePromosSchema.safeParse(raw);

    if (!parsed.success) return fallbackPromos();

    // Garantiza máximo 2 arriba
    return {
      top: parsed.data.top.slice(0, 2),
      featured: parsed.data.featured,
    };
  } catch {
    return fallbackPromos();
  }
}

function fallbackPromos(): HomePromos {
  return {
    top: [
      {
        id: "promo-1",
        label: "VÁLIDO HASTA FEBRERO 15",
        image: "/images/promos/promo-1.jpg",
        href: "/promociones",
      },
      {
        id: "promo-2",
        label: "EXCLUSIVO PARA CLIENTES",
        image: "/images/promos/promo-2.jpg",
        href: "/promociones",
      },
    ],
    featured: {
      id: "promo-featured",
      label: "",
      image: "/images/promos/promo-featured.jpg",
      href: "/promociones",
    },
  };
}
