// =============================
// src/components/MenuItem.js
// ナビゲーション & ソーシャルリンク
// =============================

import React, { memo } from "react";
import classnames from "classnames";

/**
 * 共通スタイル定義
 */
const styles = {
  navLink: "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1d4ed8] relative group inline-flex items-center px-3 py-2 text-[#bfdbfe] rounded-md transition-colors duration-200",
  navLinkMobile: "w-full text-base justify-start",
  navLinkDesktop: "text-sm sm:text-base",
  navLinkActive: "text-white bg-[#1e40af]/50",
  navLinkHover: "hover:text-white hover:bg-[#1e40af]/30",
  underline: "absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
  socialLink: "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1d4ed8] inline-flex items-center justify-center p-2 rounded-full text-[#bfdbfe] hover:text-white hover:bg-[#1e40af]/30 transition-colors duration-200",
  socialLinkMobile: "text-xl",
  socialLinkDesktop: "text-lg sm:text-xl",
};

/**
 * ナビゲーションリンクコンポーネント
 * @param {Object} props
 * @param {string} props.name - リンクの名前
 * @param {boolean} props.isActive - アクティブ状態
 * @param {Function} props.onClick - クリック時の処理
 * @param {boolean} props.isMobile - モバイル表示かどうか
 */
const NavLink = memo(({ name, isActive, onClick, isMobile }) => (
  <button
    type="button"
    onClick={() => onClick(name.toLowerCase())}
    className={classnames(
      styles.navLink,
      isMobile ? styles.navLinkMobile : styles.navLinkDesktop,
      isActive ? styles.navLinkActive : styles.navLinkHover
    )}
    aria-current={isActive ? "page" : undefined}
  >
    {name}
    {!isMobile && isActive && <span className={styles.underline} />}
  </button>
));

NavLink.displayName = "NavLink";

/**
 * ソーシャルリンクコンポーネント
 * @param {Object} props
 * @param {string} props.name - ソーシャルアイコンの名前
 * @param {string} props.href - リンク先URL
 * @param {string} props.iconType - アイコンの種類（"fab" または "fas"）
 * @param {boolean} props.isMobile - モバイル表示かどうか
 */
const SocialLink = memo(({ name, href, iconType, isMobile }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={classnames(styles.socialLink, isMobile ? styles.socialLinkMobile : styles.socialLinkDesktop)}
    aria-label={`${name}を開く`}
  >
    <span className="sr-only">{name}</span>
    <i className={`${iconType} fa-${name}`} />
  </a>
));

SocialLink.displayName = "SocialLink";

/**
 * メニューアイテムコンポーネント
 * ナビゲーションリンクまたはソーシャルリンクを表示
 * 
 * @param {Object} props
 * @param {Object} props.item - メニューアイテムの情報
 * @param {string} props.item.type - アイテムの種類（"link" または "icon"）
 * @param {string} props.item.name - アイテムの名前
 * @param {string} props.item.href - リンク先URL
 * @param {string} props.item.iconType - アイコンの種類（"fab" または "fas"）
 * @param {string} props.activeSection - 現在のアクティブなセクション
 * @param {Function} props.onClick - クリックハンドラー
 * @param {boolean} [props.isMobile=false] - モバイル表示かどうか
 */
const MenuItem = ({ item, activeSection, onClick, isMobile = false }) => {
  return item.type === "link" ? (
    <NavLink
      name={item.name}
      isActive={activeSection === item.name.toLowerCase()}
      onClick={onClick}
      isMobile={isMobile}
    />
  ) : (
    <SocialLink
      name={item.name}
      href={item.href}
      iconType={item.iconType}
      isMobile={isMobile}
    />
  );
};

export default memo(MenuItem);
