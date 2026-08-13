import type { Metadata } from "next";
import DeepDiveIndex from "../../deep-dive/deep-dive-index";

export const metadata: Metadata = {
  title: "Lunartulip Deep Dive | Global AI Technology Equity Research",
  description: "Versioned deep research on global AI technology companies and industries, with explicit questions, key evidence, risk boundaries, as-of dates and update histories.",
  alternates: {
    canonical: "/en/deep-dive",
    languages: { "zh-CN": "/deep-dive", en: "/en/deep-dive" },
  },
};

export default function EnglishDeepDivePage() {
  return <DeepDiveIndex language="en" />;
}
