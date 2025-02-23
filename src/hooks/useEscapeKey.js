// =============================
// src/hooks/useEscapeKey.js
// Escapeキー押下時のハンドラーを設定するカスタムフック
// =============================

import { useEffect } from "react";

/**
 * Escapeキー押下時に指定のハンドラーを実行するカスタムフック
 * @param {Function|null} handler - Escapeキー押下時に実行する関数（nullの場合は無効）
 */
export const useEscapeKey = (handler) => {
  useEffect(() => {
    if (typeof handler !== "function") return;

    /**
     * Escapeキーのイベントリスナー
     * @param {KeyboardEvent} event - キーボードイベント
     */
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    // イベントリスナーを追加
    document.addEventListener("keydown", handleEscapeKey);

    // クリーンアップ関数
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handler]);
};
