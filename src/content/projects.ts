import type { Project } from "@/types/content";

/** OG 画像を取得・表示できなかった場合の画像 */
export const DEFAULT_PROJECT_IMAGE = "/images/default.jpg";

export const PROJECTS = [
  {
    id: "east-projects",
    title: "East Projects",
    description: "東京を拠点とするクリエイティブスタジオのコーポレートサイト",
    url: "https://eastprojects.jp/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "zikin",
    title: "ZIKIN",
    description: "税金計算アプリ",
    url: "https://zeikin.vercel.app/",
    tags: ["React", "Tailwind CSS", "SEO"],
  },
  {
    id: "dentaku",
    title: "DENTAKU",
    description: "モダンなUI/UXを備えた計算機アプリケーション",
    url: "https://dentaku-kappa.vercel.app/",
    tags: ["React", "TypeScript", "Accessibility"],
  },
] as const satisfies readonly Project[];
