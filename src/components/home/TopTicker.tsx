import { getHomePromos } from "@/data/promos/getHomePromos";

function buildTickerText(labels: Array<string | undefined | null>) {
  const cleaned = labels
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean);

  if (!cleaned.length) return "PROMOCIONES ACTIVAS • CYBORGTI •";

  return `${cleaned.join(" • ")} •`;
}

export async function TopTicker() {
  const promos = await getHomePromos();

  const text = buildTickerText(promos.top.map((p) => p.label));

  // repetimos para loop visual
  const repeated = `${text} ${text} ${text} ${text}`;

  return (
    <div className="border-b border-white/10 bg-brand-600">
      <div className="relative overflow-hidden">
        <div className="ticker-track py-1 text-[11px] uppercase tracking-[0.35em] text-white/95">
          <span className="ticker-item">{repeated}</span>
          <span className="ticker-item">{repeated}</span>
        </div>
      </div>
    </div>
  );
}
