import type { Metadata } from "next";
import StrategyPage from "../../strategy/strategy-page";

export const metadata: Metadata = {
  title: "LunarTulip Strategies | Model Portfolios & Institutional Collaboration",
  description: "Model portfolios and institutional strategy collaboration for global technology equities, scoped through signal evidence, out-of-sample results, risk budgets and PnL attribution.",
  alternates: {
    canonical: "/en/strategy",
    languages: { "zh-CN": "/strategy", en: "/en/strategy" },
  },
  openGraph: {
    type: "website",
    url: "/en/strategy",
    title: "LunarTulip Strategies | Model Portfolios & Institutional Collaboration",
    description: "Model portfolios and institutional strategy collaboration grounded in reviewable signal, risk and attribution evidence.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "LunarTulip Strategies" }],
  },
};

export default function EnglishStrategyRoute() {
  return <StrategyPage language="en" />;
}
