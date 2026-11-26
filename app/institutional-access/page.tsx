import type { Metadata } from "next";
import InstitutionalAccess from "./institutional-access";

export const metadata: Metadata = {
  title: "机构合作入口｜Research Models、AlphaMap Data 与 Strategy",
  description: "按购买对象选择持续投资判断、PIT 科技股另类数据或模型组合与机构策略合作；API、CSV、JSON、MCP 与 Skill 按工作流交付。",
  alternates: {
    canonical: "/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
  openGraph: {
    type: "website",
    url: "/institutional-access",
    title: "Research Models, AlphaMap Data & Strategy | LunarTulip Research",
    description: "Three institutional routes for ongoing judgment, point-in-time alternative data and model-portfolio or strategy collaboration.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Institutional Research Access" }],
  },
};

export default function InstitutionalAccessPage() {
  return <InstitutionalAccess />;
}
