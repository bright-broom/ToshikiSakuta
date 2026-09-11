import "@/lib/font-awesome";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { connection } from "next/server";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  // 検索エンジンにインデックスさせない（X-Robots-Tag ヘッダーと proxy による遮断に加えた多層防御）
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.openGraphLocale,
  },
};

// CSP の nonce はリクエストごとに発行され、Next.js はレンダリング時にそれを script / style に付与する。
// 静的に生成した HTML には nonce を付けられないため、404 を含む全ページをリクエスト時にレンダリングする
export const instant = false;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await connection();

  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} scroll-pt-header motion-safe:scroll-smooth sm:scroll-pt-header-lg`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
