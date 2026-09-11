import type { Project, ProjectImage } from "@/types/content";

/** 制作実績のスクリーンショット（各サイトのファーストビュー、1200x750） */
const screenshot = (id: string): ProjectImage => ({ src: `/images/projects/${id}.webp`, width: 1200, height: 750 });

export const PROJECTS = [
  {
    id: "east-projects",
    title: "East Projects",
    description: "東京を拠点とするクリエイティブスタジオのコーポレートサイト",
    url: "https://eastprojects.jp/",
    image: screenshot("east-projects"),
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "zikin",
    title: "ZIKIN",
    description: "税金計算アプリ",
    url: "https://zeikin.vercel.app/",
    image: screenshot("zikin"),
    tags: ["React", "Tailwind CSS", "SEO"],
  },
  {
    id: "dentaku",
    title: "DENTAKU",
    description: "モダンなUI/UXを備えた計算機アプリケーション",
    url: "https://dentaku-kappa.vercel.app/",
    image: screenshot("dentaku"),
    tags: ["React", "TypeScript", "Accessibility"],
  },
] as const satisfies readonly Project[];
