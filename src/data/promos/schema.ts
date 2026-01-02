import { z } from "zod";

const isoDate = z.string().refine((v) => !Number.isNaN(new Date(v).getTime()), {
  message: "Debe ser una fecha ISO válida (YYYY-MM-DD o ISO completo).",
});

const basePromo = {
  id: z.string().min(2),
  title: z.string().min(2),
  subtitle: z.string().optional(),
  image: z.string().min(2),
  href: z.string().optional(), // OJO: opcional (para promos informativas)
  activeFrom: isoDate,
  activeTo: isoDate,
};

export const PromoSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("bundle"),
    ...basePromo,
    href: z.string().min(2), // bundle SI debe tener página
    courses: z.array(z.string().min(2)).min(2),
    bundlePricePEN: z.number().int().positive(),
  }),
  z.object({
    type: z.literal("percent"),
    ...basePromo,
    discountPercent: z.number().min(1).max(100),
  }),
]);

export const promosSchema = z.array(PromoSchema);

export type Promo = z.infer<typeof PromoSchema>;
