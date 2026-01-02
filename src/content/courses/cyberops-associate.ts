import type { CourseInput } from "@/data/courses/schema";

export const cyberopsAssociate: CourseInput = {
  slug: "cyberops-associate",
  title: "CyberOps Associate",
  shortDescription: "SOC fundamentals: monitoreo, eventos, alertas y respuesta inicial.",
  longDescription:
    "Ruta para iniciar en operaciones de ciberseguridad: conceptos, herramientas, análisis básico y mentalidad SOC.",
  pricePEN: 200,
  level: "Intermedio",
  durationWeeks: 8,
  includes: ["Clases grabadas", "Casos prácticos", "Recursos y guías", "Soporte por comunidad"],
  tags: ["CyberOps", "SOC", "Ciberseguridad"],
  cover: "/images/courses/cyberops.jpg",
};
