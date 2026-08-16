/**
 * Emit physical HTML files for known SPA routes so Render can serve them
 * without a dashboard rewrite. Hashed Vite assets stay shared via /assets/.
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const index = join(dist, "index.html");

if (!existsSync(index)) {
  throw new Error(`Missing ${index}. Run vite build first.`);
}

for (const route of ["investors-v3", "investors-legacy", "investors-v2"]) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, "index.html"));
}
