"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useAnimationFrame, type Variants } from "framer-motion";
import { FiZap } from "react-icons/fi";

import { AddIconToCart } from "@/components/course/AddIconToCart";
import { CourseMiniCard } from "@/components/course/CourseMiniCard";

type Card = {
  slug: string;
  title: string;
  price: string;
  image: string; // ruta pública válida
};

const CARDS: Card[] = [
  { slug: "ccna-200-301", title: "CCNA Associate", price: "PEN 250.00", image: "/cursos/ccna.png" },
  { slug: "ccnp-enterprise", title: "CCNP Enterprise", price: "PEN 280.00", image: "/cursos/ccnp.png" },
  { slug: "it-essentials", title: "IT Essentials", price: "PEN 200.00", image: "/cursos/it_essentials.png" },
  { slug: "cyberops-associate", title: "CyberOps Associate", price: "PEN 200.00", image: "/cursos/cyberops.png" },
];

const SPECIALTIES = ["CCNA", "CCNP", "CyberOps", "IT Essentials", "DevNet"] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function SpecialtiesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-14">
      <MarqueeRow />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {CARDS.map((c) => (
          <motion.article
            key={c.slug}
            variants={cardItem}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group"
          >
            {/* ✅ usamos el mini card base (misma estética, misma lógica) */}
            <CourseMiniCard
              href={`/cursos/${c.slug}`}
              title={c.title}
              cover={c.image}
              className="block"
              cta=" "
            />

            <div className="mt-4 flex items-end justify-between gap-4 px-1">
              <div className="text-white/90">
                <div className="text-sm font-semibold tracking-[0.12em] uppercase">
                  {c.title}
                </div>
                <div className="mt-1 text-sm text-white/70">{c.price}</div>
              </div>

              {/* ✅ este botón NO debe navegar */}
<div className="shrink-0">
  <AddIconToCart slug={c.slug} />
</div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mt-10 flex justify-center"
      >
        <Link
          href="/cursos"
          className="inline-flex items-center justify-center rounded-md bg-brand-500 px-10 py-3 text-sm font-semibold text-white shadow-brand transition-cyborg hover:glow-brand-soft"
        >
          VER CURSOS
        </Link>
      </motion.div>
    </section>
  );
}

function MarqueeRow() {
  const [contentWidth, setContentWidth] = useState(0);
  const [x, setX] = useState(0);

  const speed = 170;
  const base = useMemo(() => [...SPECIALTIES], []);

  useEffect(() => {
    const el = document.getElementById("cyborg-marquee-measure");
    if (!el) return;

    const update = () => setContentWidth(el.getBoundingClientRect().width);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!contentWidth) return;
    const px = (speed * delta) / 1000;

    setX((prev) => {
      const next = prev - px;
      return next <= -contentWidth ? 0 : next;
    });
  });

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-neutral-950 to-transparent" />

      <motion.div className="flex w-max items-center gap-10 py-2" style={{ x }}>
        <div id="cyborg-marquee-measure" className="flex items-center gap-10">
          {base.map((t) => (
            <MarqueeItem key={`a-${t}`} label={t} />
          ))}
        </div>

        <div className="flex items-center gap-10">
          {base.map((t) => (
            <MarqueeItem key={`b-${t}`} label={t} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="select-none text-[44px] font-bold tracking-widest text-white/95 md:text-[64px]">
        {label}
      </span>
      <FiZap className="text-brand-500 text-3xl md:text-4xl" />
    </div>
  );
}
