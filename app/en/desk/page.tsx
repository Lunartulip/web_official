import type { Metadata } from "next";
import DeskPreview from "../../desk/desk-preview";

export const metadata: Metadata = {
  title: "LunarTulip Research Desk | Public Preview of a Continuous Research Method",
  description: "How LunarTulip maintains technology-industry and company evidence, investment theses and forward tests. External engagements use AlphaMap licensing and scoped methodology applications.",
  alternates: {
    canonical: "https://lunartuliplab.com/en/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "LunarTulip Research Desk | Continuous Research Method",
    description: "A public preview of continuous evidence, thesis and forward-test maintenance.",
    url: "https://lunartuliplab.com/en/desk",
    type: "website",
  },
};

export default function EnglishDeskPage() {
  return <DeskPreview initialLanguage="en" />;
}
