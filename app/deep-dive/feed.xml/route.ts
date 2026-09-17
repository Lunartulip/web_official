import { researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function GET() {
  const items = [...researchObjects]
    .filter((item) => String(item.kind) !== "alphamap-study")
    .sort((a, b) => (b.versions.at(-1)?.date ?? b.publishedAt).localeCompare(a.versions.at(-1)?.date ?? a.publishedAt))
    .map((item) => {
      const rendering = item.renderings["zh-CN"];
      const url = `https://lunartuliplab.com/deep-dive/${item.slug}`;
      const modifiedAt = item.versions.at(-1)?.date ?? item.publishedAt;
      return `<item>
  <title>${escapeXml(rendering.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="false">${item.id}@${item.version}</guid>
  <description>${escapeXml(rendering.standfirst)}</description>
  <category>${escapeXml(item.kind)}</category>
  <pubDate>${new Date(`${modifiedAt}T00:00:00Z`).toUTCString()}</pubDate>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Lunartulip Deep Dive</title>
  <link>https://lunartuliplab.com/deep-dive</link>
  <description>面向全球泛 AI 科技权益的版本化、证据驱动深度研究。</description>
  <language>zh-CN</language>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
