import type { CourseDTO } from "@/data/courses/schema";

export const course: CourseDTO = {
  slug: "ccna-200-301",
  title: "CCNA 200-301 • Associate",
  shortDescription: "Fundamentos de redes + preparación completa para CCNA (200-301).",
  longDescription:
    "Domina routing & switching, IPv4/IPv6, VLANs, OSPF, fundamentos de seguridad, wireless y automatización básica. Enfoque práctico con laboratorios y material orientado al examen CCNA 200-301.",
  pricePEN: 250,
  level: "Inicial",
  durationWeeks: 6,
  includes: [
    "Clases grabadas + sesiones de soporte",
    "Laboratorios guiados (Packet Tracer / topologías)",
    "Material descargable (resúmenes y checklists)",
    "Simulacros tipo examen",
    "Acceso a actualizaciones del contenido",
  ],
  tags: ["Cisco", "Redes", "Routing", "Switching", "CCNA"],
  cover: "/images/course-ccna.jpg",
};

export default course;
