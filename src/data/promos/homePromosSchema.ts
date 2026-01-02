import { z } from "zod";

export const homePromoItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().optional().default(""),
  image: z.string().min(1), // ruta dentro de /public
  href: z.string().optional().default("/promociones"),
});

export const homePromosSchema = z.object({
  top: z.array(homePromoItemSchema).max(2).default([]),
  featured: homePromoItemSchema,
});

export type HomePromos = z.infer<typeof homePromosSchema>;
export type HomePromoItem = z.infer<typeof homePromoItemSchema>;
