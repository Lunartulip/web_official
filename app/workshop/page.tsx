import type { Metadata } from "next";
import WorkshopPreview from "./workshop-preview";

export const metadata: Metadata = {
  title: "AI-native 投研框架 Workshop｜六次机构共同工作",
  description: "面向买方团队的六次 AI-native 投研框架 Workshop：围绕真实研究场景完成流程诊断、命题与证据结构、Agent 工作流、Risk Gate、Decision Memory 与 90 天实施路线。",
  alternates: {
    canonical: "https://lunartuliplab.com/workshop",
    languages: {
      "zh-CN": "https://lunartuliplab.com/workshop",
      en: "https://lunartuliplab.com/en/workshop",
    },
  },
  openGraph: {
    title: "AI-native 投研框架 Workshop｜Lunartulip Lab",
    description: "把现有投研方法部署成可运行、可验证、可持续更新的 AI-native 系统。",
    url: "https://lunartuliplab.com/workshop",
    type: "website",
  },
};

export default function WorkshopPage() {
  return <WorkshopPreview />;
}
