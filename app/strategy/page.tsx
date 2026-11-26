import type { Metadata } from "next";
import StrategyPage from "./strategy-page";

export const metadata: Metadata = {
  title: "LunarTulip Strategies｜模型组合与机构策略合作",
  description: "面向全球科技股的模型组合与机构策略合作，按信号证据、样本外结果、风险预算和 PnL attribution 界定合作范围。",
  alternates: {
    canonical: "/strategy",
    languages: { "zh-CN": "/strategy", en: "/en/strategy" },
  },
  openGraph: {
    type: "website",
    url: "/strategy",
    title: "LunarTulip Strategies｜模型组合与机构策略合作",
    description: "以可复核的信号、风险与归因证据承接模型组合及机构策略合作。",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "LunarTulip Strategies" }],
  },
};

export default function StrategyRoute() {
  return <StrategyPage />;
}
