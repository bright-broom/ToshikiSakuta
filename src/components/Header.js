import React, { useRef, useEffect } from "react";
import MenuItem from "./MenuItem";

const Header = ({ menuItems, activeSection, toggleMenu, isMenuOpen, setActiveSection }) => {
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMenuOpen, toggleMenu]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full backdrop-blur-sm"
    >
      <div className="bg-[#1d4ed8] bg-opacity-50 border-b border-[#3b82f6]/20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
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
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 invisible'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1e40af]/90 backdrop-blur-sm">
            {menuItems.map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                activeSection={activeSection}
                onClick={(section) => {
                  setActiveSection(section);
                  toggleMenu();
                }}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
