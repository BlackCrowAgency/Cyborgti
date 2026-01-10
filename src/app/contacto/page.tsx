import { FiMail, FiMessageSquare } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contacto",
  description: "Contáctanos para información sobre cursos y certificaciones.",
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      {/* ===== HEADER ===== */}
      <header className="mb-14 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Contáctanos
        </h1>
        <p className="mt-4 text-white/70 leading-relaxed">
          ¿Tienes dudas sobre nuestros cursos o certificaciones?
          Escríbenos y te responderemos lo antes posible.
        </p>
      </header>

      {/* ===== CONTENT ===== */}
      <div className="grid gap-14 md:grid-cols-[1.2fr_0.8fr]">
        {/* ===== FORM ===== */}
        <form className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-white/80">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/80">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tucorreo@email.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/80">
              Mensaje
            </label>
            <textarea
              rows={4}
              placeholder="Cuéntanos en qué te podemos ayudar"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>

          <Button size="lg" className="mt-2">
            Enviar mensaje
          </Button>
        </form>

        {/* ===== INFO ===== */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-sm text-white/90">
              <FiMail className="text-brand" />
              contacto@cyborgti.com
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-sm text-white/90">
              <FiMessageSquare className="text-brand" />
              WhatsApp: +51 999 999 999
            </div>
          </div>

          <p className="text-xs text-white/50">
            Horario de atención: Lunes a Viernes, 9:00 a.m. – 6:00 p.m.
          </p>
        </aside>
      </div>
    </main>
  );
}
