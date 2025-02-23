// src/components/HomeSection.js

import React, { memo, useCallback } from "react";

/**
 * アニメーション付きタイトルコンポーネント
 */
const Title = memo(() => (
  <h1 className="inline-flex flex-col items-center group">
    <span className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
      TOSHIKI SAKUTA
    </span>
    <span
      className="block h-0.5 bg-white/70 transition-all duration-300 ease-out w-0 group-hover:w-full"
      aria-hidden="true"
    />
  </h1>
));

Title.displayName = 'Title';

/**
 * ナビゲーションボタンの共通スタイル
 */
const baseButtonStyles = `
  px-8 py-3 text-lg rounded-full transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600
`;

/**
 * ナビゲーションボタンコンポーネント
 */
const NavigationButton = memo(({ label, targetId, isPrimary }) => {
  const handleClick = useCallback(() => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [targetId]);

  const buttonStyles = isPrimary
    ? `${baseButtonStyles} text-blue-600 bg-white hover:bg-blue-50`
    : `${baseButtonStyles} text-white border-2 border-white hover:bg-white/10`;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={buttonStyles}
      aria-label={label}
    >
      {targetId.charAt(0).toUpperCase() + targetId.slice(1)}
    </button>
  );
});

NavigationButton.displayName = 'NavigationButton';

/**
 * ナビゲーションボタングループコンポーネント
 */
const NavigationButtons = memo(() => (
  <div className="flex flex-col items-center justify-center gap-4 mt-12 sm:flex-row sm:gap-8">
    <NavigationButton
      label="作品を見る"
      targetId="works"
      isPrimary={true}
    />
    <NavigationButton
      label="私について"
      targetId="about"
      isPrimary={false}
    />
  </div>
));

NavigationButtons.displayName = 'NavigationButtons';

/**
 * スクロールインジケーターコンポーネント
 */
const ScrollIndicator = memo(() => (
  <div
    className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce"
    aria-hidden="true"
  >
    <i className="text-2xl fas fa-chevron-down text-white/70" />
  </div>
));

ScrollIndicator.displayName = 'ScrollIndicator';

/**
 * ホームセクションコンポーネント
 * ウェブサイトのメインビジュアルとナビゲーションを提供
 */
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
        <Title />
        <p className="mt-6 text-xl font-light tracking-wider sm:text-2xl md:text-3xl text-[#bfdbfe]">
          WEB ENGINEER
        </p>
        <NavigationButtons />
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default memo(HomeSection);
