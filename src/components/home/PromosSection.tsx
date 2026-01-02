import { FiZap } from "react-icons/fi";
import Link from "next/link";
import { getHomePromos } from "@/data/promos/getHomePromos";

function PromoCard({
  image,
  label,
  href,
  className = "",
}: {
  image: string;
  label?: string;
  href?: string;
  className?: string;
}) {
  const Wrapper = href ? Link : ("div" as any);

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={[
        "group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-card",
        "transition-cyborg hover:border-brand-600/35 hover:glow-brand-soft",
        className,
      ].join(" ")}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />

      {label ? (
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-sm font-semibold tracking-[0.14em] text-white/90">
            {label}
          </span>
        </div>
      ) : null}
    </Wrapper>
  );
}

export async function PromosSection() {
  const promos = await getHomePromos();

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-16">
      <div className="flex items-center justify-center gap-4">
        <FiZap className="text-brand-500 text-2xl md:text-3xl" />
        <h2 className="h2 text-center text-white">ÚLTIMAS PROMOCIONES</h2>
        <FiZap className="text-brand-500 text-2xl md:text-3xl" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {promos.top.map((p) => (
          <PromoCard
            key={p.id}
            image={p.image}
            label={p.label}
            href={p.href}
            className="h-[220px] md:h-[240px]"
          />
        ))}
      </div>

      <div className="mt-8">
        <PromoCard
          image={promos.featured.image}
          label={promos.featured.label}
          href={promos.featured.href}
          className="h-[260px] md:h-[360px]"
        />
      </div>
    </section>
  );
}
