import type { Metadata } from "next";
import InstitutionalAccess from "./institutional-access";

export const metadata: Metadata = {
  title: "Institutional Research Access｜机构研究入口",
  description: "索取机构样章，申请固定周期 Research Access，提交既有 coverage 内的 Commissioned Mandate，或讨论六次 AI-native Research System Diagnostic。",
  alternates: {
    canonical: "/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
  openGraph: {
    type: "website",
    url: "/institutional-access",
    title: "Institutional Research Access | Lunartulip Lab",
    description: "Four defined institutional research routes: sample, fixed-term Research Access, scoped commissioned mandate and six-session research-system diagnostic.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Institutional Research Access" }],
  },
};

export default function InstitutionalAccessPage() {
  return <InstitutionalAccess />;
}
