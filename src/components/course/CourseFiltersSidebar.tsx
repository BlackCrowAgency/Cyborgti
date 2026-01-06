"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type CategoryValue = "all" | "networking" | "cybersecurity" | "it" | "apis";

const CATEGORIES: { label: string; value: CategoryValue }[] = [
  { label: "Cursos", value: "all" },
  { label: "Networking", value: "networking" },
  { label: "Ciberseguridad", value: "cybersecurity" },
  { label: "Tecnología de la información", value: "it" },
  { label: "Api's", value: "apis" },
];

type TagOption = { tag: string; count: number };

export function CourseFiltersSidebar({
  tagOptions,
  categoryCounts,
}: {
  tagOptions: TagOption[];
  categoryCounts: Record<CategoryValue, number>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const activeCat = (sp.get("cat") as CategoryValue) || "all";
  const activeTags = useMemo(() => {
    const raw = sp.get("tags");
    if (!raw) return new Set<string>();
    return new Set(
      raw
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
    );
  }, [sp]);

  const pushParams = (next: URLSearchParams) => {
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const setCat = (cat: CategoryValue) => {
    const next = new URLSearchParams(sp.toString());
    if (cat === "all") next.delete("cat");
    else next.set("cat", cat);
    pushParams(next);
  };

  const toggleTag = (tag: string) => {
    const next = new URLSearchParams(sp.toString());
    const set = new Set(activeTags);
    const key = tag.toLowerCase();

    if (set.has(key)) set.delete(key);
    else set.add(key);

    if (set.size === 0) next.delete("tags");
    else next.set("tags", Array.from(set).sort().join(","));

    pushParams(next);
  };

  const clearAll = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <aside className="w-full max-w-[240px] shrink-0">
      <div className="sticky top-24 rounded-2xl bg-white/3 ring-1 ring-white/10 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Filtros</p>
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            type="button"
          >
            Limpiar
          </button>
        </div>

        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Categorías</p>
          <div className="space-y-1">
            {CATEGORIES.map((c) => {
              const isActive = activeCat === c.value;
              const count = categoryCounts[c.value] ?? 0;

              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCat(c.value)}
                  className={cn(
                    "w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                    "text-muted-foreground hover:text-foreground hover:bg-white/5",
                    isActive && "bg-white/7 text-foreground"
                  )}
                >
                  <span>{c.label}</span>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-white/10" />

        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Etiquetas</p>

          <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
            {tagOptions.map(({ tag, count }) => {
              const checked = activeTags.has(tag.toLowerCase());
              return (
                <label
                  key={tag}
                  className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleTag(tag)}
                      className="h-4 w-4 accent-indigo-500"
                    />
                    <span className="text-sm text-muted-foreground">
                      {tag}
                    </span>
                  </span>

                  <span className="text-xs text-muted-foreground">{count}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
