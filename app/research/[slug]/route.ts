import { getResearchObject, researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

export function generateStaticParams() {
  return researchObjects.map((item) => ({ slug: item.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getResearchObject(slug);
  if (!item) {
    return Response.json({ error: "Research object not found." }, { status: 404 });
  }

  return Response.json(
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": `https://lunartuliplab.com/research/${item.slug}#dataset`,
      name: item.renderings.en.title,
      identifier: item.id,
      version: item.version,
      datePublished: item.publishedAt,
      dateModified: item.versions.at(-1)?.date ?? item.publishedAt,
      temporalCoverage: `..${item.asOf}`,
      publisher: {
        "@type": "Organization",
        "@id": "https://lunartuliplab.com/#organization",
        name: "Lunartulip Lab",
      },
      isPartOf: "https://lunartuliplab.com/research.json",
      usageNotice: "Public metadata is provided for discovery and citation. Publication does not grant a commercial data license. Research is not investment advice.",
      canonical: {
        "zh-CN": `https://lunartuliplab.com/deep-dive/${item.slug}`,
        en: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
      },
      researchObject: item,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Lunartulip-Research-Object": item.id,
        "X-Lunartulip-Research-Version": item.version,
      },
    },
  );
}
