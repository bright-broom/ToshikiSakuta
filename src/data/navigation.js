// =============================
// src/data/navigation.js
// ページ内セクションと外部リンクの定義
// =============================

/**
 * @typedef {Object} Section
 * @property {string} id - セクション要素の id（ページ内リンクの遷移先）
 * @property {string} label - ナビゲーションの表示名
 */

/** @type {Section[]} */
export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
];

export const SECTION_IDS = SECTIONS.map(({ id }) => id);

/**
 * @typedef {Object} SocialLink
 * @property {string} label - リンク名（スクリーンリーダー向けラベル）
 * @property {string} href - https: または mailto: のURL
 * @property {"github" | "email"} icon - 表示するアイコン
 */

/** @type {SocialLink[]} */
export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/bright-broom", icon: "github" },
  { label: "Contact", href: "mailto:toshikiii7@gmail.com", icon: "email" },
];
