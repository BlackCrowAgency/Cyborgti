import { getActivePromos } from "@/data/promos/getActivePromos";
import { Badge } from "@/components/ui/badge";

export default async function PromocionesPage() {
  const promos = await getActivePromos();

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Promociones</h1>
        <p className="mt-2 text-muted-foreground">
          Promociones activas (se actualizan desde un JSON editable).
        </p>
      </header>

      {promos.length === 0 ? (
        <p className="text-muted-foreground">No hay promociones activas.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((p) => (
            <div key={p.id} className="rounded-xl border p-4">
              <div className="flex flex-wrap items-center gap-2">
                {p.badge && <Badge variant="secondary">{p.badge}</Badge>}
                <Badge variant="outline">
                  {p.type === "percent" ? `-${p.value}%` : `Precio promo`}
                </Badge>
              </div>

              <div className="mt-2 text-lg font-medium">{p.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>

              <div className="mt-3 text-xs text-muted-foreground">
                {p.startDate} → {p.endDate}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
