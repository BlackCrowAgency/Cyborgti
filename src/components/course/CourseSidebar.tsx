import Link from "next/link";
import { cn } from "@/lib/utils";

type CategoryValue =
  | "all"
  | "networking"
  | "cybersecurity"
  | "it"
  | "programacion";

const CATEGORIES: { label: string; value: CategoryValue }[] = [
  { label: "Cursos", value: "all" },
  { label: "Networking", value: "networking" },
  { label: "Ciberseguridad", value: "cybersecurity" },
  { label: "Tecnología de la información", value: "it" },
  { label: "Programación", value: "programacion" },
];

export function CourseSidebar({
  active = "all",
  counts,
}: {
  active?: CategoryValue;
  counts: Record<CategoryValue, number>;
}) {
  return (
    <aside className="w-full max-w-[240px] shrink-0">
      <div className="sticky top-24 rounded-2xl bg-white/3 ring-1 ring-white/10 p-4">
        <div className="mb-3 text-sm font-semibold">Categorías</div>

        <nav className="space-y-1">
          {CATEGORIES.map((c) => {
            const isActive = active === c.value;
            const href = c.value === "all" ? "/cursos" : `/cursos?cat=${c.value}`;
            const count = counts[c.value] ?? 0;

            return (
              <Link
                key={c.value}
                href={href}
                prefetch={false}
                className={cn(
                  "flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  isActive && "bg-white/7 text-foreground"
                )}
              >
                <span>{c.label}</span>
                <span className="text-xs text-muted-foreground">{count}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 h-px w-full bg-white/10" />
        <p className="mt-4 text-xs text-muted-foreground">Filtra el catálogo por categoría.</p>
      </div>
    </aside>
  );
}
