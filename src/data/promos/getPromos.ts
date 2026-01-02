import { PromoListSchema, type PromoDTO } from "./schema";

const PROMOS_LOCAL_URL = "/content/promos.json";

export async function getPromos(): Promise<PromoDTO[]> {
  // En server components, fetch a /public funciona usando URL absoluta.
  // Para evitar líos, construimos la URL con el host en runtime si existe.
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const url = `${base}${PROMOS_LOCAL_URL}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // refresca cada 60s
  });

  if (!res.ok) return [];

  const json = await res.json();
  const parsed = PromoListSchema.safeParse(json);

  if (!parsed.success) {
    console.error("Promos JSON inválido:", parsed.error.flatten());
    return [];
  }

  return parsed.data
    .filter((p) => p.active !== false)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
