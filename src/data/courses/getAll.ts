import { courseContent } from "@/content/courses/_index";
import { CourseSchema, type CourseDTO } from "./schema";

export function getAllCourses(): CourseDTO[] {
  const parsed = courseContent.map((c) => CourseSchema.parse(c));
  parsed.sort((a, b) => a.title.localeCompare(b.title));
  return parsed;
}
