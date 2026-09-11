import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialLinks } from "@/components/ui/social-links";
import { SECTION_IDS, SECTIONS, sectionHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { UI_LABELS } from "@/content/copy";

const HEADING = "mb-4 text-lg font-semibold text-white";
const LINK = "text-brand-200 transition-colors duration-200 hover:text-white";

export function SiteFooter() {
  return (
    <footer className="relative bg-linear-to-t from-ink-950 to-brand-900 text-white">
      <a
        href={sectionHref(SECTION_IDS.home)}
        className="absolute -top-7 left-1/2 inline-flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-white text-brand-700 shadow-xl transition-all duration-300 hover:shadow-2xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600 focus:outline-hidden"
        aria-label={UI_LABELS.backToTop}
      >
        <FontAwesomeIcon icon={faChevronUp} className="text-xl" />
      </a>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 sm:px-10 lg:px-14">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
          <div className="text-center md:text-left">
            <p className="mb-4 text-2xl font-bold tracking-wide text-white">{siteConfig.displayName}</p>
            <p className="mx-auto max-w-md text-sm text-brand-200 md:mx-0">{siteConfig.tagline}</p>
          </div>

          <nav className="text-center md:text-left" aria-label={UI_LABELS.sitemap}>
            <h2 className={HEADING}>{UI_LABELS.sitemap}</h2>
            <ul className="space-y-2">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a href={sectionHref(id)} className={LINK}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center md:text-left">
            <h2 className={HEADING}>{UI_LABELS.contactAndSocial}</h2>
            <SocialLinks className="flex justify-center space-x-5 md:justify-start" linkClassName={`${LINK} text-2xl`} />
          </div>
        </div>

        <p className="border-t border-white/10 pt-10 text-center text-sm text-brand-200">
          {UI_LABELS.copyright(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
