import type { CourseDTO } from "@/data/courses/schema";

export const course: CourseDTO = {
  slug: "devnet",
  title: "Cisco DevNet • Automatización & APIs",
  shortDescription: "Automatiza redes: APIs, scripting y fundamentos DevOps.",
  longDescription:
    "Entra a la automatización moderna: conceptos de API, autenticación, requests, JSON, e integración con plataformas. Ideal si deseas moverte a NetDevOps y aumentar tu productividad operando redes.",
  pricePEN: 240,
  level: "Intermedio",
  durationWeeks: 6,
  includes: [
    "Fundamentos de APIs (REST)",
    "Automatización de tareas repetitivas",
    "Buenas prácticas (estructura y seguridad)",
    "Ejercicios guiados y plantillas",
    "Mini-proyecto integrador",
  ],
  tags: ["Cisco", "DevNet", "APIs", "Automatización", "NetDevOps"],
  cover: "/images/course-devnet.jpg",
};

export default course;
