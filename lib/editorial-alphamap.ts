import { readFile } from "node:fs/promises";
import path from "node:path";

export const editorialAlphaMapSlugs = [
  "the-projection-is-part-of-the-signal-001",
] as const;

export type EditorialAlphaMapSlug = (typeof editorialAlphaMapSlugs)[number];
export type EditorialAlphaMapLocale = "zh" | "en";

export function isEditorialAlphaMap(slug: string): slug is EditorialAlphaMapSlug {
  return (editorialAlphaMapSlugs as readonly string[]).includes(slug);
}

export function readEditorialAlphaMap(slug: EditorialAlphaMapSlug, locale: EditorialAlphaMapLocale) {
  return readFile(path.join(process.cwd(), "content", "editorial-alphamap", `${slug}.${locale}.html`), "utf8");
}

export function editorialAlphaMapResponse(html: string) {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
