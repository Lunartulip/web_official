import type { Metadata } from "next";
import InstitutionalAccess from "../../institutional-access/institutional-access";

export const metadata: Metadata = {
  title: "Institutional Access | Research Models, AlphaMap Data & Strategy",
  description: "Choose ongoing investment judgment, point-in-time technology-equity alternative data, or model-portfolio and institutional strategy collaboration.",
  alternates: {
    canonical: "/en/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
};

export default function EnglishInstitutionalAccessPage() {
  return <InstitutionalAccess language="en" />;
}
