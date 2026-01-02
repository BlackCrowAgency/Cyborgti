import type { CourseInput } from "@/data/courses/schema";

export const devnet: CourseInput = {
  slug: "devnet",
  title: "DevNet",
  shortDescription: "Automatización y APIs para redes: base DevNet con enfoque práctico.",
  longDescription:
    "Aprende a automatizar tareas de red con APIs y herramientas modernas. Ideal para perfiles NetOps/DevOps.",
  pricePEN: 240,
  level: "Intermedio",
  durationWeeks: 8,
  includes: ["Clases grabadas", "Proyectos", "Recursos", "Soporte por comunidad"],
  tags: ["DevNet", "Automatización", "APIs"],
  cover: "/images/courses/devnet.jpg",
};
