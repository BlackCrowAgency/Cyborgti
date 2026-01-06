"use client";

import { FiShare2 } from "react-icons/fi";

export function ShareButton({
  title = "CyborgTI",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    try {
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        await navigator.share({ title, url });
        return;
      }
    } catch {}

    try {
      await navigator.clipboard.writeText(url);
    } catch {}
  };

  return (
    <button
      onClick={onShare}
      type="button"
      className={
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white transition-cyborg " +
        className
      }
      aria-label="Compartir"
      title="Compartir"
    >
      <FiShare2 />
    </button>
  );
}
