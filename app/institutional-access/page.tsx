import type { Metadata } from "next";
import InstitutionalAccess from "./institutional-access";

export const metadata: Metadata = {
  title: "机构买家与合作方案｜全球科技股研究与另类数据",
  description: "面向系统化权益、基本面权益和投资研究平台，提供 AlphaMap 科技股另类数据与固定范围的专题投研方法与应用。",
  alternates: {
    canonical: "/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
  openGraph: {
    type: "website",
    url: "/institutional-access",
    title: "Global Technology Equity Research & Alternative Data | LunarTulip Research",
    description: "AlphaMap alternative data and scoped research-methodology engagements for systematic equity teams, fundamental investors and investment platforms.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Institutional Research Access" }],
  },
};

export default function InstitutionalAccessPage() {
  return <InstitutionalAccess />;
}
