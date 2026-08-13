import type { Metadata } from "next";
import DeskPreview from "./desk-preview";

export const metadata: Metadata = {
  title: "Always-On Research Desk｜AI-native 研究与决策工作区",
  description: "了解 Lunartulip Lab 如何通过主观基本面与系统化量化双引擎，持续识别变化、验证判断、管理组合约束并从结果中学习。",
  alternates: {
    canonical: "https://lunartuliplab.com/desk",
    languages: {
      "zh-CN": "https://lunartuliplab.com/desk",
      en: "https://lunartuliplab.com/en/desk",
    },
  },
  openGraph: {
    title: "Always-On Research Desk｜Lunartulip Lab",
    description: "主观基本面 × 系统化量化 × 持续运行的研究与决策工作区。",
    url: "https://lunartuliplab.com/desk",
    type: "website",
  },
};

export default function DeskPage() {
  return <DeskPreview />;
}
