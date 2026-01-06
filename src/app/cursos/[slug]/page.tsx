import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getCourseBySlug } from "@/data/courses/getBySlug";
import { getAllCourses } from "@/data/courses/getAll";
import { getActivePromos } from "@/data/promos/getActivePromos";
import { getDisplayPriceForCourse } from "@/data/promos/applyPromo";

import { DetailShell } from "@/components/detail/DetailShell";
import { DetailHeader } from "@/components/detail/DetailHeader";
import { DetailSection } from "@/components/detail/DetailSection";

import { PromoStrip } from "@/components/promo/PromoStrip";

import { CourseBuyPanel } from "@/components/course/CourseBuyPanel";
import { CourseMiniCard } from "@/components/course/CourseMiniCard";
import { CourseMetaBadges } from "@/components/course/CourseMetaBadges";
import { CourseHeroImage } from "@/components/course/CourseHeroImage";

import { PricingDisplay } from "@/components/detail/PricingDisplay";
import { TrustChips } from "@/components/detail/TrustChips";
import { TRUST_PRESET_COURSE } from "@/components/detail/trustPresets";

export const revalidate = 60;

export function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Curso no encontrado | CyborgTI",
      robots: { index: false },
    };
  }

  const title = `${course.title} | Curso Online Certificado`;
  const description =
    course.longDescription?.slice(0, 155) ||
    `Aprende ${course.title} con acceso inmediato, soporte incluido y material descargable.`;

  const url = `https://cyborgti.pe/cursos/${course.slug}`;
  const image = course.cover || "/images/og-default.jpg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "CyborgTI",
      images: [{ url: image, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
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
        <div>
          <CourseHeroImage cover={course.cover ?? null} />

          <TrustChips
            className="mt-5"
            items={TRUST_PRESET_COURSE.slice(0, 3)}
          />
        </div>

        {/* RIGHT */}
        <div className="min-w-0">
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
subtitle={
  course.shortDescription ||
  "Acceso inmediato, soporte incluido y material descargable."
}

          />

          <PricingDisplay
            basePEN={course.pricePEN}
            finalPEN={view.finalPricePEN}
            size="lg"
            showSave
            showPercent
            className="mt-4"
          />

          {/* contenido + checkout */}
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

        {/* Banner grande SOLO IMAGEN */}
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
