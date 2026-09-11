import type { Metadata } from "next";
import { connection } from "next/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WorksSection } from "@/components/sections/works-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function HomePage() {
  // root layout の connection() はページの事前レンダリング検証には及ばず、フッターの new Date() がビルドエラーになるため、
  // ページでもリクエスト時レンダリングを明示する（CSP nonce のためにも必要）
  await connection();

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-brand-900 to-brand-500">
      <SiteHeader />
      <main className="mt-header grow">
        <HeroSection />
        <WorksSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}
