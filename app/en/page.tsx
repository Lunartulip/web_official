import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Research Models, Alternative Data & Strategies for Global Technology Equities",
  description: "LunarTulip Research builds independent research models, AlphaMap alternative data and investment strategies for global technology equities, with point-in-time evidence, revisions and attribution.",
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
    title: "Lunartulip Lab — Research Models, Alternative Data & Strategies",
    description: "Independent research models, AlphaMap alternative data and investment strategies for global technology equities.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
};

export default function EnglishHomePage() {
  return <Home initialLanguage="en" />;
}
