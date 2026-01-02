import type { Promo } from "./schema";

export function promoAppliesToCourse(promo: Promo | null | undefined, slug: string) {
  if (!promo) return false;

  if (promo.type === "bundle") {
    return promo.courses.includes(slug);
  }

  // percent
  if (!promo.courseSlugs || promo.courseSlugs.length === 0) return true;
  return promo.courseSlugs.includes(slug);
}

/**
 * Aplica descuento a un precio.
 * - percent => aplica % si corresponde
 * - bundle => NO cambia el precio individual (se vende como pack)
 */
export function applyPromoToCoursePrice(
  promo: Promo | null | undefined,
  slug: string,
  basePricePEN: number
) {
  if (!promo) return basePricePEN;

  if (promo.type === "percent") {
    if (!promoAppliesToCourse(promo, slug)) return basePricePEN;
    const discounted = basePricePEN * (1 - promo.discountPercent / 100);
    // 2 decimales
    return Math.round(discounted * 100) / 100;
  }

  return basePricePEN;
}
