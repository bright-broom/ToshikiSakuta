// =============================
// src/data/projects.js
// 制作実績
// =============================

/** OG画像を取得・表示できなかった場合の画像 */
export const DEFAULT_PROJECT_IMAGE = "/images/default.jpg";

/**
 * @typedef {Object} Project
 * @property {string} id - 一意識別子
 * @property {string} title - タイトル
 * @property {string} description - 短い説明
 * @property {string} url - サイトURL（https のみ。OG画像の取得元）
 * @property {string[]} tags - 使用技術
 */

/** @type {Project[]} */
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
];
