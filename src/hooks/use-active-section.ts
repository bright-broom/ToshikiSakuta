import { useEffect, useState } from "react";

// ページ内リンクの遷移位置（html の scroll-padding-top）から、さらにこの距離だけ下を判定位置とする
const DETECTION_MARGIN_PX = 20;

type Section<Id extends string> = { id: Id };

/**
 * スクロール位置から現在表示中のセクションを判定する
 * @param sections 判定対象のセクション（1 件以上。参照が変わらない配列を渡すこと）
 */
export function useActiveSection<Id extends string>(sections: readonly [Section<Id>, ...Section<Id>[]]): Id {
  const [activeSection, setActiveSection] = useState<Id>(sections[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // scroll-padding-top はブレークポイントで変わるため、判定のたびに読み取る
      const scrollPaddingTop = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const detectionLine = scrollPaddingTop + DETECTION_MARGIN_PX;
      const current = sections.find(({ id }) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect !== undefined && rect.top <= detectionLine && rect.bottom > detectionLine;
      });
      if (current) setActiveSection(current.id);
    };

    // スクロールごとの判定は 1 フレームに 1 回まで
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  return activeSection;
}
