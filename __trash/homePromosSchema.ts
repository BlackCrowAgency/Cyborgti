// cyborgti-web/src/data/promos/homePromosSchema.ts
// ✅ Este archivo ahora NO define un schema diferente.
// ✅ Re-exporta el schema oficial desde ./schema para evitar inconsistencias (href null vs undefined).

export { HomePromosSchema as homePromosSchema } from "./schema";
export type { HomePromos } from "./schema";
