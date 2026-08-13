import type { Metadata } from "next";
import InstitutionalAccess from "./institutional-access";

export const metadata: Metadata = {
  title: "Institutional Research Access｜机构研究合作",
  description: "面向公募、私募、资管机构、专业家族办公室与研究团队的全球泛 AI 科技权益研究：公开研究、持续跟踪、深度研究与双引擎方法交流。",
  alternates: {
    canonical: "/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
  openGraph: {
    type: "website",
    url: "/institutional-access",
    title: "Institutional Research Access | Lunartulip Lab",
    description: "Research formats for institutions seeking verifiable work, continuous monitoring and deep research across global AI technology equities.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Institutional Research Access" }],
  },
};

export default function InstitutionalAccessPage() {
  return <InstitutionalAccess />;
}
