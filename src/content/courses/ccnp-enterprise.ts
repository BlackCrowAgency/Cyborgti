import type { CourseDTO } from "@/data/courses/schema";

export const course: CourseDTO = {
  slug: "ccnp-enterprise",
  title: "CCNP Enterprise • Core & Advanced",
  shortDescription: "Diseño, operación y troubleshooting avanzado en redes enterprise.",
  longDescription:
    "Profundiza en arquitectura enterprise, routing avanzado, servicios, seguridad y troubleshooting. Ideal para perfiles que ya dominan CCNA o tienen experiencia real administrando redes.",
  pricePEN: 280,
  level: "Avanzado",
  durationWeeks: 8,
  includes: [
    "Rutas de estudio por objetivos",
    "Laboratorios avanzados (topologías enterprise)",
    "Casos de troubleshooting y buenas prácticas",
    "Plantillas de configuración y guías",
    "Evaluaciones por módulo",
  ],
  tags: ["Cisco", "Enterprise", "Routing Avanzado", "Troubleshooting", "CCNP"],
  cover: "/images/course-ccnp.jpg",
};

export default course;
