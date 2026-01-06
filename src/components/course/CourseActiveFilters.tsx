"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CourseActiveFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const cat = sp.get("cat");
  const tags = sp.get("tags");

  const parsedTags = useMemo(() => {
    if (!tags) return [];
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [tags]);

  const removeParam = (key: "cat" | "tags", value?: string) => {
    const next = new URLSearchParams(sp.toString());

    if (key === "cat") {
      next.delete("cat");
    } else {
      const set = new Set(parsedTags.map((t) => t.toLowerCase()));
      if (value) set.delete(value.toLowerCase());
      if (set.size === 0) next.delete("tags");
      else next.set("tags", Array.from(set).sort().join(","));
    }

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearAll = () => router.replace(pathname, { scroll: false });

  const hasAny = Boolean(cat) || parsedTags.length > 0;
  if (!hasAny) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {cat ? (
        <button
          onClick={() => removeParam("cat")}
          className="rounded-full bg-white/5 px-3 py-1 text-xs text-foreground ring-1 ring-white/10 hover:bg-white/10 transition-colors"
          type="button"
        >
          {cat} ✕
        </button>
      ) : null}

      {parsedTags.map((t) => (
        <button
          key={t}
          onClick={() => removeParam("tags", t)}
          className="rounded-full bg-white/5 px-3 py-1 text-xs text-foreground ring-1 ring-white/10 hover:bg-white/10 transition-colors"
          type="button"
        >
          {t} ✕
        </button>
      ))}

      <button
        onClick={clearAll}
        className="ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        type="button"
      >
        Limpiar todo
      </button>
    </div>
  );
}
