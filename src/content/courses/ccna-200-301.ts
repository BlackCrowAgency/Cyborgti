import type { CourseInput } from "@/data/courses/schema";

export const ccna200301: CourseInput = {
  slug: "ccna-200-301",
  title: "CCNA 200-301",
  shortDescription: "Ruta completa para redes con enfoque a certificación.",
  longDescription:
    "Programa estructurado para avanzar por módulos, practicar y preparar el examen. Ideal para autodidactas.",
  pricePEN: 200,
  level: "Intermedio",
  durationWeeks: 10,
  includes: ["Acceso a plataforma", "Clases grabadas", "Soporte por comunidad"],
  tags: ["Redes", "Cisco", "Certificación"],
  cover: "/images/courses/ccna.jpg",
};
