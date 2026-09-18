import type { Metadata } from "next";
import DeskPreview from "./desk-preview";

export const metadata: Metadata = {
  title: "Lunartulip Research Desk｜AI科技主题投研与另类数据研究台",
  description: "围绕八条 AI 科技 Coverage Track 持续维护证据、判断状态与信号，通过人读研究订阅、另类数据和机器可读 API 分别交付。",
  alternates: {
    canonical: "https://lunartuliplab.com/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "Lunartulip Research Desk｜AI科技主题投研与另类数据研究台",
    description: "围绕 AI 科技全产业链主题持续维护证据、判断状态与信号。",
    url: "https://lunartuliplab.com/desk",
    type: "website",
  },
};

export default function DeskPage() {
  return <DeskPreview />;
}
