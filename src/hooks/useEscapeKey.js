// =============================
// src/hooks/useEscapeKey.js
// Escapeキー押下時にハンドラーを実行する
// =============================

import { useEffect } from "react";

/**
 * @param {(() => void) | null} handler - 実行する関数（null の場合は無効）
 */
export function useEscapeKey(handler) {
  useEffect(() => {
    if (!handler) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") handler();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handler]);
}
