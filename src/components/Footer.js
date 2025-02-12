import React from "react";
import MENU_ITEMS from "../data/menuItems";

const Footer = () => {
  const socialLinks = MENU_ITEMS.filter(item => item.type === "icon");
  const navigationLinks = MENU_ITEMS.filter(item => item.type === "link");

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer
      className="relative bg-gradient-to-t from-[#1e3a8a] to-[#1d4ed8]"
      aria-label="サイトフッター"
    >
      {/* スクロールトップボタン */}
      <button
        type="button"
        onClick={handleScrollToTop}
        className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 rounded-full
          bg-white text-[#1d4ed8] shadow-lg hover:bg-blue-50 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        aria-label="ページトップへ戻る"
      >
        <span className="sr-only">トップへ戻る</span>
        <i className="fas fa-chevron-up" />
      </button>

      <div className="px-4 pt-16 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3 md:gap-12">
          {/* ロゴ・概要 */}
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-xl font-bold text-white">
              TOSHIKI SAKUTA
            </h2>
            <p className="text-[#bfdbfe] text-sm">
              創造性とテクノロジーで、より良い未来を創造します。
            </p>
          </div>

          {/* ナビゲーション */}
          <nav
            className="text-center md:text-left"
            aria-label="フッターナビゲーション"
          >
            <h2 className="mb-4 text-lg font-semibold text-white">
              サイトマップ
            </h2>
            <ul className="space-y-2">
              {navigationLinks.map(item => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[#bfdbfe] hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SNS・コンタクト */}
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Contact & Social
            </h2>
            <div className="flex justify-center mb-4 space-x-4 md:justify-start">
              {socialLinks.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bfdbfe] hover:text-white transition-colors duration-200"
                  aria-label={`${item.name}を開く`}
                >
                  <i className={`${item.iconType} fa-${item.name} text-xl`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-center text-sm text-[#bfdbfe]">
            © {new Date().getFullYear()} TOSHIKI SAKUTA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
