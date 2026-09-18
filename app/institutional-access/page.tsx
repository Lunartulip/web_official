import type { Metadata } from "next";
import InstitutionalAccess from "./institutional-access";

export const metadata: Metadata = {
  title: "Research Products & Services｜专业与机构研究入口",
  description: "索取研究样章，订阅 AI 科技主题投研 Research Desk，或讨论机器可读 Research API、Quant 买方另类数据、研究委托与六次 AI-native 投研框架 Workshop。",
  alternates: {
    canonical: "/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
  openGraph: {
    type: "website",
    url: "/institutional-access",
    title: "Research Products & Services | Lunartulip Lab",
    description: "Research samples, thematic investment intelligence subscriptions, machine-readable APIs, alternative datasets, scoped mandates and a six-session institutional research-system workshop.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Institutional Research Access" }],
  },
};

export default function InstitutionalAccessPage() {
  return <InstitutionalAccess />;
}
