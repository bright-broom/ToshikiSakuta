import React from "react";

const HomeSection = () => {
  return (
    <section
      id="home"
      aria-label="ホーム"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden sm:px-6 lg:px-8 sm:py-24"
    >
      {/* 背景グラデーションエフェクト */}
      <div
        className="absolute inset-0 bg-gradient-radial from-blue-600/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto text-center max-w-7xl">
        <h1 className="inline-flex flex-col items-center group">
          <span className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            TOSHIKI SAKUTA
          </span>
          <span
            className="block h-0.5 bg-white/70 transition-all duration-300 ease-out
            w-0 group-hover:w-full"
            aria-hidden="true"
          />
        </h1>

        <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-[#bfdbfe] font-light tracking-wider">
          WEB ENGINEER
        </p>

        <div className="flex flex-col items-center justify-center gap-4 mt-12 sm:flex-row sm:gap-8">
          <button
            type="button"
            onClick={() => {
              document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 text-lg text-blue-600 transition-colors duration-200 bg-white rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            aria-label="作品を見る"
          >
            Works
          </button>
          <button
            type="button"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 text-lg text-white transition-colors duration-200 border-2 border-white rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            aria-label="私について"
          >
            About
          </button>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div
        className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce"
        aria-hidden="true"
      >
        <i className="text-2xl fas fa-chevron-down text-white/70" />
      </div>
    </section>
  );
};

export default HomeSection;
