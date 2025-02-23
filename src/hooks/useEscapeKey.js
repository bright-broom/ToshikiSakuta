// src/hooks/useEscapeKey.js

import { useEffect } from 'react';

/**
 * Escapeキー押下時のハンドラーを設定するカスタムフック
 * @param {Function|null} handler - Escapeキー押下時に実行する関数
 */
export const useEscapeKey = (handler) => {
  useEffect(() => {
    if (!handler) return;

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [handler]);
};