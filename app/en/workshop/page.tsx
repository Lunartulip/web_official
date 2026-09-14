import type { Metadata } from "next";
import WorkshopPreview from "../../workshop/workshop-preview";

export const metadata: Metadata = {
  title: "AI-native Research Framework Workshop | Six Institutional Sessions",
  description: "A six-session workshop for buy-side teams to map research workflows, thesis and evidence structures, agent workflows, risk gates, decision memory and a 90-day implementation roadmap.",
  alternates: {
    canonical: "https://lunartuliplab.com/en/workshop",
    languages: {
      "zh-CN": "https://lunartuliplab.com/workshop",
      en: "https://lunartuliplab.com/en/workshop",
    },
  },
  openGraph: {
    title: "AI-native Research Framework Workshop | Lunartulip Lab",
    description: "Install an existing investment-research method as an operating, testable and continuously improving AI-native system.",
    url: "https://lunartuliplab.com/en/workshop",
    type: "website",
  },
};

export default function EnglishWorkshopPage() {
  return <WorkshopPreview initialLanguage="en" />;
}
