import type { Metadata } from "next";
import DeskPreview from "../../desk/desk-preview";

export const metadata: Metadata = {
  title: "Lunartulip Research Desk | Thematic Investment Intelligence for AI Technology",
  description: "Always-on thematic investment intelligence that maintains evidence, thesis states and signals across focused AI technology themes for research subscriptions and machine-readable delivery.",
  alternates: {
    canonical: "https://lunartuliplab.com/en/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "Lunartulip Research Desk | Thematic Investment Intelligence",
    description: "Always-on evidence, thesis states and signals across focused AI technology themes.",
    url: "https://lunartuliplab.com/en/desk",
    type: "website",
  },
};

export default function EnglishDeskPage() {
  return <DeskPreview initialLanguage="en" />;
}
