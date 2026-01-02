import type { CourseInput } from "@/data/courses/schema";

export const pythonFundamentos: CourseInput = {
  slug: "python-fundamentos",
  title: "Python Fundamentos",
  shortDescription: "Aprende Python desde cero con enfoque práctico.",
  longDescription:
    "Bases sólidas, ejercicios y mini-proyectos. Ideal para empezar a automatizar y construir.",
  pricePEN: 149,
  level: "Inicial",
  durationWeeks: 6,
  includes: ["Clases grabadas", "Retos prácticos", "Certificado de culminación"],
  tags: ["Programación", "Python"],
  cover: "/images/courses/python.jpg",
};
