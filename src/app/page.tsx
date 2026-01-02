import { Hero } from "@/components/home/Hero";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { PromosSection } from "@/components/home/PromosSection";

export default function HomePage() {
  return (
    <main className="bg-cyborg">
      <Hero />
      <SpecialtiesSection />
      <PromosSection />
    </main>
  );
}
