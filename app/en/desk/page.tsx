import type { Metadata } from "next";
import DeskPreview from "../../desk/desk-preview";

export const metadata: Metadata = {
  title: "LunarTulip Research Desk | Continuous Research for Professional Investors",
  description: "Research Desk remains LunarTulip’s continuous-research product line. AlphaMap Dataset leads the launch sequence; Desk / Pro follows in stages, with structured exports and a limited API available by scope.",
  alternates: {
    canonical: "https://lunartuliplab.com/en/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "LunarTulip Research Desk | Product Roadmap",
    description: "Theme-first Decision Objects, maintained coverage, structured exports and a limited Research API.",
    url: "https://lunartuliplab.com/en/desk",
    type: "website",
  },
};

export default function EnglishDeskPage() {
  return <DeskPreview initialLanguage="en" />;
}
