"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartState } from "./types";

const STORAGE_KEY = "cyborgti-cart";

function normalizeItems(input: unknown): CartItem[] {
  if (!input) return [];

  // Si ya es la forma actual
  if (Array.isArray(input)) {
    return input
      .map((x: any) => ({
        slug: String(x?.slug ?? ""),
        qty: Number(x?.qty ?? 0),
      }))
      .filter((x) => x.slug && x.qty > 0);
  }

  // Si antes guardaste algo como { cart: [...] } o similar
  if (typeof input === "object") {
    const anyObj = input as any;

    if (Array.isArray(anyObj.items)) return normalizeItems(anyObj.items);
    if (Array.isArray(anyObj.cart)) return normalizeItems(anyObj.cart);
  }

  return [];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (slug, qty = 1) => {
        const cleanSlug = String(slug);
        const addQty = Math.max(1, Math.floor(qty));

        set((state) => {
          const found = state.items.find((i) => i.slug === cleanSlug);
          if (!found) return { items: [...state.items, { slug: cleanSlug, qty: addQty }] };

          return {
            items: state.items.map((i) =>
              i.slug === cleanSlug ? { ...i, qty: i.qty + addQty } : i
            ),
          };
        });
      },

      removeItem: (slug) => {
        const cleanSlug = String(slug);
        set((state) => ({ items: state.items.filter((i) => i.slug !== cleanSlug) }));
      },

      setQty: (slug, qty) => {
        const cleanSlug = String(slug);
        const nextQty = Math.max(0, Math.floor(qty));

        set((state) => {
          if (nextQty === 0) return { items: state.items.filter((i) => i.slug !== cleanSlug) };

          return {
            items: state.items.map((i) =>
              i.slug === cleanSlug ? { ...i, qty: nextQty } : i
            ),
          };
        });
      },

      clear: () => set({ items: [] }),

      setItems: (items) => set({ items: normalizeItems(items) }),
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => localStorage),

      migrate: (persistedState, fromVersion) => {
        // Si había algo guardado viejo, lo normalizamos a { items: CartItem[] }
        const anyState = persistedState as any;

        // Caso típico: persistedState ya es { items: [...] }
        if (anyState && typeof anyState === "object") {
          const items = normalizeItems(anyState.items ?? anyState.cart ?? anyState);
          return { ...anyState, items };
        }

        return { items: [] };
      },
    }
  )
);

/**
 * Alias para compatibilidad con código viejo que importaba useCart.
 * Así no vuelves a romper imports.
 */
export const useCart = useCartStore;
