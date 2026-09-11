// =============================
// src/hooks/useActiveSection.js
// スクロール位置から現在表示中のセクションを判定する
// =============================

import { useEffect, useState } from "react";

// 固定ヘッダー（最大80px）の直下を判定位置とする
const DETECTION_OFFSET_PX = 100;

/**
 * @param {string[]} sectionIds - 判定対象のセクション id（参照が変わらない配列を渡すこと）
 * @returns {string} 現在表示中のセクション id
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const current = sectionIds.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= DETECTION_OFFSET_PX && rect.bottom > DETECTION_OFFSET_PX;
      });
      if (current) setActiveSection(current);
    };

    // スクロールごとの判定は1フレームに1回まで
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
