import type { Metadata } from "next";
import { headers } from "next/headers";
import { INSTITUTIONAL_EMAIL } from "@/lib/contact";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lunartuliplab.com"),
  title: {
    default: "LunarTulip Research｜全球科技股的基本面与量化研究",
    template: "%s | Lunartulip Lab",
  },
  description: "聚焦全球科技股与 AI 产业链的独立研究机构，结合基本面分析、量化研究和 AlphaMap 另类数据，支持股票选择、投资假设跟踪与主题研究。",
  keywords: [
    "全球科技股研究",
    "独立权益研究机构",
    "基本面与量化研究",
    "系统化权益研究",
    "基本面量化",
    "投资假设跟踪",
    "科技股另类数据",
    "产业链研究",
    "A股科技股研究",
    "美股AI科技股研究",
    "港股科技股研究",
    "AlphaMap",
    "Lunartulip Deep Dive",
    "Authority Ledger",
    "专题投研方法与应用",
    "可验证研究记录",
    "global technology equity research",
    "alternative data",
    "investment thesis monitoring",
    "systematic equity research",
    "quantamental research",
  ],
  authors: [{ name: "Lunartulip Lab", url: "/" }],
  creator: "Lunartulip Lab",
  publisher: "Lunartulip Lab",
  category: "Technology",
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: "/",
    siteName: "Lunartulip Lab",
    title: "LunarTulip Research — Global Technology Equity Research & Alternative Data",
    description: "Fundamental analysis, quantitative research and AlphaMap alternative data for global technology equities.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LunarTulip Research — Global Technology Equity Research & Alternative Data",
    description: "Fundamental and quantitative research for global technology equities.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lunartuliplab.com/#organization",
      name: "Lunartulip Lab",
      alternateName: ["LunarTulip Lab", "Lunar Tulip Lab", "Lunartulip Research", "LunarTulip Research"],
      url: "https://lunartuliplab.com/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://lunartuliplab.com/#logo",
        url: "https://lunartuliplab.com/lunartulip-silver-emblem.png",
      },
      email: INSTITUTIONAL_EMAIL,
      description: "Independent research on global technology equities, combining fundamental analysis, quantitative research and AlphaMap alternative data.",
      knowsAbout: [
        "global technology equities",
        "fundamental equity research",
        "systematic equity research",
        "quantamental research",
        "investment thesis monitoring",
        "AlphaMap alternative data",
        "point-in-time research",
        "research outcome ledgers",
        "AI technology value-chain research",
        "industry causal research",
        "industry causal mapping",
        "value-chain signal research",
        "active management",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "institutional research and data partnership",
        email: INSTITUTIONAL_EMAIL,
        availableLanguage: ["Chinese", "English"],
      },
      makesOffer: [
        {
          "@type": "Offer",
          price: "300000",
          priceCurrency: "CNY",
          itemOffered: {
            "@type": "Service",
            name: "AlphaMap Technology Equity Alternative Data",
            serviceType: "Annual alternative-data license",
            description: "Structured research inputs on technology-industry relationships, company operating conditions and changes over time, licensed by defined coverage and use.",
            url: "https://lunartuliplab.com/institutional-access#intent-alternative_dataset",
          },
        },
        {
          "@type": "Offer",
          price: "150000",
          priceCurrency: "CNY",
          itemOffered: {
            "@type": "Service",
            name: "Scoped Research Methodology & Application",
            serviceType: "Defined-scope investment research methodology engagement",
            description: "A scoped project applying a research methodology to one defined investment research question, with agreed outputs, necessary modules, documentation and handoff.",
            url: "https://lunartuliplab.com/institutional-access#intent-research_access",
          },
        },
      ],
      sameAs: ["https://github.com/Lunartulip"],
    },
    {
      "@type": "WebSite",
      "@id": "https://lunartuliplab.com/#website",
      url: "https://lunartuliplab.com/",
      name: "Lunartulip Lab",
      alternateName: ["LunarTulip Lab", "Lunar Tulip Lab"],
      description: "Official website and public research archive of Lunartulip Lab.",
      publisher: {
        "@id": "https://lunartuliplab.com/#organization",
      },
      hasPart: [
        {
          "@type": "DataCatalog",
          "@id": "https://lunartuliplab.com/research.json#catalog",
          url: "https://lunartuliplab.com/research.json",
        },
        {
          "@type": ["CreativeWorkSeries", "CollectionPage"],
          "@id": "https://lunartuliplab.com/en/alphamap#collection",
          name: "Lunartulip AlphaMap",
          url: "https://lunartuliplab.com/en/alphamap",
          description: "A bilingual methods-research series testing dated semantic networks, graph signals and cross-sectional stock factors across the AI technology stack.",
          inLanguage: ["en", "zh-CN"],
        },
      ],
      inLanguage: ["en", "zh-CN"],
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-lunartulip-locale") === "en" ? "en" : "zh-CN";
  return (
    <html lang={locale}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
