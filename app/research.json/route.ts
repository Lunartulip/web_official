import { researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

export async function GET() {
  const modifiedAt = researchObjects
    .map((item) => item.versions.at(-1)?.date ?? item.publishedAt)
    .sort()
    .at(-1);

  return Response.json(
    {
      "@context": "https://schema.org",
      "@type": "DataCatalog",
      "@id": "https://lunartuliplab.com/research.json#catalog",
      name: "Lunartulip Canonical Research Objects",
      publisher: {
        "@type": "Organization",
        "@id": "https://lunartuliplab.com/#organization",
        name: "Lunartulip Lab",
        url: "https://lunartuliplab.com/",
      },
      dateModified: modifiedAt,
      inLanguage: ["zh-CN", "en"],
      usageNotice: "Public metadata is provided for discovery and citation. Publication does not grant a commercial data license. Research is not investment advice.",
      citationFormat: "Lunartulip Lab, [title], [research object ID], version [version], published [publishedAt], as of [asOf], [canonical URL].",
      dataset: researchObjects.map((item) => ({
        ...item,
        canonical: {
          "zh-CN": `https://lunartuliplab.com/deep-dive/${item.slug}`,
          en: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
        },
        machineReadable: `https://lunartuliplab.com/research/${item.slug}`,
        dateModified: item.versions.at(-1)?.date ?? item.publishedAt,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
