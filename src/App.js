// src/App.js

"use client";
import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Inter } from 'next/font/google';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import WorksSection from "./components/WorksSection";
import AboutSection from "./components/AboutSection";
import { initialState, mainReducer } from "./reducers/mainReducer";
import MENU_ITEMS from "./data/menuItems";

// Font Awesome の自動CSS追加を無効化
config.autoAddCss = false;

// Google Fonts の Inter フォントを設定
const inter = Inter({ subsets: ['latin'] });

/**
 * アプリケーションで使用するセクションの定義
 * @type {Array<{id: string, threshold: number}>}
 */
const SECTIONS = [
  { id: "home", threshold: 50 },
  { id: "works", threshold: 50 },
  { id: "about", threshold: 50 },
];

/**
 * スクロール位置に基づいてアクティブなセクションを検出するカスタムフック
 * @param {Function} onSectionChange - アクティブなセクションが変更された時のコールバック
 * @returns {void}
 */
const useScrollSpy = (onSectionChange) => {
  useEffect(() => {
    let timeoutId;

    // スクロールイベントのデバウンス処理を行うハンドラー
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const currentSection = SECTIONS.find(({ id, threshold }) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= threshold && rect.bottom >= threshold;
          }
          return false;
        });

        if (currentSection) {
          onSectionChange(currentSection.id);
        }
      }, 100); // 100ms のデバウンス
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [onSectionChange]);
};

/**
 * アプリケーションのルートコンポーネント
 * @returns {JSX.Element} アプリケーションの全体構造
 */
function App() {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  // メモ化されたコールバック関数
  const toggleMenu = useCallback(() => {
    dispatch({ type: "TOGGLE_MENU" });
  }, []);

  const setActiveSection = useCallback((section) => {
    dispatch({ type: "SET_ACTIVE_SECTION", payload: section });
  }, []);

  const setHover = useCallback((isHovered) => {
    dispatch({ type: "SET_HOVER", payload: isHovered });
  }, []);

  // スクロールスパイの初期化
  useScrollSpy(setActiveSection);

  // メモ化されたHomeセクションのプロパティ
  const homeSectionProps = useMemo(() => ({
    isHovered: state.isHovered,
    setHover: setHover
  }), [state.isHovered, setHover]);

  return (
    <div className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6]`}>
      <Header
        menuItems={MENU_ITEMS}
        activeSection={state.activeSection}
        toggleMenu={toggleMenu}
        isMenuOpen={state.isMenuOpen}
        setActiveSection={setActiveSection}
      />
      <main className="flex-grow mt-16">
        <HomeSection {...homeSectionProps} />
        <WorksSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
