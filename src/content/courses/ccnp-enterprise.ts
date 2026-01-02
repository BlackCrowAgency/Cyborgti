import type { CourseInput } from "@/data/courses/schema";

export const ccnpEnterprise: CourseInput = {
  slug: "ccnp-enterprise",
  title: "CCNP Enterprise",
  shortDescription: "Arquitectura enterprise: routing, switching y troubleshooting avanzado.",
  longDescription:
    "Ruta enfocada en fundamentos enterprise y preparación para certificación. Laboratorios guiados, prácticas y enfoque real.",
  pricePEN: 280,
  level: "Avanzado",
  durationWeeks: 12,
  includes: ["Clases grabadas", "Laboratorios", "Material descargable", "Soporte por comunidad"],
  tags: ["Cisco", "Enterprise", "Redes"],
  cover: "/images/courses/ccnp.jpg",
};
