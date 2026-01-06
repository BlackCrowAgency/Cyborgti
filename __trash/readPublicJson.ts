import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Lee un JSON ubicado dentro de /public de forma segura para SSR/Build.
 * Ej: readPublicJson("content/promos.json")
 */
export async function readPublicJson<T = unknown>(publicPath: string): Promise<T> {
  const clean = publicPath.replace(/^\/+/, ""); // quita "/" inicial si existe
  const abs = path.join(process.cwd(), "public", clean);
  const raw = await readFile(abs, "utf8");
  return JSON.parse(raw) as T;
}
