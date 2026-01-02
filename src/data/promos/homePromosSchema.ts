import { z } from "zod";

const HomePromoItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  image: z.string(),
  href: z.string().optional(), // <- opcional (para la promo informativa 10%)
});

const HomeFeaturedSchema = z.object({
  id: z.string(),
  label: z.string().optional().default(""),
  image: z.string(),
  href: z.string().optional(),
});

export const homePromosSchema = z
  .object({
    top: z.array(HomePromoItemSchema).default([]),
    featured: HomeFeaturedSchema.optional(),
  })
  .passthrough(); // <- permite "promos": [...] sin romper el parse

export type HomePromos = z.infer<typeof homePromosSchema>;
