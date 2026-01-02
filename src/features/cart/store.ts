import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

type CartState = {
  items: CartItem[];
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (slug, qty = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.slug === slug);

        if (existing) {
          set({
            items: items.map((i) =>
              i.slug === slug ? { ...i, qty: i.qty + qty } : i
            ),
          });
          return;
        }

        set({ items: [...items, { slug, qty }] });
      },

      removeItem: (slug) => {
        set({ items: get().items.filter((i) => i.slug !== slug) });
      },

      setQty: (slug, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.slug !== slug) });
          return;
        }
        set({
          items: get().items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
        });
      },

      clear: () => set({ items: [] }),
    }),
    { name: "cyborgti-cart" }
  )
);
