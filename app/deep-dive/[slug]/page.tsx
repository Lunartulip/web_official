import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deepDives, getDeepDive } from "@/lib/deep-dives";
import DeepDiveArticle from "../deep-dive-article";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return deepDives.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getDeepDive((await params).slug);
  if (!item) return {};
  return {
    title: item.titleCn,
    description: item.thesisCn,
    alternates: {
      canonical: `/deep-dive/${item.slug}`,
      languages: { "zh-CN": `/deep-dive/${item.slug}`, en: `/en/deep-dive/${item.slug}` },
    },
    openGraph: {
      type: "article",
      url: `/deep-dive/${item.slug}`,
      title: item.titleCn,
      description: item.thesisCn,
      publishedTime: item.publishedAt,
      modifiedTime: "2026-08-08",
      authors: ["Lunartulip Lab"],
      tags: [...item.tickers, "AI technology public equities", "Lunartulip Deep Dive"],
    },
  };
}

export default async function DeepDiveDetailPage({ params }: Props) {
  const item = getDeepDive((await params).slug);
  if (!item) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.titleCn,
    description: item.thesisCn,
    datePublished: item.publishedAt,
    dateModified: "2026-08-08",
    version: item.version,
    inLanguage: "zh-CN",
    mainEntityOfPage: `https://lunartuliplab.com/deep-dive/${item.slug}`,
    about: item.tickers.map((ticker) => ({ "@type": "Corporation", tickerSymbol: ticker })),
    author: { "@id": "https://lunartuliplab.com/#organization" },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <DeepDiveArticle item={item} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
