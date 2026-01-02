"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

type CartState = {
  items: CartItem[];

  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;

  countItems: () => number;
};

const STORAGE_KEY = "cyborgti-cart";
const STORAGE_VERSION = 2;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (slug, qty = 1) =>
        set((state) => {
          const exists = state.items.find((i) => i.slug === slug);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.slug === slug ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...state.items, { slug, qty }] };
        }),

      removeItem: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),

      setQty: (slug, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.slug === slug ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),

      clear: () => set({ items: [] }),

      countItems: () => get().items.reduce((acc, i) => acc + i.qty, 0),
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,

      // ✅ Migración PRO: si cambia el shape, normaliza y evita crashes
      migrate: (persisted: unknown) => {
        // zustand guarda algo como: { state: {...}, version: n } internamente
        // pero aquí recibimos el "state" persistido.
        const obj = persisted as Partial<CartState> | null;

        const itemsRaw = Array.isArray(obj?.items) ? obj!.items : [];

        const items = itemsRaw
          .map((x: any) => ({
            slug: typeof x?.slug === "string" ? x.slug : "",
            qty: typeof x?.qty === "number" ? x.qty : 0,
          }))
          .filter((x: any) => x.slug && x.qty > 0);

        return { items };
      },
    }
  )
);

// Alias para compatibilidad si algún componente aún importa useCart
export const useCart = useCartStore;
