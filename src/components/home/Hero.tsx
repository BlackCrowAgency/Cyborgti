import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8">
      <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-card">
        {/* Imagen de fondo (coloca luego /public/images/hero.jpg) */}
        <div
          className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center"
          aria-hidden="true"
        />

        {/* Overlay oscuro para legibilidad */}
        <div
          className="absolute inset-0 bg-black/55"
          aria-hidden="true"
        />

        {/* Glow / tono marca leve */}
        <div
          className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-brand-500/25 blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative flex min-h-[430px] items-end px-6 py-10 md:min-h-[520px] md:px-10 md:py-14">
          <div>
            <h1 className="h1 text-neutral-50">
              Crece con <br />
              Certificados Cisco
            </h1>

            <div className="mt-8">
              <Link
                href="/cursos"
                className="inline-flex items-center justify-center rounded-md bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-brand transition-cyborg hover:glow-brand-soft"
              >
                VER CURSOS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
