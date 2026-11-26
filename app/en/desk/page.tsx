import type { Metadata } from "next";
import DeskPreview from "../../desk/desk-preview";

export const metadata: Metadata = {
  title: "LunarTulip Research Desk | Continuous Judgment for Research Models",
  description: "Research Desk is the readable showroom and continuous delivery surface for Research Models, maintaining theses, variables, scenarios and revisions with optional machine delivery.",
  alternates: {
    canonical: "https://lunartuliplab.com/en/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "LunarTulip Research Desk | Research Models Delivery",
    description: "Theme-first Decision Objects, maintained coverage, revisions and optional machine delivery.",
    url: "https://lunartuliplab.com/en/desk",
    type: "website",
  },
};

export default function EnglishDeskPage() {
  return <DeskPreview initialLanguage="en" />;
}
