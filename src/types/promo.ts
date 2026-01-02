export type PromoType = "percent" | "fixed";

export type Promo = {
  id: string;
  title: string;
  description: string;

  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"

  type: PromoType;
  value: number;

  courseSlugs?: string[]; // si no existe => aplica a todos
  badge?: string;

  active?: boolean;
  priority?: number;
};
