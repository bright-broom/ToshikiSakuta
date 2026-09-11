// =============================
// src/data/menuItems.js
// メニュー項目のデータを定義するモジュール
// =============================

/**
 * メニュー項目の型定義
 * @typedef {Object} MenuItem
 * @property {string} name - メニュー名
 * @property {"link" | "icon"} category - メニューのカテゴリ
 * @property {string} href - 遷移先URLまたはメールアドレス
 * @property {string} [icon] - アイコン名 (カテゴリが"icon"の場合のみ)
 * @property {"fab" | "fas"} [iconType] - FontAwesomeアイコンタイプ (カテゴリが"icon"の場合のみ)
 */

/** 
 * ナビゲーションメニュー一覧
 * @type {MenuItem[]}
 */
const MENU_ITEMS = [
  // =============================
  // ページ内リンク
  // =============================
  { name: "Home", category: "link", href: "#home" },
  { name: "Works", category: "link", href: "#works" },
  { name: "About", category: "link", href: "#about" },

  // =============================
  // 外部リンク・アイコンボタン
  // =============================
  {
    name: "GitHub",
    category: "icon",
    icon: "github",
    iconType: "fab",
    href: "https://github.com/bright-broom",
  },
];

export default MENU_ITEMS;
