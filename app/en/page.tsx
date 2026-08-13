import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "AI-native Independent Public-Equities Research",
  description: "Lunartulip Lab combines discretionary fundamental research and systematic quantitative research across global AI technology equities, with versioned public research and aggregate outcome records.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en",
    siteName: "Lunartulip Lab",
    title: "Lunartulip Lab — Fundamental × Quantitative × AI-native",
    description: "Independent public-equities research with timestamped evidence, explicit validation and correction records.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
};

export default function EnglishHomePage() {
  return <Home initialLanguage="en" />;
}
