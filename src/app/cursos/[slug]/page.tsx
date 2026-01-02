import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/course/AddToCartButton";

import { formatPEN } from "@/lib/money";
import { getCourseBySlug } from "@/data/courses/getBySlug";
import { getAllCourses } from "@/data/courses/getAll";

export function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CursoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-4 py-10">
      <div className="mb-6">
        <Link
          href="/cursos"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Volver a cursos
        </Link>
      </div>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.level}</Badge>
          <Badge variant="outline">{course.durationWeeks} semanas</Badge>

          {course.tags?.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">{course.title}</h1>
        <p className="text-muted-foreground">{course.longDescription}</p>
      </header>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-medium">Incluye</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
            {course.includes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <aside className="rounded-xl border p-6">
          <div className="text-sm text-muted-foreground">Precio</div>
          <div className="mt-1 text-2xl font-semibold">
            {formatPEN(course.pricePEN)}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <AddToCartButton slug={course.slug} />
            <Button variant="outline">Consultar por WhatsApp</Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            * Checkout y pasarela (Mercado Pago) se conecta en una etapa posterior.
          </p>
        </aside>
      </section>
    </main>
  );
}
