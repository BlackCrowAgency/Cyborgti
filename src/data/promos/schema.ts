import { z } from "zod";

export const PromoSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),

  startDate: z.string().min(10),
  endDate: z.string().min(10),

  type: z.enum(["percent", "fixed"]),
  value: z.number().nonnegative(),

  courseSlugs: z.array(z.string()).optional(),
  badge: z.string().optional(),

  active: z.boolean().optional().default(true),
  priority: z.number().optional().default(0),
});

export const PromoListSchema = z.array(PromoSchema);

export type PromoDTO = z.infer<typeof PromoSchema>;
