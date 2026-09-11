// =============================
// src/data/profile.js
// 自己紹介・スキル・経歴
// =============================

export const BIO =
  "兵庫県出身のエンジニア。中学時代に趣味で作ったWebサイトが友人にウケたのをきっかけにWebに興味を持つ。" +
  "高校で情報を学び、大学では工業デザインを専攻。卒業後は、自動車の電子回路設計に携わる。" +
  "クラウド技術の可能性に惹かれ、IT業界へ転身。Azure環境構築、サイバーセキュリティ対策の経験を有する。";

/**
 * @typedef {Object} SkillCategory
 * @property {string} category - スキルの分類
 * @property {string[]} technologies - 分類内のスキル一覧
 */

/** @type {SkillCategory[]} */
export const SKILLS = [
  { category: "フロントエンド", technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "バックエンド", technologies: ["Node.js", "Python", "Go", "AWS", "Azure", "Firebase"] },
  { category: "データベース", technologies: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"] },
  { category: "クラウド・インフラ", technologies: ["AWS Lambda", "Docker", "Kubernetes", "Terraform", "Cloudflare"] },
  { category: "デザイン・UX", technologies: ["Figma", "UI/UX", "工業デザイン", "Adobe XD"] },
  { category: "その他", technologies: ["Git", "CI/CD", "セキュリティ", "回路設計", "WebRTC"] },
];

/**
 * @typedef {Object} TimelineEntry
 * @property {string} period - 期間（例: "2020-2023"）
 * @property {string} title - 経歴のタイトル
 * @property {string} description - 経歴の説明
 */

/** @type {TimelineEntry[]} */
export const TIMELINE = [
  {
    period: "現在",
    title: "フリーランスエンジニア",
    description: "Webアプリケーション開発、クラウドインフラ設計・構築、技術コンサルティング。",
  },
  {
    period: "2020-2023",
    title: "クラウドエンジニア",
    description: "Azure環境を基盤とした企業向けクラウドインフラの設計・構築を担当。",
  },
  {
    period: "2018-2020",
    title: "自動車電装エンジニア",
    description: "自動車の電子回路設計および制御システムの開発。",
  },
  {
    period: "2015-2018",
    title: "大学・研究開発",
    description: "大学にて制御システム工学を研究し、産学連携プロジェクトに参画。",
  },
];
