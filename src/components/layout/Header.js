// =============================
// src/components/layout/Header.js
// 固定ヘッダー（デスクトップナビゲーション・モバイルメニュー）
// =============================

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import SocialLinks from "@/components/ui/SocialLinks";
import { SECTIONS, SECTION_IDS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const FOCUS_RING = "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1d4ed8]";
const NAV_LINK = `relative inline-flex items-center px-3 py-2 rounded-md text-[#bfdbfe] transition-colors duration-200 ${FOCUS_RING}`;
const SOCIAL_LINK = `inline-flex items-center justify-center p-2 rounded-full text-[#bfdbfe] hover:text-white hover:bg-[#1e40af]/30 transition-colors duration-200 ${FOCUS_RING}`;

/**
 * ページ内セクションへのリンク
 * @param {Object} props
 * @param {string} props.activeSection - 現在表示中のセクション id
 * @param {() => void} [props.onNavigate] - リンク選択時の処理
 * @param {boolean} [props.isMobile]
 */
function SectionLinks({ activeSection, onNavigate, isMobile = false }) {
  return SECTIONS.map(({ id, label }) => {
    const isActive = activeSection === id;

    return (
      <a
        key={id}
        href={`#${id}`}
        onClick={onNavigate}
        aria-current={isActive ? "location" : undefined}
        className={`${NAV_LINK} group ${isMobile ? "w-full text-base" : "text-sm sm:text-base"} ${
          isActive ? "text-white bg-[#1e40af]/50" : "hover:text-white hover:bg-[#1e40af]/30"
        }`}
      >
        {label}
        {!isMobile && isActive && (
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
            aria-hidden="true"
          />
        )}
      </a>
    );
  });
}

export default function Header() {
  const activeSection = useActiveSection(SECTION_IDS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEscapeKey(isMenuOpen ? closeMenu : null);

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-sm">
      <div className="bg-[#1d4ed8] bg-opacity-50 border-b border-[#3b82f6]/20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#home" className="text-[#eff6ff] text-2xl font-bold hover:text-white transition-colors">
              Toshiki Sakuta
            </a>

            <nav className="items-center hidden space-x-8 md:flex" aria-label="サイトナビゲーション">
              <SectionLinks activeSection={activeSection} />
              <SocialLinks className="flex items-center space-x-2" linkClassName={`${SOCIAL_LINK} text-lg sm:text-xl`} />
            </nav>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#bfdbfe] hover:text-white hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* 閉じている間は invisible によりフォーカス移動と読み上げの対象外になる */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 invisible"
          }`}
        >
          <nav className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1e40af]/90" aria-label="モバイルナビゲーション">
            <SectionLinks activeSection={activeSection} onNavigate={closeMenu} isMobile />
            <SocialLinks className="flex space-x-2" linkClassName={`${SOCIAL_LINK} text-xl`} />
          </nav>
        </div>
      </div>
    </header>
  );
}
