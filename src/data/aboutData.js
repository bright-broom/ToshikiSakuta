// src/data/aboutData.js

/**
 * スキルセットのデータ定義
 * @type {Array<{category: string, items: string[]}>}
 */
export const skills = [
  { category: "フロントエンド", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "バックエンド", items: ["Node.js", "Python", "AWS", "Azure"] },
  { category: "デザイン", items: ["Figma", "UI/UX", "工業デザイン"] },
  { category: "その他", items: ["Git", "CI/CD", "セキュリティ", "回路設計"] },
];

/**
 * 経歴のタイムラインデータ定義
 * @type {Array<{period: string, title: string, description: string}>}
 */
export const timeline = [
  {
    period: "現在",
    title: "フリーランスエンジニア",
    description: "Webアプリケーション開発、クラウドインフラ構築",
  },
  {
    period: "2020-2023",
    title: "クラウドエンジニア",
    description: "Azure環境構築、セキュリティ対策",
  },
  {
    period: "2018-2020",
    title: "自動車電装エンジニア",
    description: "電子回路設計、制御システム開発",
  },
];