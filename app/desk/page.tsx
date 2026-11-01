import type { Metadata } from "next";
import DeskPreview from "./desk-preview";

export const metadata: Metadata = {
  title: "LunarTulip Research Desk｜面向专业投资者的持续研究产品",
  description: "Research Desk 是 LunarTulip 面向专业投资者的持续研究产品线。AlphaMap Dataset 先行，Desk／Pro 随后分阶段开放；Pro 可按约定范围提供结构化导出与限额 API。",
  alternates: {
    canonical: "https://lunartuliplab.com/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "LunarTulip Research Desk｜持续研究产品路线",
    description: "主题优先的 Decision Objects、持续 Coverage、结构化导出与限额 Research API。",
    url: "https://lunartuliplab.com/desk",
    type: "website",
  },
};

export default function DeskPage() {
  return <DeskPreview />;
}
