// =============================
// src/components/sections/HomeSection.js
// メインビジュアル
// =============================

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const BUTTON =
  "px-8 py-3 text-lg rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600";

export default function HomeSection() {
  return (
    <section
      id="home"
      aria-label="ホーム"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden sm:px-6 lg:px-8 sm:py-24"
    >
      <div className="relative mx-auto text-center max-w-7xl">
        <h1 className="inline-flex flex-col items-center group">
          <span className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            TOSHIKI SAKUTA
          </span>
          <span
            className="block h-0.5 bg-white/70 transition-all duration-500 ease-out w-0 group-hover:w-full"
            aria-hidden="true"
          />
        </h1>
        <p className="mt-6 text-xl font-light tracking-wider sm:text-2xl md:text-3xl text-[#bfdbfe]">WEB ENGINEER</p>

        <div className="flex flex-col items-center justify-center gap-4 mt-12 sm:flex-row sm:gap-8">
          <a href="#works" className={`${BUTTON} text-blue-600 bg-white hover:bg-blue-50`}>
            Works
          </a>
          <a href="#about" className={`${BUTTON} text-white border-2 border-white hover:bg-white/10`}>
            About
          </a>
        </div>
      </div>

      <div className="absolute -translate-x-1/2 bottom-8 left-1/2 animate-bounce" aria-hidden="true">
        <FontAwesomeIcon icon={faChevronDown} className="text-2xl text-white/70" />
      </div>
    </section>
  );
}
