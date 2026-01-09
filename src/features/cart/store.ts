"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartState } from "./types";

const STORAGE_KEY = "cyborgti-cart";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeItems(input: unknown): CartItem[] {
  if (!input) return [];

  // Forma actual: CartItem[]
  if (Array.isArray(input)) {
    return input
      .map((x: unknown) => {
        if (!isRecord(x)) return null;
        const slug = String(x.slug ?? "");
        const qty = Number(x.qty ?? 0);
        return { slug, qty };
      })
      .filter((x): x is CartItem => !!x && x.slug.length > 0 && x.qty > 0);
  }

  // Formas antiguas: { items: [...] } o { cart: [...] }
  if (isRecord(input)) {
    const items = input.items;
    const cart = input.cart;

    if (Array.isArray(items)) return normalizeItems(items);
    if (Array.isArray(cart)) return normalizeItems(cart);
  }

  return [];
}


export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
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
    migrate: (persistedState) => {
      if (isRecord(persistedState)) {
        const items = normalizeItems(
          (persistedState.items ?? persistedState.cart ?? persistedState) as unknown
        );
        return { ...persistedState, items };
      }
      return { items: [] };
      },
    }
  )
);
