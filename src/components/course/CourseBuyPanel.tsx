import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/course/ShareButton";
import { AddToCartButton } from "@/components/course/AddToCartButton";

import { formatPEN } from "@/lib/money";
import { CheckoutCard } from "@/components/detail/CheckoutCard";
import { TrustList } from "@/components/detail/TrustList";
import { PricingDisplay } from "@/components/detail/PricingDisplay";

export function CourseBuyPanel({
  slug,
  title,
  basePricePEN,
  finalPricePEN,
}: {
  slug: string;
  title: string;
  basePricePEN: number;
  finalPricePEN: number;
}) {
  const hasDiscount = finalPricePEN < basePricePEN;
  const diff = Math.max(0, basePricePEN - finalPricePEN);

  return (
    <CheckoutCard title="CHECKOUT" rightSlot={<ShareButton title={title} />}>
<PricingDisplay
  basePEN={basePricePEN}
  finalPEN={finalPricePEN}
  size="md"
  showSave={true}
  showPercent={false}
/>


<TrustList
  className="mt-4"
  items={["Acceso inmediato", "Soporte incluido", "Material descargable"]}
/>


      <div className="mt-5">
        <AddToCartButton
          slug={slug}
          title={title}
          label="ADQUIRIR AHORA"
          showShare={false}
          variant="ecom"
        />
        <p className="mt-2 text-xs text-white/45">
          * Mercado Pago se conecta en la siguiente etapa.
        </p>
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full border-white/20 text-white/90 hover:bg-white/10"
        >
          Consultar por WhatsApp
        </Button>
      </div>
    </CheckoutCard>
  );
}
