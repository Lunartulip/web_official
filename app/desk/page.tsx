import type { Metadata } from "next";
import DeskPreview from "./desk-preview";

export const metadata: Metadata = {
  title: "LunarTulip Research Desk｜持续研究方法公开预览",
  description: "展示 LunarTulip 如何持续维护科技产业与公司证据、投资假设和验证节点；对外合作以 AlphaMap 数据授权和专题投研方法与应用为准。",
  alternates: {
    canonical: "https://lunartuliplab.com/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "LunarTulip Research Desk｜持续研究方法公开预览",
    description: "科技产业与公司证据、投资假设和验证节点的持续研究方法。",
    url: "https://lunartuliplab.com/desk",
    type: "website",
  },
};

export default function DeskPage() {
  return <DeskPreview />;
}
