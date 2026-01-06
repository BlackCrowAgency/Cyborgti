import Link from "next/link";
import { getHomePromos } from "@/data/promos/getHomePromos";
import type { HomePromoCard } from "@/data/promos/schema";

function PromoTile({
  promo,
  clickable,
  note,
}: {
  promo: HomePromoCard;
  clickable: boolean;
  note?: string;
}) {
  const content = (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card",
        clickable
          ? "transition-cyborg hover:border-white/20 hover:shadow-brand"
          : "",
      ].join(" ")}
    >
      {/* bg */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${promo.image}')` }}
        aria-hidden="true"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden="true"
      />

      {/* content */}
      <div className="relative flex min-h-[220px] items-end p-6 md:min-h-[250px] md:p-8">
        <div className="max-w-[90%]">
          <div className="text-[11px] uppercase tracking-[0.35em] text-white/60">
            PROMOCIÓN
          </div>

          <div className="mt-2 text-xl font-semibold text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)] md:text-2xl">
            {promo.label}
          </div>

          {note ? <div className="mt-2 text-sm text-white/65">{note}</div> : null}

          {clickable ? (
            <div className="mt-5 inline-flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-md bg-brand-500 px-5 py-2 text-xs font-semibold text-white shadow-brand transition-cyborg group-hover:glow-brand-soft">
                Ver promoción
              </span>
              <span className="text-xs text-white/55 transition-cyborg group-hover:text-white/70">
                →
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {clickable ? (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-cyborg group-hover:opacity-100">
          <div className="absolute inset-0 ring-1 ring-brand-500/35" />
          <div className="absolute -bottom-32 -left-32 h-[520px] w-[520px] rounded-full bg-brand-500/18 blur-[140px]" />
        </div>
      ) : null}
    </div>
  );

  if (!clickable) return <div className="cursor-default">{content}</div>;

  return (
    <Link href={promo.href ?? "/promociones"} className="block">
      {content}
    </Link>
  );
}

function FeaturedImageOnly({ featured }: { featured: HomePromoCard }) {
  const content = (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card transition-cyborg hover:border-white/20 hover:shadow-brand">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${featured.image}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
        aria-hidden="true"
      />
      <div className="relative min-h-[320px] md:min-h-[360px]" />
    </div>
  );

  return (
    <Link href={featured.href ?? "/promociones"} className="block">
      {content}
    </Link>
  );
}

export async function PromosSection() {
  const home = await getHomePromos();

  const top = home.top ?? [];
  const featured = home.featured ?? null;

  // Regla de negocio:
  // - Solo 2x1 es clickeable
  // - 10% es informativa (no link)
  const promo2x1 = top.find((p) => p.id === "2x1-ccna-cyberops") ?? null;
  const promo10 = top.find((p) => p.id === "10off-web") ?? null;

  // Fallbacks seguros: si faltan ids, usamos lo que haya
  const fallbackA = !promo2x1 ? top[0] ?? null : null;
  const fallbackB =
    !promo10 ? top.find((p) => p.id !== promo2x1?.id) ?? top[1] ?? null : null;

  const left = promo2x1 ?? fallbackA;
  const right = promo10 ?? fallbackB;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-10 flex items-center justify-center gap-6">
        <span className="text-brand-500 text-xl">⚡</span>
        <h2 className="h2 text-center">ÚLTIMAS PROMOCIONES</h2>
        <span className="text-brand-500 text-xl">⚡</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Izquierda: SIEMPRE clickeable (pensada para 2x1) */}
        {left ? <PromoTile promo={left} clickable={true} /> : null}

        {/* Derecha: SIEMPRE informativa (pensada para 10%) */}
        {right ? (
          <PromoTile
            promo={right}
            clickable={false}
            note="Se aplica automáticamente en checkout."
          />
        ) : null}
      </div>

      {/* Banner inferior: imagen + link */}
      {featured ? (
        <div className="mt-6">
          <FeaturedImageOnly featured={featured} />
        </div>
      ) : null}
    </section>
  );
}
