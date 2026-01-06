import type { CourseDTO } from "@/data/courses/schema";

export const course: CourseDTO = {
  slug: "it-essentials",
  title: "IT Essentials • Soporte & Fundamentos TI",
  shortDescription: "Hardware, sistemas, redes básicas y troubleshooting profesional.",
  longDescription:
    "Base sólida para iniciar en TI: componentes de PC, sistemas operativos, redes básicas, seguridad esencial, soporte y diagnóstico. Enfoque práctico para roles helpdesk/soporte técnico.",
  pricePEN: 200,
  level: "Inicial",
  durationWeeks: 5,
  includes: [
    "Fundamentos de hardware y mantenimiento",
    "Troubleshooting paso a paso",
    "Conceptos clave de redes y seguridad",
    "Guías y plantillas para soporte",
    "Evaluaciones prácticas",
  ],
  tags: ["Soporte", "Hardware", "Troubleshooting", "IT", "Fundamentos"],
  cover: "/cursos/it_essentials.png",
};

export default course;
