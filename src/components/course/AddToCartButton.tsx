"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store";
import { FiMinus, FiPlus, FiShoppingCart, FiShare2 } from "react-icons/fi";

export function AddToCartButton({
  slug,
  title,
  redirectTo,
  label = "ADQUIRIR",
  showShare = true,
  variant = "default",
}: {
  slug: string;
  title?: string;
  redirectTo?: string;
  label?: string;
  showShare?: boolean;
  variant?: "default" | "ecom";
}) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  const safeQty = useMemo(() => Math.max(1, Math.floor(qty || 1)), [qty]);

  const onAdd = () => {
    addItem(slug, safeQty);
    if (redirectTo) router.push(redirectTo);
  };

const onShare = async () => {
  const url = window.location.href;
  const shareTitle = title ?? "CyborgTI";

  const nav = navigator as Navigator & {
    share?: (data: { title?: string; url?: string; text?: string }) => Promise<void>;
  };

  try {
    if (typeof nav.share === "function") {
      await nav.share({ title: shareTitle, url });
      return;
    }
  } catch {
    // noop
  }

  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // noop
  }
};


  const isEcom = variant === "ecom";

  if (!isEcom) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-[11px] uppercase tracking-[0.35em] text-white/55">LICENCIAS</div>

          <div className="flex items-center gap-2">
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-500/30 bg-black/30 text-white/80 transition-cyborg hover:bg-brand-500/10"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Disminuir"
              type="button"
            >
              <FiMinus />
            </button>

            <div className="min-w-6 text-center text-white">{safeQty}</div>

            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-500/30 bg-black/30 text-white/80 transition-cyborg hover:bg-brand-500/10"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Aumentar"
              type="button"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="bg-brand-500 shadow-brand hover:glow-brand-soft flex items-center gap-2"
            onClick={onAdd}
          >
            {label} <FiShoppingCart />
          </Button>

          {showShare ? (
            <button
              onClick={onShare}
              type="button"
              className="inline-flex items-center gap-2 text-xs text-white/55 transition-cyborg hover:text-white/80"
              aria-label="Compartir"
              title="Compartir"
            >
              <FiShare2 /> SHARE
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] uppercase tracking-[0.35em] text-white/55">LICENCIAS</div>

        <div className="flex items-center gap-2">
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/25 text-white/85 transition-cyborg hover:bg-white/10"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Disminuir"
            type="button"
          >
            <FiMinus />
          </button>

          <div className="min-w-6 text-center text-white">{safeQty}</div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/25 text-white/85 transition-cyborg hover:bg-white/10"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Aumentar"
            type="button"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      <Button
        className="mt-4 w-full h-12 bg-brand-500 shadow-brand hover:glow-brand-soft flex items-center justify-center gap-2 text-base"
        onClick={onAdd}
      >
        {label} <FiShoppingCart />
      </Button>
    </div>
  );
}
