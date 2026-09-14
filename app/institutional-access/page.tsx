import type { Metadata } from "next";
import InstitutionalAccess from "./institutional-access";

export const metadata: Metadata = {
  title: "Research Products & Services｜专业与机构研究入口",
  description: "索取研究样章，申请 Always-On Research Desk，讨论机器可读 Research API、Quant 买方 Alternative Dataset、Commissioned Mandate 或六次 AI-native 投研框架 Workshop。",
  alternates: {
    canonical: "/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
  openGraph: {
    type: "website",
    url: "/institutional-access",
    title: "Research Products & Services | Lunartulip Lab",
    description: "Defined routes for research samples, Always-On Research Desk, machine-readable API, alternative datasets, scoped mandates and an AI-native research-framework workshop.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Institutional Research Access" }],
  },
};

export default function InstitutionalAccessPage() {
  return <InstitutionalAccess />;
}
