// =============================
// src/components/layout/Footer.js
// サイトフッター（サイトマップ・外部リンク・コピーライト）
// =============================

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import SocialLinks from "@/components/ui/SocialLinks";
import { SECTIONS } from "@/data/navigation";

const HEADING = "mb-4 text-lg font-semibold text-white";
const LINK = "text-[#bfdbfe] hover:text-white transition-colors duration-200";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-[#0f172a] to-[#1e3a8a] text-white">
      <a
        href="#home"
        className="absolute inline-flex items-center justify-center -translate-x-1/2 left-1/2 -top-7 w-14 h-14 rounded-full bg-white text-[#1d4ed8] shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        aria-label="ページトップへ戻る"
      >
        <FontAwesomeIcon icon={faChevronUp} className="text-xl" />
      </a>

      <div className="px-6 pt-20 pb-10 mx-auto max-w-7xl sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-3 md:gap-14">
          <div className="text-center md:text-left">
            <p className="mb-4 text-2xl font-bold tracking-wide text-white">TOSHIKI SAKUTA</p>
            <p className="text-[#bfdbfe] text-sm max-w-md mx-auto md:mx-0">
              創造性とテクノロジーで、より良い未来を創造します。
            </p>
          </div>

          <nav className="text-center md:text-left" aria-label="サイトマップ">
            <h2 className={HEADING}>サイトマップ</h2>
            <ul className="space-y-2">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className={LINK}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center md:text-left">
            <h2 className={HEADING}>Contact & Social</h2>
            <SocialLinks className="flex justify-center space-x-5 md:justify-start" linkClassName={`${LINK} text-2xl`} />
          </div>
        </div>

        <p className="pt-10 border-t border-white/10 text-center text-sm text-[#bfdbfe]">
          © {new Date().getFullYear()} TOSHIKI SAKUTA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
