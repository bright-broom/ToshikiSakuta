// =============================
// src/components/Footer.js
// サイトのフッターコンポーネント
// =============================

import React, { memo } from "react";
import MENU_ITEMS from "../data/menuItems";

/**
 * 共通スタイル定義
 */
const styles = {
  link: "text-[#bfdbfe] hover:text-white transition-colors duration-200 hover:scale-110",
  heading: "mb-4 text-lg font-semibold text-white",
  section: "text-center md:text-left",
  icon: "text-2xl transition-transform duration-200 hover:scale-125",
  container: "px-6 pt-20 pb-10 mx-auto max-w-7xl sm:px-10 lg:px-14",
};

/**
 * スクロールトップボタンコンポーネント
 */
const ScrollToTopButton = memo(() => (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="absolute left-1/2 -translate-x-1/2 -top-7 w-14 h-14 rounded-full
      bg-white text-[#1d4ed8] shadow-xl hover:shadow-2xl transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
    aria-label="ページトップへ戻る"
  >
    <span className="sr-only">トップへ戻る</span>
    <i className="text-xl fas fa-chevron-up" />
  </button>
));

ScrollToTopButton.displayName = "ScrollToTopButton";

/**
 * フッターロゴセクション
 */
const FooterLogo = memo(() => (
  <div className="text-center md:text-left">
    <h2 className="mb-4 text-2xl font-bold tracking-wide text-white">
      TOSHIKI SAKUTA
    </h2>
    <p className="text-[#bfdbfe] text-sm max-w-md mx-auto md:mx-0">
      創造性とテクノロジーで、より良い未来を創造します。
    </p>
  </div>
));

FooterLogo.displayName = "FooterLogo";

/**
 * フッターナビゲーション（サイトマップ）
 */
const FooterNavigation = memo(() => (
  <nav className={styles.section} aria-label="フッターナビゲーション">
    <h2 className={styles.heading}>サイトマップ</h2>
    <ul className="space-y-2">
      {MENU_ITEMS.filter(({ type }) => type === "link").map(({ name, href }) => (
        <li key={name}>
          <a href={href} className={styles.link}>
            {name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
));

FooterNavigation.displayName = "FooterNavigation";

/**
 * フッターソーシャルリンク
 */
const FooterSocial = memo(() => (
  <div className={styles.section}>
    <h2 className={styles.heading}>Contact & Social</h2>
    <div className="flex justify-center mb-4 space-x-5 md:justify-start">
      {MENU_ITEMS.filter(({ type }) => type === "icon").map(({ name, href, iconType }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={`${name}を開く`}
        >
          <i className={`${iconType} fa-${name} ${styles.icon}`} />
        </a>
      ))}
    </div>
  </div>
));

FooterSocial.displayName = "FooterSocial";

/**
 * コピーライトコンポーネント
 */
const Copyright = memo(() => (
  <div className="pt-10 border-t border-white/10">
    <p className="text-center text-sm text-[#bfdbfe]">
      © {new Date().getFullYear()} TOSHIKI SAKUTA. All rights reserved.
    </p>
  </div>
));

Copyright.displayName = "Copyright";

/**
 * フッターコンポーネント
 * サイトのフッターセクションを構成
 */
const Footer = () => (
  <footer
    className="relative bg-gradient-to-t from-[#0f172a] to-[#1e3a8a] text-white"
    aria-label="サイトフッター"
  >
    <ScrollToTopButton />
    <div className={styles.container}>
      <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-3 md:gap-14">
        <FooterLogo />
        <FooterNavigation />
        <FooterSocial />
      </div>
      <Copyright />
    </div>
  </footer>
);

export default memo(Footer);
