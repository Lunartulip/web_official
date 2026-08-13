import type { Metadata } from "next";
import DeskPreview from "../../desk/desk-preview";

export const metadata: Metadata = {
  title: "Always-On Research Desk | AI-native Research Workspace",
  description: "See how Lunartulip Lab combines discretionary fundamental and systematic quant research to detect change, test judgment, manage portfolio constraints and learn from outcomes.",
  alternates: {
    canonical: "https://lunartuliplab.com/en/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "Always-On Research Desk | Lunartulip Lab",
    description: "Discretionary fundamental × systematic quant × a continuously operating research and decision workspace.",
    url: "https://lunartuliplab.com/en/desk",
    type: "website",
  },
};

export default function EnglishDeskPage() {
  return <DeskPreview initialLanguage="en" />;
}
