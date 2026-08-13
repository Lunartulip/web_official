import type { Metadata } from "next";
import AboutPreview from "./about-preview";

export const metadata: Metadata = {
  title: "About Lunartulip Lab",
  description: "Lunartulip Lab 是聚焦全球泛 AI 科技权益的 AI-native 独立研究机构，以主观基本面与系统化量化双研究引擎持续产生、验证和更新判断。",
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
    description: "AI-native independent public-equities research combining discretionary fundamental and systematic quantitative research.",
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
  description: "About Lunartulip Lab, an AI-native independent research institution covering global AI technology equities through discretionary fundamental and systematic quantitative research.",
};

export default function AboutPage() {
  return (
    <>
      <AboutPreview />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
    </>
  );
}
