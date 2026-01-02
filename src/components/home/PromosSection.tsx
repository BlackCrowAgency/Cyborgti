import Link from "next/link";
import { getHomePromos } from "@/data/promos/getHomePromos";

type PromoCardProps = {
  label: string;
  image: string;
  href?: string;
  heightClass: string;
};

function PromoCard({ label, image, href, heightClass }: PromoCardProps) {
  const common =
    "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card transition-cyborg hover:border-brand-500/40 hover:shadow-brand";

  const content = (
    <>
      <div
        className={`${heightClass} w-full bg-cover bg-center opacity-80 transition-cyborg group-hover:opacity-95`}
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
        aria-hidden="true"
      />
      {label ? (
        <div className="absolute left-6 bottom-6">
          <div className="overline">{label}</div>
        </div>
      ) : null}
    </>
  );

  // ✅ Si no hay href -> tarjeta informativa (no navega)
  if (!href) {
    return (
      <article className={common} aria-label={label || "Promoción"}>
        {content}
      </article>
    );
  }

  // ✅ Si hay href -> Link
  return (
    <Link href={href} className={common} aria-label={label || "Promoción"}>
      {content}
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
          {promos.top.map((p) => (
            <PromoCard
              key={p.id}
              label={p.label}
              image={p.image}
              href={p.href}
              heightClass="h-48"
            />
          ))}
        </div>

        {/* featured (solo si existe) */}
        {promos.featured ? (
          <PromoCard
            label={promos.featured.label ?? ""}
            image={promos.featured.image}
            href={promos.featured.href}
            heightClass="h-72"
          />
        ) : null}
      </div>
    </section>
  );
}
