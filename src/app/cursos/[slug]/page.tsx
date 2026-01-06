import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/course/AddToCartButton";
import { ShareButton } from "@/components/course/ShareButton";

import { formatPEN } from "@/lib/money";
import { getCourseBySlug } from "@/data/courses/getBySlug";
import { getAllCourses } from "@/data/courses/getAll";

import { getActivePromos } from "@/data/promos/getActivePromos";
import { getDisplayPriceForCourse } from "@/data/promos/applyPromo";

import { DetailShell } from "@/components/detail/DetailShell";
import { CourseBuyPanel } from "@/components/course/CourseBuyPanel";
import { TrustChips } from "@/components/detail/TrustChips";
import { DetailHeader } from "@/components/detail/DetailHeader";
import { DetailSection } from "@/components/detail/DetailSection";
import { CourseMiniCard } from "@/components/course/CourseMiniCard";
import { PromoStrip } from "@/components/promo/PromoStrip";
import { PricingDisplay } from "@/components/detail/PricingDisplay";
import { CourseMetaBadges } from "@/components/course/CourseMetaBadges";

export const revalidate = 60;

export function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

function calcDiscount(oldPEN: number, finalPEN: number) {
  const diff = Math.max(0, oldPEN - finalPEN);
  const pct = oldPEN > 0 ? Math.round((diff / oldPEN) * 100) : 0;
  return { diff, pct };
}

export default async function CursoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  const promos = await getActivePromos();
  const view = getDisplayPriceForCourse(promos, course.slug, course.pricePEN);
  const hasDiscount = view.finalPricePEN < course.pricePEN;
  const { diff, pct } = calcDiscount(course.pricePEN, view.finalPricePEN);

  const all = await Promise.resolve(getAllCourses());
  const moreCourses = all.filter((c) => c.slug !== course.slug).slice(0, 4);

  return (
    <DetailShell backHref="/cursos" backLabel="Volver a cursos">
      {/* PROMO STRIP */}
{view.bundlePromo ? (
  <div className="mb-10">
    <PromoStrip promo={view.bundlePromo} />
  </div>
) : null}


      {/* LAYOUT PRINCIPAL */}
      <section className="grid gap-10 lg:grid-cols-[520px_1fr] lg:items-start">
        {/* LEFT: imagen */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl border border-brand-500/60 bg-black/20 shadow-[0_0_0_1px_rgba(99,102,241,0.25),0_25px_80px_rgba(0,0,0,0.55)]">
            {course.cover ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${course.cover}')` }}
                aria-hidden="true"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.15),transparent_55%)]" />
            )}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute -bottom-32 -left-28 h-[520px] w-[520px] rounded-full bg-brand-500/10 blur-[150px]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            <div className="relative aspect-[4/5] w-full" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/55">
            <span>• Acceso inmediato</span>
            <span>• Soporte incluido</span>
            <span>• Material descargable</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="min-w-0">
          {/* tags */}
<DetailHeader
badges={
  <CourseMetaBadges
    level={course.level}
    durationWeeks={course.durationWeeks}
    tags={course.tags ?? []}
    extraBadge={view.badge ?? null}
    maxTags={6}
  />
}

  title={course.title}
  subtitle={null}
/>


          {/* price row */}
<PricingDisplay
  basePEN={course.pricePEN}
  finalPEN={view.finalPricePEN}
  size="lg"
  showSave={true}
  showPercent={true}
  className="mt-4"
/>


          {/* trust chips */}
<TrustChips
  className="mt-4"
  items={["Acceso inmediato", "Soporte incluido", "Actualizaciones"]}
/>


          {/* ✅ contenido + checkout (en carriles separados) */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* CONTENIDO */}
            <div className="min-w-0">
<DetailSection
  kicker="DESCRIPCIÓN"
  kickerClassName="text-[11px] uppercase tracking-[0.35em] text-brand-500"
>
  <p className="text-sm md:text-base leading-relaxed text-white/70">
    {course.longDescription}
  </p>
</DetailSection>

<DetailSection kicker="INCLUYE" className="mt-10">
  <ul className="grid gap-3 text-sm text-white/70">
    {course.includes.map((x) => (
      <li key={x} className="flex gap-3">
        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-brand-500/70" />
        <span className="flex-1">{x}</span>
      </li>
    ))}
  </ul>
</DetailSection>

            </div>

            {/* CHECKOUT */}
<CourseBuyPanel
  slug={course.slug}
  title={course.title}
  basePricePEN={course.pricePEN}
  finalPricePEN={view.finalPricePEN}
/>

          </div>
        </div>
      </section>

      {/* MÁS CURSOS */}
      <section className="mt-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            MÁS CURSOS
          </h2>
          <div className="hidden sm:block h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
{moreCourses.map((c) => (
  <CourseMiniCard
    key={c.slug}
    href={`/cursos/${c.slug}`}
    title={c.title}
    cover={c.cover ?? null}
  />
))}

        </div>

        {/* ✅ Banner grande SOLO IMAGEN */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-brand-500/25 bg-black/25 shadow-card">
          <div className="relative h-[220px] md:h-[280px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/banner-cursos.jpg')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.22), transparent 55%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.16), transparent 60%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-brand-500/10 blur-[130px]" />
              <div className="absolute -bottom-28 -right-24 h-[520px] w-[520px] rounded-full bg-brand-500/10 blur-[150px]" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </DetailShell>
  );
}
