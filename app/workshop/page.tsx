import type { Metadata } from "next";
import WorkshopPreview from "./workshop-preview";

export const metadata: Metadata = {
  title: "AI-native Research System Workshop",
  description: "面向主动投资机构的 6-Session AI-native 投研系统部署：从流程诊断、研究命题与 Agent 工作流，到 Risk Gate、Decision Memory 和 90 天实施路线。",
  alternates: {
    canonical: "/workshop",
    languages: {
      "zh-CN": "/workshop",
      en: "/en/workshop",
    },
  },
  openGraph: {
    type: "website",
    url: "/workshop",
    title: "AI-native Research System Workshop | Lunartulip Lab",
    description: "Six working sessions to install a traceable research operating system for active investment teams.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab Research System Workshop" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://lunartuliplab.com/workshop#service",
      name: "AI-native Research System Workshop",
      alternateName: "AI-native Research System Deployment",
      url: "https://lunartuliplab.com/workshop",
      provider: { "@id": "https://lunartuliplab.com/#organization" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Public funds, private funds, asset managers and professional family offices",
      },
      serviceType: "Institutional investment research system deployment",
      description: "A six-session institutional engagement that installs a traceable research foundation, agent workflows, risk gates and decision memory.",
      offers: [
        {
          "@type": "Offer",
          priceCurrency: "CNY",
          price: "100000",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "CNY",
            minPrice: "100000",
          },
          description: "Starting price for six sessions; customization, taxes and travel quoted separately.",
          availability: "https://schema.org/LimitedAvailability",
          url: "https://lunartuliplab.com/workshop",
        },
        {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "15000",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: "15000",
          },
          description: "Starting price for international institutional engagements.",
          availability: "https://schema.org/LimitedAvailability",
          url: "https://lunartuliplab.com/en/workshop",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://lunartuliplab.com/workshop#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "六个 Session 是培训课程吗？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "六个 Session 围绕机构的真实研究场景共同工作，目标是部署可运行的研究基础、工作流、验收规则和实施路线。",
          },
        },
        {
          "@type": "Question",
          name: "完成 Workshop 后是否必须进入 Research Desk？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "无需强制进入。完成后机构可以独立实施，也可以进入边界清晰的 Research Desk 付费试点。",
          },
        },
        {
          "@type": "Question",
          name: "是否需要在首次沟通中提供持仓或敏感数据？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "不需要。首次沟通只确认机构类型、研究场景、主要瓶颈和数据边界。",
          },
        },
      ],
    },
  ],
};

export default function WorkshopPage() {
  return (
    <>
      <WorkshopPreview />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
