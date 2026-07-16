import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lunartuliplab.com"),
  title: "LunarTulip Lab — Build the system behind conviction.",
  description: "从机构投研基础系统、产业因果研究到决策闭环，为主动管理构建可持续演化的 AI-native 研究系统。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: "/",
    siteName: "LunarTulip Lab",
    title: "LunarTulip Lab — Build the system behind conviction.",
    description: "AI-native research and decision systems for active management.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
