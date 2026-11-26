import type { Metadata } from "next";
import DeskPreview from "./desk-preview";

export const metadata: Metadata = {
  title: "LunarTulip Research Desk｜Research Models 的持续判断界面",
  description: "Research Desk 是 Research Models 的可读展示与持续交付界面，围绕科技股主题更新命题、变量、情景与 revision；结构化导出和 API 按工作流交付。",
  alternates: {
    canonical: "https://lunartuliplab.com/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "LunarTulip Research Desk｜持续投资判断与 Research Models",
    description: "主题优先的 Decision Objects、持续 Coverage、revision 与可选机器交付。",
    url: "https://lunartuliplab.com/desk",
    type: "website",
  },
};

export default function DeskPage() {
  return <DeskPreview />;
}
