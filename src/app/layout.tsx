import "@/lib/font-awesome";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { connection } from "next/server";
import { getSiteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.openGraphLocale,
  },
};

// CSP の nonce はリクエストごとに発行されるため、全ページ（404 を含む）をリクエスト時にレンダリングする
export const instant = false;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await connection();

  return (
    <html lang={siteConfig.locale} className={`${inter.variable} scroll-pt-header-lg motion-safe:scroll-smooth`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
