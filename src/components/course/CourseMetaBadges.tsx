import { Badge } from "@/components/ui/badge";

export function CourseMetaBadges({
  level,
  durationWeeks,
  tags,
  extraBadge,
  maxTags = 6,
  className = "",
}: {
  level?: string | null;
  durationWeeks?: number | null;
  tags?: string[] | null;
  extraBadge?: string | null; // ej: view.badge
  maxTags?: number;
  className?: string;
}) {
  const safeTags = Array.isArray(tags) ? tags.filter(Boolean).slice(0, maxTags) : [];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {level ? <Badge variant="secondary">{level}</Badge> : null}
      {typeof durationWeeks === "number" ? (
        <Badge variant="outline">{durationWeeks} semanas</Badge>
      ) : null}

      {safeTags.map((t) => (
        <Badge key={t} variant="secondary">
          {t}
        </Badge>
      ))}

      {extraBadge ? <Badge variant="outline">{extraBadge}</Badge> : null}
    </div>
  );
}
