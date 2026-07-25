import type { Metadata } from "next";
import DeskPreview from "./desk-preview";

export const metadata: Metadata = {
  title: "Always-On Research Desk",
  description:
    "面向机构持续共研的 AI-native Research Desk：连接事件账本、假设看板、每日简报与决策记忆。",
  alternates: {
    canonical: "/desk",
  },
  openGraph: {
    type: "website",
    url: "/desk",
    title: "Always-On Research Desk | LunarTulip Lab",
    description:
      "An always-on research collaboration environment connecting evidence, hypotheses, daily briefs and decision memory.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "LunarTulip Research Desk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Always-On Research Desk | LunarTulip Lab",
    description: "Continuous AI-native research collaboration for institutional investors.",
    images: ["/opengraph-image"],
  },
};

export default function DeskPage() {
  return <DeskPreview />;
}
