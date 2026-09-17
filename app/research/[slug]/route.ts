import { getResearchObject, researchObjects } from "@/lib/research-objects";
import { publicResearchDataset } from "@/lib/public-research";

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
      ...publicResearchDataset(item),
      usageNotice: "Public metadata supports discovery, search retrieval and attributed citation. It excludes the licensed Research API and alternative-dataset fields.",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Content-Type-Options": "nosniff",
        "X-Lunartulip-Research-Object": item.id,
        "X-Lunartulip-Research-Version": item.version,
        "X-Lunartulip-Access-Tier": "public-citation-metadata",
      },
    },
  );
}
