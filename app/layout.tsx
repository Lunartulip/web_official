import type { Metadata } from "next";
import { headers } from "next/headers";
import { INSTITUTIONAL_EMAIL } from "@/lib/contact";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lunartuliplab.com"),
  title: {
    default: "Lunartulip Lab — AI-native 独立科技权益研究机构",
    template: "%s | Lunartulip Lab",
  },
  description: "聚焦全球泛 AI 科技权益的 AI-native 独立研究机构，以主观基本面研究与系统化量化研究双引擎，持续发布可验证、可更正的研究记录。",
  keywords: [
    "泛 AI 科技权益研究",
    "跨市场二级权益",
    "独立科技权益研究机构",
    "主观基本面研究",
    "系统化量化研究",
    "产业链研究",
    "A股科技股研究",
    "美股AI科技股研究",
    "港股科技股研究",
    "AlphaMap",
    "Lunartulip Deep Dive",
    "Authority Ledger",
    "Always-On Research Desk",
    "可验证研究记录",
    "AI-native investment research",
    "discretionary fundamental research",
    "systematic quantitative research",
    "cross-market public equities",
    "active management",
    "investment research systems",
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
    title: "Lunartulip Lab — AI-native Independent Public-Equities Research",
    description: "Discretionary fundamental and systematic quantitative research across global AI technology equities, published with timestamped evidence and outcome records.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunartulip Lab — Fundamental × Quantitative × AI-native",
    description: "Independent public-equities research across global AI technology markets.",
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
      alternateName: ["LunarTulip Lab", "Lunar Tulip Lab"],
      url: "https://lunartuliplab.com/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://lunartuliplab.com/#logo",
        url: "https://lunartuliplab.com/lunartulip-silver-emblem.png",
      },
      email: INSTITUTIONAL_EMAIL,
      description: "AI-native independent public-equities research across global AI technology markets, combining discretionary fundamental research and systematic quantitative research.",
      knowsAbout: [
        "AI technology public equities",
        "discretionary fundamental research",
        "systematic quantitative research",
        "point-in-time research",
        "research outcome ledgers",
        "AI-native research infrastructure",
        "AI-native research and decision workspace",
        "continuous research monitoring",
        "decision memory",
        "industry causal research",
        "active management",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "institutional research exchange",
        email: INSTITUTIONAL_EMAIL,
        availableLanguage: ["Chinese", "English"],
      },
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
      inLanguage: ["zh-CN", "en"],
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
