import type { Metadata } from "next";
import { alphaMapWhitepapers } from "@/lib/alphamap-whitepapers";
import { alphaMapStudies } from "@/lib/research-objects";
import AlphaMapIndex from "../../alphamap/alphamap-index";

export const metadata: Metadata = {
  title: "AlphaMap | Turning FinLLM-KG into Tradable Technology-Equity Factors",
  description: "AlphaMap studies the economic meaning, time and state transitions of financial knowledge graphs, and how graph structures map into medium- and low-frequency factors for global technology-equity growth and rotation.",
  alternates: {
    canonical: "/en/alphamap",
    languages: { en: "/en/alphamap", "zh-CN": "/alphamap", "x-default": "/en/alphamap" },
  },
};

export default function EnglishAlphaMapPage() {
  const whitepapers = alphaMapWhitepapers.map((item) => ({
    "@type": "ListItem",
    position: Number(item.number),
    item: {
      "@type": "Article",
      "@id": `https://lunartuliplab.com/alphamap/${item.slug}#article`,
      url: `https://lunartuliplab.com/alphamap/${item.slug}`,
      name: item.title,
      headline: item.title,
      alternativeHeadline: item.subtitle,
      datePublished: item.publishedAt,
      inLanguage: "zh-CN",
    },
  }));
  const items = alphaMapStudies.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "ScholarlyArticle",
      "@id": `https://lunartuliplab.com/en/alphamap/${item.slug}#article`,
      url: `https://lunartuliplab.com/en/alphamap/${item.slug}`,
      name: `${item.sourceLabel}: ${item.renderings.en.title}`,
      identifier: item.doi
        ? [
            item.id,
            { "@type": "PropertyValue", propertyID: "DOI", value: item.doi },
          ]
        : item.id,
      sameAs: item.doi ? `https://doi.org/${item.doi}` : undefined,
      headline: item.renderings.en.title,
      datePublished: item.publishedAt,
      dateModified: item.versions.at(-1)?.date ?? item.publishedAt,
    },
  }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lunartuliplab.com/en/alphamap#collection",
    name: "Lunartulip AlphaMap",
    inLanguage: "en",
    mainEntity: [
      {
        "@type": "CreativeWorkSeries",
        "@id": "https://lunartuliplab.com/alphamap#whitepaper-series",
        name: "AlphaMap Whitepaper Series",
        description: "From FinLLM-KG and economic networks to tradable medium- and low-frequency factors for global technology equities.",
        hasPart: {
          "@type": "ItemList",
          itemListElement: whitepapers,
        },
      },
      {
        "@type": "CreativeWorkSeries",
        "@id": "https://lunartuliplab.com/alphamap#series",
        name: "Lunartulip AlphaMap DOI Empirical Research Series",
        hasPart: {
          "@type": "ItemList",
          itemListElement: items,
        },
      },
    ],
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <AlphaMapIndex language="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
