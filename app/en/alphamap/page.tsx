import type { Metadata } from "next";
import { alphaMapStudies } from "@/lib/research-objects";
import AlphaMapIndex from "../../alphamap/alphamap-index";

export const metadata: Metadata = {
  title: "AlphaMap | Graph Signals and Cross-Sectional Measurement",
  description: "Dated graph vintages, samples and observation windows for auditing how semantic projections enter graph scores and stock diagnostics.",
  alternates: {
    canonical: "/en/alphamap",
    languages: { en: "/en/alphamap", "zh-CN": "/alphamap", "x-default": "/en/alphamap" },
  },
};

export default function EnglishAlphaMapPage() {
  const items = alphaMapStudies.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "ScholarlyArticle",
      "@id": `https://lunartuliplab.com/en/alphamap/${item.slug}#article`,
      url: `https://lunartuliplab.com/en/alphamap/${item.slug}`,
      identifier: item.id,
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
    mainEntity: {
      "@type": "CreativeWorkSeries",
      "@id": "https://lunartuliplab.com/en/alphamap#series",
      name: "AlphaMap Methods Research",
      hasPart: {
        "@type": "ItemList",
        itemListElement: items,
      },
    },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <AlphaMapIndex language="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
