import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Global Technology Equity Research & Alternative Data",
  description: "LunarTulip Research is an independent research firm focused on global technology equities, combining fundamental analysis, quantitative research and AlphaMap alternative data.",
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
    title: "Lunartulip Lab — Global Technology Equity Research & Alternative Data",
    description: "Independent global technology equity research combining fundamental analysis, quantitative research and AlphaMap alternative data.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
};

export default function EnglishHomePage() {
  return <Home initialLanguage="en" />;
}
