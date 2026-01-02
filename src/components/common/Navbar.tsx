"use client";

import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "@/features/cart/store";
import { cartCount } from "@/features/cart/selectors";

export function Navbar() {
  const items = useCartStore((s) => s.items);
  const count = cartCount(items);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* Si aún no tienes logo, deja solo el texto */}
          {/* <Image src="/images/logo.svg" alt="CyborgTI" width={140} height={28} /> */}
          <span className="text-white font-semibold tracking-widest">CYBORGTI</span>
        </Link>

        {/* Center: “Aceptamos” pill */}
        <div className="hidden items-center justify-center md:flex">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs text-white/70">Aceptamos</span>

            {/* Chips (placeholders). Si luego pones imágenes reales, se reemplazan aquí */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                V
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                M
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                A
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[10px] font-bold text-black">
                G
              </span>
            </div>
          </div>
        </div>

        {/* Right: Links + Cart */}
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/cursos" className="text-white/70 hover:text-white transition-cyborg">
              Todos los cursos
            </Link>
            <Link href="/promociones" className="text-white/70 hover:text-white transition-cyborg">
              Promociones
            </Link>
            <Link href="/contacto" className="text-white/70 hover:text-white transition-cyborg">
              Contacto
            </Link>
          </nav>

          {/* Cart button (cuadrado como tu diseño) */}
          <Link
            href="/carrito"
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/25 ring-1 ring-brand-500/40 transition-cyborg hover:bg-brand-500/35 hover:glow-brand-soft"
            aria-label="Carrito"
          >
            <FiShoppingCart className="text-white text-2xl" />

            {count > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-500 px-2 text-xs font-bold text-white shadow-brand">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
