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
    .sort((a, b) => b.asOf.localeCompare(a.asOf))
    .map((item) => {
      const rendering = item.renderings.en;
      const url = `https://lunartuliplab.com/en/deep-dive/${item.slug}`;
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
  <link>https://lunartuliplab.com/en/deep-dive</link>
  <description>Versioned, evidence-led research on global AI technology equities.</description>
  <language>en</language>
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
