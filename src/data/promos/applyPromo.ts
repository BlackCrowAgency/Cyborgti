import type { PromoDTO } from "./schema";

export function promoAppliesToCourse(promo: PromoDTO, slug: string) {
  if (!promo.courseSlugs || promo.courseSlugs.length === 0) return true;
  return promo.courseSlugs.includes(slug);
}

export function applyPromo(price: number, promo: PromoDTO | null) {
  if (!promo) return price;

  if (promo.type === "fixed") {
    return Math.max(0, Math.round(promo.value));
  }

  const discounted = price * (1 - promo.value / 100);
  return Math.max(0, Math.round(discounted));
}
