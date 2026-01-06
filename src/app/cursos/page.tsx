import Link from "next/link";
import { FiX, FiFilter } from "react-icons/fi";

import { getAllCourses } from "@/data/courses/getAll";
import { getActivePromos } from "@/data/promos/getActivePromos";

import { CourseGrid } from "@/components/course/CourseGrid";
import { CourseSidebar } from "@/components/course/CourseSidebar";

export const revalidate = 60;

type CategoryValue =
  | "all"
  | "networking"
  | "cybersecurity"
  | "it"
  | "programacion";

type SearchParams = {
  cat?: string;
};

function normalize(s: unknown) {
  return String(s ?? "").trim().toLowerCase();
}

const ALLOWED_CATS: CategoryValue[] = [
  "all",
  "networking",
  "cybersecurity",
  "it",
  "programacion",
];

const CATEGORY_LABEL: Record<CategoryValue, string> = {
  all: "Cursos",
  networking: "Networking",
  cybersecurity: "Ciberseguridad",
  it: "Tecnología de la información",
  programacion: "Programación",
};

/**
 * Categorías según tus slugs reales:
 * - python -> programación
 * - devnet -> programación
 * - cyberops -> ciberseguridad
 * - it-essentials -> TI
 * - ccna/ccnp -> networking
 */
function getCourseCategory(course: any): Exclude<CategoryValue, "all"> {
  const slug = normalize(course.slug);

  if (slug.includes("python")) return "programacion";
  if (slug.includes("devnet")) return "programacion";
  if (slug.includes("cyberops")) return "cybersecurity";
  if (slug.includes("it-essentials")) return "it";

  return "networking";
}

function parseCat(catRaw: unknown): CategoryValue {
  const raw = normalize(catRaw);
  if (!raw) return "all";
  return (ALLOWED_CATS.includes(raw as CategoryValue) ? raw : "all") as CategoryValue;
}

// ✅ Next 15: searchParams es Promise → hay que await
export default async function CursosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const cat = parseCat(sp?.cat);

  const courses = getAllCourses();
  const promos = await getActivePromos();

  const filtered =
    cat === "all"
      ? courses
      : courses.filter((c: any) => getCourseCategory(c) === cat);

  const counts: Record<CategoryValue, number> = {
    all: courses.length,
    networking: 0,
    cybersecurity: 0,
    it: 0,
    programacion: 0,
  };

  courses.forEach((c: any) => {
    counts[getCourseCategory(c)] += 1;
  });

  const showingText =
    cat === "all"
      ? `Mostrando ${filtered.length} cursos`
      : `Mostrando ${filtered.length} cursos en ${CATEGORY_LABEL[cat]}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Todos los cursos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Precios actualizados automáticamente según promociones activas.
        </p>
      </header>

      <section className="flex gap-10">
        <CourseSidebar active={cat} counts={counts} />

        <div className="flex-1">
          {/* Row superior PRO */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            {/* pill showing */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-foreground ring-1 ring-white/10 backdrop-blur">
              <FiFilter className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{showingText}</span>
            </div>

            {/* Ver todos */}
            {cat !== "all" ? (
              <Link
                href="/cursos"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-white/5 px-4 py-2 text-xs text-foreground
                  ring-1 ring-white/10 backdrop-blur
                  transition-all duration-200
                  hover:bg-white/10 hover:ring-white/20
                  active:scale-[0.98]
                "
              >
                <FiX className="h-4 w-4 text-muted-foreground" />
                <span>Ver todos</span>
              </Link>
            ) : null}
          </div>

          <CourseGrid courses={filtered} promos={promos} />
        </div>
      </section>
    </main>
  );
}
