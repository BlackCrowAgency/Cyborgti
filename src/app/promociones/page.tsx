import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getActivePromos } from "@/data/promos/getActivePromos";
import { formatPEN } from "@/lib/money";

export default async function PromocionesPage() {
  const promos = await getActivePromos();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <h1 className="h2">Promociones</h1>
        <p className="muted mt-2">
          Promos activas (2x1 con página + descuentos informativos).
        </p>
      </header>

      {promos.length === 0 ? (
        <p className="text-white/70">No hay promociones activas.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {promos.map((p) => {
            const isBundle = p.type === "bundle";
            const label = isBundle
              ? `Pack ${formatPEN(p.bundlePricePEN)}`
              : `-${p.discountPercent}%`;

            const card = (
              <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-card transition-cyborg hover:border-brand-500/40 hover:shadow-brand">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: `url('${p.image}')` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-black/10"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      {isBundle ? "2x1 / Pack" : "Descuento"}
                    </Badge>
                    <Badge variant="outline">{label}</Badge>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-white/95">
                    {p.title}
                  </h2>

                  {p.subtitle ? (
                    <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
                  ) : null}

                  <p className="mt-4 text-xs text-white/60">
                    Vigencia: {p.activeFrom} → {p.activeTo}
                  </p>

                  {/* Si tiene href -> mostramos CTA; si no, texto informativo */}
                  {p.href ? (
                    <div className="mt-4 inline-flex items-center text-sm font-semibold text-brand-100">
                      Ver detalles →
                    </div>
                  ) : (
                    <div className="mt-4 text-sm text-white/70">
                      * Descuento automático al comprar desde la web.
                    </div>
                  )}
                </div>
              </article>
            );

            // ✅ Solo navegable si existe href (tu regla)
            return p.href ? (
              <Link key={p.id} href={p.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={p.id}>{card}</div>
            );
          })}
        </div>
      )}
    </main>
  );
}
