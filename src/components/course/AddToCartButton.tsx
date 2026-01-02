"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store";

type Props = {
  slug: string;
  qty?: number;
};

export function AddToCartButton({ slug, qty = 1 }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button onClick={() => addItem(slug, qty)}>
      Agregar al carrito
    </Button>
  );
}
