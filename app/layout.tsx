import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lunartuliplab.com"),
  title: {
    default: "LunarTulip Lab — 泛 AI 科技权益研究与 AI-native 买方决策增强",
    template: "%s | LunarTulip Lab",
  },
  description: "聚焦全球泛 AI 科技产业链的二级权益研究，跨 A 股、美股与港股追踪技术演进、产业传导与价值兑现，为专业机构提供 AI-native 买方决策增强。",
  keywords: [
    "泛 AI 科技权益研究",
    "跨市场二级权益",
    "机构 AI 投研系统",
    "买方决策增强",
    "公募私募资管家办",
    "产业链研究",
    "A股科技股研究",
    "美股AI科技股研究",
    "港股科技股研究",
    "AlphaMap",
    "AI-native investment research",
    "buy-side decision augmentation",
    "cross-market public equities",
    "active management",
    "investment research systems",
  ],
  authors: [{ name: "LunarTulip Lab", url: "/" }],
  creator: "LunarTulip Lab",
  publisher: "LunarTulip Lab",
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: "/",
    siteName: "LunarTulip Lab",
    title: "LunarTulip Lab — AI-native Decision Augmentation for Public-Equity Investors",
    description: "Public-equity research across the global AI technology value chain, connecting A-share, U.S. and Hong Kong markets with AI-native decision systems for institutional investors.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "LunarTulip Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LunarTulip Lab — AI-native Buy-side Decision Augmentation",
    description: "AI technology public-equity research and institutional decision systems.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LunarTulip Lab",
  url: "https://lunartuliplab.com",
  logo: "https://lunartuliplab.com/lunartulip-silver-emblem.png",
  email: "t.stephanie@lunartuliplab.com",
  description: "Cross-market public-equity research across the AI technology value chain and AI-native decision augmentation for institutional active management.",
  knowsAbout: [
    "AI technology public equities",
    "institutional investment research systems",
    "buy-side decision augmentation",
    "industry causal research",
    "active management",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "institutional partnerships",
    email: "t.stephanie@lunartuliplab.com",
    availableLanguage: ["Chinese", "English"],
  },
  sameAs: ["https://github.com/Lunartulip"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
