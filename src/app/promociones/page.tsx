import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getActivePromos } from "@/data/promos/getActivePromos";
import { formatPEN } from "@/lib/money";

export const revalidate = 60;

export default async function PromocionesPage() {
  const promos = await getActivePromos();

  const withPage = promos.filter((p) => !!p.href);
  const infoOnly = promos.filter((p) => !p.href);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <h1 className="h2">Promociones</h1>
        <p className="mt-2 text-white/70">
          Promos activas por tiempo limitado. Se actualizan desde Vercel Edge Config.
        </p>
      </header>

      {/* Promos con página */}
      {withPage.length > 0 ? (
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Badge variant="secondary">DESTACADAS</Badge>
            <span className="text-white/70 text-sm">Con detalle y condiciones</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {withPage.map((p) => (
              <Link
                key={p.id}
                href={p.href!}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card transition-cyborg hover:border-brand-500/40 hover:shadow-brand"
              >
                <div
                  className="h-56 w-full bg-cover bg-center opacity-80 transition-cyborg group-hover:opacity-95"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute left-6 bottom-6 right-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {p.badge ? <Badge variant="secondary">{p.badge}</Badge> : null}
                    {p.type === "percent" ? (
                      <Badge variant="outline">-{p.discountPercent}%</Badge>
                    ) : (
                      <Badge variant="outline">{formatPEN(p.bundlePricePEN)}</Badge>
                    )}
                  </div>

                  <div className="mt-3 text-lg font-semibold text-white">{p.title}</div>
                  {p.subtitle ? <div className="mt-1 text-white/70 text-sm">{p.subtitle}</div> : null}

                  {p.type === "bundle" ? (
                    <div className="mt-2 text-xs text-white/55">
                      Incluye: {p.courses.join(" + ")}
                    </div>
                  ) : null}

                  <div className="mt-2 text-xs text-white/45">
                    Vigencia: {p.activeFrom} → {p.activeTo}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Promos informativas */}
      {infoOnly.length > 0 ? (
        <section>
          <div className="mb-4 flex items-center gap-3">
            <Badge variant="secondary">INFO</Badge>
            <span className="text-white/70 text-sm">Se aplican automáticamente</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {infoOnly.map((p) => (
              <div
                key={p.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card"
              >
                <div
                  className="h-56 w-full bg-cover bg-center opacity-70"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute left-6 bottom-6 right-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {p.badge ? <Badge variant="secondary">{p.badge}</Badge> : null}
                    {p.type === "percent" ? (
                      <Badge variant="outline">-{p.discountPercent}%</Badge>
                    ) : (
                      <Badge variant="outline">Bundle</Badge>
                    )}
                  </div>

                  <div className="mt-3 text-lg font-semibold text-white">{p.title}</div>
                  {p.subtitle ? <div className="mt-1 text-white/70 text-sm">{p.subtitle}</div> : null}

                  <div className="mt-2 text-xs text-white/45">
                    Vigencia: {p.activeFrom} → {p.activeTo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {promos.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/70">
          No hay promociones activas en este momento.
        </div>
      ) : null}
    </main>
  );
}
