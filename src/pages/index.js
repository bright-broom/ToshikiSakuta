// =============================
// src/pages/index.js
// トップページ（/）
// =============================

import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeSection from "@/components/sections/HomeSection";
import WorksSection from "@/components/sections/WorksSection";
import AboutSection from "@/components/sections/AboutSection";
import { DEFAULT_PROJECT_IMAGE, PROJECTS } from "@/data/projects";
import { fetchOgImage } from "@/lib/ogImage";

// OG画像の再取得間隔（秒）
const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * 外部サイトへのアクセスは閲覧者のブラウザではなくサーバー側で行う
 * （CSP の connect-src を 'self' に限定でき、閲覧者の情報も外部に渡らない）
 */
export async function getStaticProps() {
  const projects = await Promise.all(
    PROJECTS.map(async (project) => ({
      ...project,
      imageSrc: (await fetchOgImage(project.url)) ?? DEFAULT_PROJECT_IMAGE,
    }))
  );

  return { props: { projects }, revalidate: REVALIDATE_SECONDS };
}

export default function HomePage({ projects }) {
  return (
    <>
      <Head>
        <title>Toshiki Sakuta | Web Engineer</title>
        <meta name="description" content="Webエンジニア Toshiki Sakuta のポートフォリオ。制作実績と経歴を紹介しています。" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6]">
        <Header />
        <main className="flex-grow mt-16">
          <HomeSection />
          <WorksSection projects={projects} />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
