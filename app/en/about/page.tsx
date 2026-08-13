import type { Metadata } from "next";
import AboutPreview from "../../about/about-preview";

export const metadata: Metadata = {
  title: "About Lunartulip Lab",
  description: "Lunartulip Lab is an AI-native independent research institution combining discretionary fundamental and systematic quantitative research across global AI technology equities.",
  alternates: {
    canonical: "/en/about",
    languages: {
      "zh-CN": "/about",
      en: "/en/about",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/about",
    title: "About Lunartulip Lab",
    description: "Independent global AI technology equity research combining discretionary fundamental insight with systematic quantitative validation.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://lunartuliplab.com/en/about#page",
  url: "https://lunartuliplab.com/en/about",
  name: "About Lunartulip Lab",
  inLanguage: "en",
  mainEntity: { "@id": "https://lunartuliplab.com/#organization" },
  isPartOf: { "@id": "https://lunartuliplab.com/#website" },
};

export default function EnglishAboutPage() {
  return (
    <>
      <AboutPreview initialLanguage="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
