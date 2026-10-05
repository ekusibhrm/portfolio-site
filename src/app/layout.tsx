import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const siteUrl = "https://portfolio-site-zeta-indol.vercel.app";
const title = "Hiromu | Laravel × AI駆動開発エンジニア";
const description =
  "PHP/Laravel歴8年、Claude Codeを活用したAI駆動開発が得意なエンジニアのポートフォリオです。要件定義から設計・実装・テストまでを一気通貫で担当します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Hiromu",
  },
  description,
  keywords: [
    "Laravel",
    "PHP",
    "Next.js",
    "Claude Code",
    "AI駆動開発",
    "Webエンジニア",
    "ポートフォリオ",
  ],
  authors: [{ name: "Hiromu" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Hiromu Portfolio",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-900 text-slate-200">
        <div className="ambient-backdrop" />
        <div className="grain-overlay" />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
