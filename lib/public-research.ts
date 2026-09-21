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
  const collectionPath = item.kind === "alphamap-study" ? "alphamap" : "deep-dive";
  const canonicalZh = `https://lunartuliplab.com/${collectionPath}/${item.slug}`;
  const canonicalEn = `https://lunartuliplab.com/en/${collectionPath}/${item.slug}`;
  const seriesLabel = item.kind === "alphamap-study" ? item.sourceLabel.split(" · ")[0] : null;

  return {
    "@type": "Dataset",
    "@id": `${machineReadableUrl}#dataset`,
    name: seriesLabel ? `${seriesLabel}: ${item.renderings.en.title}` : item.renderings.en.title,
    alternateName: seriesLabel ? `${seriesLabel}: ${item.renderings["zh-CN"].title}` : item.renderings["zh-CN"].title,
    description: item.renderings.en.standfirst,
    abstract: item.renderings.en.standfirst,
    researchQuestion: {
      en: item.renderings.en.question,
      "zh-CN": item.renderings["zh-CN"].question,
    },
    identifier: item.doi
      ? [
          item.id,
          {
            "@type": "PropertyValue",
            propertyID: "DOI",
            value: item.doi,
            url: `https://doi.org/${item.doi}`,
          },
        ]
      : item.id,
    version: item.version,
    datePublished: item.publishedAt,
    dateModified: modifiedAt,
    temporalCoverage: `..${item.asOf}`,
    creator: publicResearchCreator,
    publisher: publicResearchCreator,
    license: publicResearchLicense,
    usageInfo: RESEARCH_USAGE_URL,
    isAccessibleForFree: true,
    inLanguage: ["en", "zh-CN"],
    keywords: [...item.tickers, item.kind, "point-in-time research", "public equities"],
    url: machineReadableUrl,
    mainEntityOfPage: machineReadableUrl,
    subjectOf: [
      {
        "@type": "ScholarlyArticle",
        name: seriesLabel ? `${seriesLabel}: ${item.renderings.en.title}` : item.renderings.en.title,
        inLanguage: "en",
        url: canonicalEn,
      },
      {
        "@type": "ScholarlyArticle",
        name: seriesLabel ? `${seriesLabel}: ${item.renderings["zh-CN"].title}` : item.renderings["zh-CN"].title,
        inLanguage: "zh-CN",
        url: canonicalZh,
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
    citation: item.doi
      ? [canonicalEn, canonicalZh, `https://doi.org/${item.doi}`]
      : [canonicalEn, canonicalZh],
    publicSummary: {
      id: item.id,
      slug: item.slug,
      kind: item.kind,
      tickers: item.tickers,
      publishedAt: item.publishedAt,
      asOf: item.asOf,
      modifiedAt,
      version: item.version,
      sourceLabel: item.sourceLabel,
      doi: item.doi ?? null,
      canonical: {
        en: canonicalEn,
        "zh-CN": canonicalZh,
      },
      question: {
        en: item.renderings.en.question,
        "zh-CN": item.renderings["zh-CN"].question,
      },
      abstract: {
        en: item.renderings.en.standfirst,
        "zh-CN": item.renderings["zh-CN"].standfirst,
      },
    },
  };
}
