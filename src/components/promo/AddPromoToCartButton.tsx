"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store";
import { Button } from "@/components/ui/button";
import { FiShoppingCart } from "react-icons/fi";

export function AddPromoToCartButton({
  slugs,
  redirectTo = "/carrito",
  label = "Comprar promoción",
}: {
  slugs: string[];
  redirectTo?: string;
  label?: string;
}) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const addMany = () => {
    if (!Array.isArray(slugs) || slugs.length === 0) return;
    slugs.forEach((slug) => addItem(slug, 1));
    router.push(redirectTo);
  };

  return (
    <Button onClick={addMany} className="bg-brand-500 hover:bg-brand-500/90">
      <FiShoppingCart className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
