import type { ResearchObject } from "@/lib/research-objects";

export const RESEARCH_USAGE_URL = "https://lunartuliplab.com/research-usage";

export const publicResearchCreator = {
  "@type": "Organization",
  "@id": "https://lunartuliplab.com/#organization",
  name: "Lunartulip Lab",
  url: "https://lunartuliplab.com/",
} as const;

export const publicResearchLicense = {
  "@type": "CreativeWork",
  name: "Lunartulip Public Research Citation and Use Terms",
  url: RESEARCH_USAGE_URL,
} as const;

export function publicResearchDataset(item: ResearchObject) {
  const modifiedAt = item.versions.at(-1)?.date ?? item.publishedAt;
  const machineReadableUrl = `https://lunartuliplab.com/research/${item.slug}`;
  const canonicalZh = `https://lunartuliplab.com/deep-dive/${item.slug}`;
  const canonicalEn = `https://lunartuliplab.com/en/deep-dive/${item.slug}`;

  return {
    "@type": "Dataset",
    "@id": `${machineReadableUrl}#dataset`,
    name: item.renderings.en.title,
    alternateName: item.renderings["zh-CN"].title,
    description: item.renderings.en.standfirst,
    abstract: item.renderings.en.standfirst,
    researchQuestion: {
      "zh-CN": item.renderings["zh-CN"].question,
      en: item.renderings.en.question,
    },
    identifier: item.id,
    version: item.version,
    datePublished: item.publishedAt,
    dateModified: modifiedAt,
    temporalCoverage: `..${item.asOf}`,
    creator: publicResearchCreator,
    publisher: publicResearchCreator,
    license: publicResearchLicense,
    usageInfo: RESEARCH_USAGE_URL,
    isAccessibleForFree: true,
    inLanguage: ["zh-CN", "en"],
    keywords: [...item.tickers, item.kind, "point-in-time research", "public equities"],
    url: machineReadableUrl,
    mainEntityOfPage: machineReadableUrl,
    subjectOf: [
      {
        "@type": "ScholarlyArticle",
        name: item.renderings["zh-CN"].title,
        inLanguage: "zh-CN",
        url: canonicalZh,
      },
      {
        "@type": "ScholarlyArticle",
        name: item.renderings.en.title,
        inLanguage: "en",
        url: canonicalEn,
      },
    ],
    isPartOf: {
      "@type": "DataCatalog",
      "@id": "https://lunartuliplab.com/research.json#catalog",
      name: "Lunartulip Canonical Research Objects",
    },
    distribution: {
      "@type": "DataDownload",
      name: `${item.id} public citation metadata`,
      description: "Public discovery and citation metadata. Full structured research data is available only under a separate commercial agreement.",
      encodingFormat: "application/json",
      contentUrl: machineReadableUrl,
      license: publicResearchLicense,
    },
    citation: [canonicalZh, canonicalEn],
    publicSummary: {
      id: item.id,
      slug: item.slug,
      kind: item.kind,
      tickers: item.tickers,
      publishedAt: item.publishedAt,
      asOf: item.asOf,
      modifiedAt,
      version: item.version,
      canonical: {
        "zh-CN": canonicalZh,
        en: canonicalEn,
      },
      question: {
        "zh-CN": item.renderings["zh-CN"].question,
        en: item.renderings.en.question,
      },
      abstract: {
        "zh-CN": item.renderings["zh-CN"].standfirst,
        en: item.renderings.en.standfirst,
      },
    },
  };
}
