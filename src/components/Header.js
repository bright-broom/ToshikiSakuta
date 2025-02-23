// src/components/Header.js

import React, { useRef, useCallback } from "react";
import MenuItem from "./MenuItem";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useAnimation } from "../hooks/useAnimation";

/**
 * モバイルメニューコンポーネント
 * @param {Object} props
 * @param {Array<{ name: string, type: string, href: string }>} props.menuItems - メニュー項目の配列
 * @param {string} props.activeSection - 現在のアクティブなセクション
 * @param {Function} props.setActiveSection - アクティブセクション変更ハンドラー
 * @param {Function} props.toggleMenu - メニュー開閉ハンドラー
 * @param {boolean} props.isMenuOpen - メニューの開閉状態
 */
const MobileMenu = ({ menuItems, activeSection, setActiveSection, toggleMenu, isMenuOpen }) => {
  const menuRef = useRef(null);
  const { animationClass } = useAnimation(isMenuOpen, {
    enter: "max-h-96 opacity-100",
    exit: "max-h-0 opacity-0 invisible",
    duration: 300
  });

  const handleItemClick = useCallback((section) => {
    setActiveSection(section);
    toggleMenu();
  }, [setActiveSection, toggleMenu]);

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      className={`md:hidden transition-all duration-300 ease-in-out ${animationClass}`}
      aria-hidden={!isMenuOpen}
    >
      <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1e40af]/90 backdrop-blur-sm">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            activeSection={activeSection}
            onClick={handleItemClick}
            isMobile={true}
          />
        ))}
      </nav>
    </div>
  );
};

/**
 * メインナビゲーションコンポーネント
 * @param {Object} props
 * @param {Array<{ name: string, type: string, href: string }>} props.menuItems - メニュー項目の配列
 * @param {string} props.activeSection - 現在のアクティブなセクション
 * @param {Function} props.setActiveSection - アクティブセクション変更ハンドラー
 */
const MainNavigation = ({ menuItems, activeSection, setActiveSection }) => (
  <nav
    className="items-center hidden space-x-8 md:flex"
    aria-label="メインナビゲーション"
  >
    {menuItems.map((item) => (
      <MenuItem
        key={item.name}
        item={item}
        activeSection={activeSection}
        onClick={setActiveSection}
      />
    ))}
  </nav>
);

/**
 * ヘッダーコンポーネント
 * ナビゲーションとモバイルメニューを含むサイトのヘッダー部分
 * 
 * @param {Object} props
 * @param {Array<{ name: string, type: string, href: string }>} props.menuItems - メニュー項目の配列
 * @param {string} props.activeSection - 現在のアクティブなセクション
 * @param {Function} props.toggleMenu - メニュー開閉ハンドラー
 * @param {boolean} props.isMenuOpen - メニューの開閉状態
 * @param {Function} props.setActiveSection - アクティブセクション変更ハンドラー
 */
const Header = ({ menuItems, activeSection, toggleMenu, isMenuOpen, setActiveSection }) => {
  const headerRef = useRef(null);

  // Escapeキーでメニューを閉じる
  useEscapeKey(isMenuOpen ? toggleMenu : null);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full backdrop-blur-sm"
    >
      <div className="bg-[#1d4ed8] bg-opacity-50 border-b border-[#3b82f6]/20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* サイトタイトル */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveSection("home")}
                className="text-[#eff6ff] text-2xl font-bold hover:text-white transition-colors"
                aria-label="トップへ戻る"
              >
                Toshiki Sakuta
              </button>
            </div>

            {/* デスクトップナビゲーション */}
            <MainNavigation
              menuItems={menuItems}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            {/* モバイルメニューボタン */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#bfdbfe] hover:text-white hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="メインメニュー"
              >
                <span className="sr-only">
                  {isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                </span>
                <i className={`fas fa-${isMenuOpen ? "times" : "bars"} text-2xl`} />
              </button>
            </div>
          </div>
        </div>

        {/* モバイルメニュー */}
        <MobileMenu
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </header>
  );
};

export default Header;
