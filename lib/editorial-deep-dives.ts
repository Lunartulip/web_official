import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Deep Dives whose canonical presentation is a hand-reviewed HTML document rather than the
 * DeepDiveArticle template. The research object in the catalog stays authoritative for the
 * index, sitemap, RSS and evidence ledger; the HTML file is the published surface.
 */
export const editorialDeepDiveSlugs = ["global-ai-hardware-profit-pools-2026-09"] as const;

export type EditorialDeepDiveSlug = (typeof editorialDeepDiveSlugs)[number];
export type EditorialDeepDiveLocale = "zh" | "en";

export function isEditorialDeepDive(slug: string): slug is EditorialDeepDiveSlug {
  return (editorialDeepDiveSlugs as readonly string[]).includes(slug);
}

export function readEditorialDeepDive(slug: EditorialDeepDiveSlug, locale: EditorialDeepDiveLocale) {
  return readFile(path.join(process.cwd(), "content", "editorial-deep-dives", `${slug}.${locale}.html`), "utf8");
}

export function editorialDeepDiveResponse(html: string) {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
