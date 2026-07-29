import type { Metadata } from "next";
import AboutPreview from "./about-preview";

export const metadata: Metadata = {
  title: "About Lunartulip Lab",
  description: "Lunartulip Lab 是面向机构主动管理的 AI-native 投研系统实验室，聚焦全球泛 AI 科技产业链的跨市场二级权益研究。",
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
    description: "AI-native institutional research systems for active public-equity investors.",
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
  description: "Canonical entity page for Lunartulip Lab, its institutional services, research scope and long-term direction.",
};

export default function AboutPage() {
  return (
    <>
      <AboutPreview />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
    </>
  );
}
