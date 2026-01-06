import type { CourseDTO } from "@/data/courses/schema";

export const course: CourseDTO = {
  slug: "cyberops-associate",
  title: "Cisco CyberOps Associate",
  shortDescription: "Fundamentos SOC: monitoreo, detección y respuesta a incidentes.",
  longDescription:
    "Aprende el rol del analista SOC, conceptos de amenazas, telemetría, eventos, alertas, SIEM, tipos de ataques y fundamentos de respuesta a incidentes. Orientado a un enfoque práctico y profesional.",
  pricePEN: 200,
  level: "Intermedio",
  durationWeeks: 6,
  includes: [
    "Ruta SOC (conceptos + práctica)",
    "Casos de uso (alertas, logs, eventos)",
    "Buenas prácticas de detección y triage",
    "Material de apoyo y checklist SOC",
    "Evaluaciones por unidad",
  ],
  tags: ["Ciberseguridad", "SOC", "SIEM", "Blue Team", "Cisco"],
  cover: "/cursos/cyberops.png",
};

export default course;
