import Link from "next/link";
import { getHomePromos } from "@/data/promos/getHomePromos";

function PromoCard({
  image,
  label,
  href,
}: {
  image: string;
  label?: string;
  href: string | null;
}) {
  const inner = (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card transition-cyborg hover:border-brand-500/40 hover:shadow-brand">
      <div
        className="h-48 w-full bg-cover bg-center opacity-80 transition-cyborg group-hover:opacity-95"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
      {label ? (
        <div className="absolute left-6 bottom-6">
          <div className="overline">{label}</div>
        </div>
      ) : null}
    </div>
  );

  if (!href) return <div aria-label="Promoción informativa">{inner}</div>;

  return (
    <Link href={href} className="block">
      {inner}
    </Link>
  );
}

export async function PromosSection() {
  const promos = await getHomePromos();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-10 flex items-center justify-center gap-6">
        <span className="text-brand-500 text-2xl">⚡</span>
        <h2 className="h2 text-center">ÚLTIMAS PROMOCIONES</h2>
        <span className="text-brand-500 text-2xl">⚡</span>
      </div>

      <div className="grid gap-8">
        {/* top 2 */}
        <div className="grid gap-8 md:grid-cols-2">
          {promos.top.slice(0, 2).map((p) => (
            <PromoCard key={p.id} image={p.image} label={p.label} href={p.href} />
          ))}
        </div>

        {/* featured (portada) */}
        {promos.featured ? (
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card transition-cyborg hover:border-brand-500/40 hover:shadow-brand">
            {promos.featured.href ? (
              <Link href={promos.featured.href} className="block">
                <div
                  className="h-72 w-full bg-cover bg-center opacity-80 transition-cyborg group-hover:opacity-95"
                  style={{ backgroundImage: `url('${promos.featured.image}')` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                {promos.featured.label ? (
                  <div className="absolute left-6 bottom-6">
                    <div className="overline">{promos.featured.label}</div>
                  </div>
                ) : null}
              </Link>
            ) : (
              <>
                <div
                  className="h-72 w-full bg-cover bg-center opacity-80"
                  style={{ backgroundImage: `url('${promos.featured.image}')` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
              </>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
