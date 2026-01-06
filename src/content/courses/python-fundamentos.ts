import type { CourseDTO } from "@/data/courses/schema";

export const course: CourseDTO = {
  slug: "python-fundamentos",
  title: "Python • Fundamentos",
  shortDescription: "Bases sólidas de Python para automatización y proyectos reales.",
  longDescription:
    "Aprende Python desde cero: sintaxis, estructuras de datos, funciones, módulos, manejo de errores y buenas prácticas. Ideal para iniciar automatización, scripts y bases para DevNet/NetDevOps.",
  pricePEN: 180,
  level: "Inicial",
  durationWeeks: 5,
  includes: [
    "Ejercicios prácticos por tema",
    "Mini-proyectos (scripts útiles)",
    "Buenas prácticas y estructura",
    "Material descargable",
    "Evaluaciones por módulo",
  ],
  tags: ["Python", "Programación", "Automatización", "Fundamentos"],
  cover: "/cursos/python.png",
};

export default course;
