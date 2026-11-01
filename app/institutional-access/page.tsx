import type { Metadata } from "next";
import InstitutionalAccess from "./institutional-access";

export const metadata: Metadata = {
  title: "机构买家与合作方案｜全球科技股研究与另类数据",
  description: "AlphaMap 科技股另类数据当前先行；Research Desk／Pro、限额 Research API 与专题投研方法按买方任务和实际需求分阶段承接。",
  alternates: {
    canonical: "/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
  openGraph: {
    type: "website",
    url: "/institutional-access",
    title: "Global Technology Equity Research & Alternative Data | LunarTulip Research",
    description: "AlphaMap leads the launch sequence; Research Desk / Pro, limited Research API access and scoped methodology engagements follow buyer tasks and validated demand.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Institutional Research Access" }],
  },
};

export default function InstitutionalAccessPage() {
  return <InstitutionalAccess />;
}
