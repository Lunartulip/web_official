import type { Metadata } from "next";
import { researchObjects } from "@/lib/research-objects";
import DeepDiveIndex from "../../deep-dive/deep-dive-index";

export const metadata: Metadata = {
  title: "Lunartulip Deep Dive | Global AI Technology Equity Research",
  description: "Versioned deep research on global AI technology companies and industries, with explicit questions, key evidence, risk boundaries, as-of dates and update histories.",
  alternates: {
    canonical: "/en/deep-dive",
    languages: { "zh-CN": "/deep-dive", en: "/en/deep-dive" },
    types: { "application/rss+xml": "/en/deep-dive/feed.xml" },
  },
  openGraph: {
    type: "website",
    url: "/en/deep-dive",
    title: "Lunartulip Deep Dive",
    description: "Canonical company and theme research objects with claim-level evidence, valuation scenarios, falsifiers and version histories.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Deep Dive" }],
  },
};

export default function EnglishDeepDivePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lunartuliplab.com/en/deep-dive#collection",
    name: "Lunartulip Deep Dive",
    inLanguage: "en",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: researchObjects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
        name: item.renderings.en.title,
      })),
    },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <DeepDiveIndex language="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
