import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WorksSection } from "@/components/sections/works-section";
import { getProjectsWithImages } from "@/lib/projects";
import { connection } from "next/server";

// CSP の nonce はリクエストごとに発行されるため、リクエスト時にレンダリングする
export const instant = false;

export default async function HomePage() {
  await connection();
  const projects = await getProjectsWithImages();

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-brand-900 to-brand-500">
      <SiteHeader />
      <main className="mt-header grow">
        <HeroSection />
        <WorksSection projects={projects} />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}
