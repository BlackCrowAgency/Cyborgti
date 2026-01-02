import Link from "next/link";
import { notFound } from "next/navigation";
import { getPromoById } from "@/data/promos/getPromoById";
import { formatPEN } from "@/lib/money";

export const revalidate = 60; // se actualiza sin redeploy (1 min)

type PageProps = {
  params: { id: string };
};

export default async function PromoDetailPage({ params }: PageProps) {
  const promo = await getPromoById(params.id);

  if (!promo) notFound();

  // Si es percent y (por diseño) no navegas, igual dejamos la page por si luego la activas
  if (promo.type === "percent") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="h2">{promo.title}</h1>
        {promo.subtitle ? (
          <p className="mt-3 text-white/70">{promo.subtitle}</p>
        ) : null}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/80">
            Descuento:{" "}
            <span className="font-semibold text-white">
              {promo.discountPercent}%
            </span>
          </p>
          <p className="mt-2 text-white/70">
            Esta promoción es informativa y se aplicará automáticamente en el
            checkout (lo conectamos en el siguiente paso).
          </p>
        </div>

        <div className="mt-10">
          <Link className="text-brand-400 hover:text-brand-300" href="/promociones">
            ← Volver a promociones
          </Link>
        </div>
      </main>
    );
  }

  // bundle 2x1
  return (
    <main className="mx-auto max-w-5xl px-4 py-14">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div
          className="h-64 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url('${promo.image}')` }}
        />
        <div className="p-7">
          <h1 className="h2">{promo.title}</h1>
          {promo.subtitle ? (
            <p className="mt-3 text-white/70">{promo.subtitle}</p>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <div className="text-sm text-white/60">Precio del pack</div>
              <div className="mt-1 text-2xl font-semibold text-white">
                {formatPEN(promo.bundlePricePEN)}
              </div>
              <div className="mt-2 text-xs text-white/50">
                Vigencia: {promo.activeFrom} → {promo.activeTo}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <div className="text-sm text-white/60">Incluye</div>
              <ul className="mt-2 list-disc pl-5 text-white/80">
                {promo.courses.map((slug: string) => (
                  <li key={slug}>
                    <Link
                      className="text-brand-400 hover:text-brand-300"
                      href={`/cursos/${slug}`}
                    >
                      {slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/cursos"
              className="inline-flex items-center justify-center rounded-md bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-brand transition-cyborg hover:glow-brand-soft"
            >
              Ver cursos
            </Link>

            <Link className="text-white/70 hover:text-white" href="/promociones">
              Volver a promociones
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
