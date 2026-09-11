"use client";

import { useEffect, useState } from "react";

// ページ内リンクの遷移位置（html の scroll-padding-top）から、さらにこの距離だけ下を判定位置とする
const DETECTION_MARGIN_PX = 20;

/**
 * スクロール位置から現在表示中のセクションを判定する
 * @param sectionIds 判定対象のセクション id（参照が変わらない配列を渡すこと）
 */
export function useActiveSection<Id extends string>(sectionIds: readonly [Id, ...Id[]]): Id {
  const [activeSection, setActiveSection] = useState<Id>(sectionIds[0]);

  useEffect(() => {
    const scrollPaddingTop = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const detectionLine = scrollPaddingTop + DETECTION_MARGIN_PX;
    let frame = 0;

    const update = () => {
      frame = 0;
      const current = sectionIds.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect !== undefined && rect.top <= detectionLine && rect.bottom > detectionLine;
      });
      if (current) setActiveSection(current);
    };

    // スクロールごとの判定は 1 フレームに 1 回まで
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return activeSection;
}
