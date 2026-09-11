import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SECTION_IDS, sectionHref } from "@/config/navigation";
import { HERO_COPY } from "@/content/copy";

const HEADING_ID = "hero-heading";

const BUTTON_BASE =
  "rounded-full px-8 py-3 text-lg transition-all duration-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600 focus:outline-hidden";

const BUTTON_VARIANTS = {
  primary: "bg-white text-brand-600 hover:bg-brand-50",
  secondary: "border-2 border-white text-white hover:bg-white/10",
} as const;

export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.home}
      aria-labelledby={HEADING_ID}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="relative mx-auto max-w-7xl text-center">
        <h1 id={HEADING_ID} className="group inline-flex flex-col items-center">
          <span className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {HERO_COPY.heading}
          </span>
          <span
            className="block h-0.5 w-0 bg-white/70 transition-all duration-500 ease-out group-hover:w-full"
            aria-hidden="true"
          />
        </h1>
        <p className="mt-6 text-xl font-light tracking-wider text-brand-200 sm:text-2xl md:text-3xl">
          {HERO_COPY.subheading}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {HERO_COPY.actions.map(({ target, label, variant }) => (
            <a key={target} href={sectionHref(target)} className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]}`}>
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <FontAwesomeIcon icon={faChevronDown} className="text-2xl text-white/70" />
      </div>
    </section>
  );
}
