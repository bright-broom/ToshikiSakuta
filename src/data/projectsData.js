// src/data/projectsData.js

/**
 * プロジェクトデータの型定義
 * @typedef {Object} Project
 * @property {string} id - プロジェクトの一意識別子
 * @property {string} title - プロジェクトのタイトル
 * @property {string} description - プロジェクトの短い説明
 * @property {string} details - プロジェクトの詳細説明
 * @property {string} imgSrc - プロジェクト画像のパス
 * @property {string} url - プロジェクトのURL
 * @property {string[]} tags - 使用技術タグ
 */

/**
 * プロジェクト一覧
 * @type {Project[]}
 */
export const projects = [
  {
    id: "east-projects",
    title: "East Projects",
    description: "東京を拠点とするクリエイティブスタジオのコーポレートサイト",
    details: "Next.js、Tailwind CSS、Framer Motionを使用したモダンなウェブサイト制作",
    imgSrc: "/images/Higashi Akimitsu.jpeg",
    url: "https://eastprojects.jp/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "albadx",
    title: "ALBADX",
    description: "デジタルマーケティング企業のウェブサイト",
    details: "レスポンシブデザイン、アニメーション効果、SEO最適化を実装",
    imgSrc: "/images/albadx.jpg",
    url: "https://albadx.vercel.app/",
    tags: ["React", "Tailwind CSS", "SEO"],
  },
  {
    id: "dentaku",
    title: "DENTAKU",
    description: "モダンなUI/UXを備えた計算機アプリケーション",
    details: "アクセシビリティに配慮したインタラクティブな電卓アプリ",
    imgSrc: "/images/dentaku.jpeg",
    url: "https://dentaku-kappa.vercel.app/",
    tags: ["React", "TypeScript", "Accessibility"],
  },
];