import { z } from "zod";

/** Card usada en home (2 arriba + 1 portada) */
export const HomePromoCardSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  image: z.string(),
  /** null => tarjeta informativa (no navega) */
  href: z.string().nullable(),
});

export const HomePromosSchema = z.object({
  top: z.array(HomePromoCardSchema).default([]),
  featured: HomePromoCardSchema.optional(),
});

/** Promo tipo bundle (2x1, pack, etc.) */
export const BundlePromoSchema = z.object({
  id: z.string(),
  type: z.literal("bundle"),
  title: z.string(),
  subtitle: z.string().optional(),
  badge: z.string().optional(),
  image: z.string(),

  /** href puede ser null si fuera informativa (por ahora para bundle normalmente viene con ruta) */
  href: z.string().nullable(),

  activeFrom: z.string(), // ISO date string
  activeTo: z.string(), // ISO date string

  courses: z.array(z.string()).default([]), // slugs de cursos involucrados
  bundlePricePEN: z.number(),
});

/** Promo tipo percent (descuento %) */
export const PercentPromoSchema = z.object({
  id: z.string(),
  type: z.literal("percent"),
  title: z.string(),
  subtitle: z.string().optional(),
  badge: z.string().optional(),
  image: z.string(),

  /** Puede ser null si es solo informativa */
  href: z.string().nullable(),

  activeFrom: z.string(),
  activeTo: z.string(),

  discountPercent: z.number().min(1).max(90),

  /**
   * Si viene vacío => aplica a todos los cursos
   * Si viene con slugs => solo a esos
   */
  courseSlugs: z.array(z.string()).optional(),
});

export const PromoSchema = z.discriminatedUnion("type", [
  BundlePromoSchema,
  PercentPromoSchema,
]);

/** Store completo: lo que guardas en Edge Config en la key "promos" */
export const PromoStoreSchema = z.object({
  home: z
    .object({
      top: z.array(HomePromoCardSchema).default([]),
      featured: HomePromoCardSchema.optional(),
    })
    .default({ top: [], featured: undefined }),
  items: z.array(PromoSchema).default([]),
});

export type HomePromoCard = z.infer<typeof HomePromoCardSchema>;
export type HomePromos = z.infer<typeof HomePromosSchema>;
export type Promo = z.infer<typeof PromoSchema>;
export type PromoStore = z.infer<typeof PromoStoreSchema>;

/**
 * Compatibilidad con imports antiguos que tenías (PromoDTO, etc.)
 * Si ya no lo usas, igual no estorba.
 */
export type PromoDTO = Promo;
