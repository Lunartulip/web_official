import { researchObjects } from "@/lib/research-objects";
import {
  publicResearchCreator,
  publicResearchDataset,
  publicResearchLicense,
  RESEARCH_USAGE_URL,
} from "@/lib/public-research";

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
      description: "Public discovery and citation metadata for Lunartulip Lab's bilingual, versioned, point-in-time research objects. Full structured research data requires separate licensed access.",
      creator: publicResearchCreator,
      publisher: publicResearchCreator,
      license: publicResearchLicense,
      usageInfo: RESEARCH_USAGE_URL,
      isAccessibleForFree: true,
      dateModified: modifiedAt,
      inLanguage: ["zh-CN", "en"],
      usageNotice: "Public metadata is provided for discovery and citation. Publication does not grant a commercial data license. Research is not investment advice.",
      citationFormat: "Lunartulip Lab, [title], [research object ID], version [version], published [publishedAt], as of [asOf], [canonical URL].",
      distribution: {
        "@type": "DataDownload",
        name: "Lunartulip public citation-metadata manifest",
        description: "The complete public manifest intended for search indexing, discovery and attributed citation.",
        encodingFormat: "application/json",
        contentUrl: "https://lunartuliplab.com/research.json",
        license: publicResearchLicense,
      },
      dataset: researchObjects.map(publicResearchDataset),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
