import type { Promo } from "./schema";

/**
 * ¿La promo aplica a un curso?
 * - bundle: aplica si el slug está dentro de promo.courses
 * - percent: por ahora aplica a todos (descuento general)
 */
export function promoAppliesToCourse(promo: Promo, slug: string): boolean {
  if (promo.type === "bundle") {
    return promo.courses.includes(slug);
  }
  // percent (10% off general)
  return true;
}

/**
 * Calcula el precio final de un curso (si aplica promo percent).
 * - bundle NO modifica el precio unitario (se aplica como pack en carrito más adelante)
 * - percent: descuenta %
 */
export function applyPromoToCoursePrice(
  basePricePEN: number,
  promo: Promo | null,
  courseSlug?: string
): number {
  if (!promo) return basePricePEN;

  if (courseSlug && !promoAppliesToCourse(promo, courseSlug)) return basePricePEN;

  if (promo.type === "percent") {
    const pct = promo.discountPercent / 100;
    const discounted = basePricePEN * (1 - pct);
    // redondeo a 2 decimales
    return Math.round(discounted * 100) / 100;
  }

  // bundle: no altera precio unitario
  return basePricePEN;
}
