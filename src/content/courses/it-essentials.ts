import type { CourseInput } from "@/data/courses/schema";

export const itEssentials: CourseInput = {
  slug: "it-essentials",
  title: "IT Essentials",
  shortDescription: "Fundamentos de hardware, software, redes y soporte técnico.",
  longDescription:
    "Ideal para comenzar en IT: diagnóstico, componentes, sistemas operativos y base de redes. Enfoque práctico.",
  pricePEN: 200,
  level: "Inicial",
  durationWeeks: 6,
  includes: ["Clases grabadas", "Retos prácticos", "Certificado de culminación"],
  tags: ["IT", "Soporte", "Fundamentos"],
  cover: "/images/courses/itess.jpg",
};
