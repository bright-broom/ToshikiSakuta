"use client";

import "@/lib/font-awesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SocialLinks } from "@/components/ui/social-links";
import { SECTION_IDS, SECTIONS, type SectionId, sectionHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { UI_LABELS } from "@/content/copy";
import { useActiveSection } from "@/hooks/use-active-section";
import { useEscapeKey } from "@/hooks/use-escape-key";

const SECTION_ID_LIST = SECTIONS.map(({ id }) => id) as [SectionId, ...SectionId[]];
const MOBILE_MENU_ID = "mobile-menu";

const FOCUS_RING =
  "focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-700";
const NAV_LINK = `group relative inline-flex items-center rounded-md px-3 py-2 text-brand-200 transition-colors duration-200 ${FOCUS_RING}`;
const SOCIAL_LINK = `inline-flex items-center justify-center rounded-full p-2 text-brand-200 transition-colors duration-200 hover:bg-brand-800/30 hover:text-white ${FOCUS_RING}`;

type SectionLinksProps = {
  activeSection: SectionId;
  onNavigate?: () => void;
  isMobile?: boolean;
};

function SectionLinks({ activeSection, onNavigate, isMobile = false }: SectionLinksProps) {
  return SECTIONS.map(({ id, label }) => {
    const isActive = activeSection === id;

    return (
      <a
        key={id}
        href={sectionHref(id)}
        onClick={onNavigate}
        aria-current={isActive ? "location" : undefined}
        className={`${NAV_LINK} ${isMobile ? "w-full text-base" : "text-sm sm:text-base"} ${
          isActive ? "bg-brand-800/50 text-white" : "hover:bg-brand-800/30 hover:text-white"
        }`}
      >
        {label}
        {!isMobile && isActive && (
          <span
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100"
            aria-hidden="true"
          />
        )}
      </a>
    );
  });
}

export function SiteHeader() {
  const activeSection = useActiveSection(SECTION_ID_LIST);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEscapeKey(isMenuOpen ? closeMenu : null);

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-xs">
      <div className="border-b border-brand-500/20 bg-brand-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-header items-center justify-between sm:h-header-lg">
            <a
              href={sectionHref(SECTION_IDS.home)}
              className="text-2xl font-bold text-brand-50 transition-colors hover:text-white"
            >
              {siteConfig.name}
            </a>

            <nav className="hidden items-center space-x-8 md:flex" aria-label={UI_LABELS.primaryNavigation}>
              <SectionLinks activeSection={activeSection} />
              <SocialLinks className="flex items-center space-x-2" linkClassName={`${SOCIAL_LINK} text-lg sm:text-xl`} />
            </nav>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-md p-2 text-brand-200 transition-colors hover:bg-brand-800 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isMenuOpen ? UI_LABELS.closeMenu : UI_LABELS.openMenu}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* 閉じている間は invisible によりフォーカス移動と読み上げの対象外になる */}
        <div
          id={MOBILE_MENU_ID}
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "invisible max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-1 bg-brand-800/90 px-2 pt-2 pb-3 sm:px-3" aria-label={UI_LABELS.mobileNavigation}>
            <SectionLinks activeSection={activeSection} onNavigate={closeMenu} isMobile />
            <SocialLinks className="flex space-x-2" linkClassName={`${SOCIAL_LINK} text-xl`} />
          </nav>
        </div>
      </div>
    </header>
  );
}
