// src/components/MenuItem.js

import React, { memo } from "react";

/**
 * ナビゲーションリンクのスタイル設定
 * @param {Object} options スタイルオプション
 * @returns {string} 結合されたクラス名
 */
const getNavLinkStyles = ({ isActive, isMobile }) => {
  const baseStyles = [
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-white",
    "focus:ring-offset-2",
    "focus:ring-offset-[#1d4ed8]",
    "relative",
    "group",
    "inline-flex",
    "items-center",
    "px-3",
    "py-2",
    "text-[#bfdbfe]",
    "rounded-md",
    "transition-colors",
    "duration-200"
  ];

  const mobileStyles = isMobile ? ["w-full", "text-base", "justify-start"] : ["text-sm", "sm:text-base"];
  const activeStyles = isActive
    ? ["text-white", "bg-[#1e40af]/50"]
    : ["hover:text-white", "hover:bg-[#1e40af]/30"];

  return [...baseStyles, ...mobileStyles, ...activeStyles].join(" ");
};

/**
 * ソーシャルリンクのスタイル設定
 * @param {boolean} isMobile モバイル表示かどうか
 * @returns {string} 結合されたクラス名
 */
const getSocialLinkStyles = (isMobile) => {
  const baseStyles = [
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-white",
    "focus:ring-offset-2",
    "focus:ring-offset-[#1d4ed8]",
    "inline-flex",
    "items-center",
    "justify-center",
    "p-2",
    "rounded-full",
    "text-[#bfdbfe]",
    "hover:text-white",
    "hover:bg-[#1e40af]/30",
    "transition-colors",
    "duration-200"
  ];

  const sizeStyles = isMobile ? ["text-xl"] : ["text-lg", "sm:text-xl"];

  return [...baseStyles, ...sizeStyles].join(" ");
};

/**
 * ナビゲーションリンクコンポーネント
 */
const NavLink = memo(({ name, isActive, onClick, isMobile }) => (
  <button
    type="button"
    onClick={() => onClick(name.toLowerCase())}
    className={getNavLinkStyles({ isActive, isMobile })}
    aria-current={isActive ? 'page' : undefined}
  >
    {name}
    {!isMobile && isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left" />
    )}
  </button>
));

NavLink.displayName = 'NavLink';

/**
 * ソーシャルリンクコンポーネント
 */
const SocialLink = memo(({ name, href, iconType, isMobile }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={getSocialLinkStyles(isMobile)}
    aria-label={`${name}を開く`}
  >
    <span className="sr-only">{name}</span>
    <i className={`${iconType} fa-${name}`} />
  </a>
));

SocialLink.displayName = 'SocialLink';

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
  if (item.type === "link") {
    return (
      <NavLink
        name={item.name}
        isActive={activeSection === item.name.toLowerCase()}
        onClick={onClick}
        isMobile={isMobile}
      />
    );
  }

  return (
    <SocialLink
      name={item.name}
      href={item.href}
      iconType={item.iconType}
      isMobile={isMobile}
    />
  );
};

export default memo(MenuItem);
