import type { Metadata } from "next";
import AboutPreview from "./about-preview";

export const metadata: Metadata = {
  title: "About Lunartulip Lab",
  description: "LunarTulip Research 是聚焦全球科技股、重点研究 AI 产业链的独立研究机构，开展基本面研究、量化研究与另类数据构建。",
  alternates: {
    canonical: "/about",
    languages: {
      "zh-CN": "/about",
      en: "/en/about",
    },
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About Lunartulip Lab",
    description: "Independent global technology equity research combining fundamental analysis, quantitative research and alternative data.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://lunartuliplab.com/about#page",
  url: "https://lunartuliplab.com/about",
  name: "About Lunartulip Lab",
  inLanguage: ["zh-CN", "en"],
  mainEntity: { "@id": "https://lunartuliplab.com/#organization" },
  isPartOf: { "@id": "https://lunartuliplab.com/#website" },
  description: "About LunarTulip Research, an independent research firm focused on global technology equities, fundamental analysis, quantitative research and alternative data.",
};

export default function AboutPage() {
  return (
    <>
      <AboutPreview />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
    </>
  );
}
