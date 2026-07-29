import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "AI-native Research Systems for Institutional Active Management",
  description: "Lunartulip Lab deploys AI-native research systems and the Always-On Research Desk for funds, asset managers and professional family offices across global AI technology public equities.",
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
    title: "Lunartulip Lab — AI-native Research Systems for Active Management",
    description: "Install a traceable research foundation, then keep it operating through the Always-On Research Desk.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
};

export default function EnglishHomePage() {
  return <Home initialLanguage="en" />;
}
