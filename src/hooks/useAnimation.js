// =============================
// src/hooks/useAnimation.js
// 表示状態を制御するカスタムフック
// =============================

import { useState, useEffect } from "react";

/**
 * アニメーション状態を制御するカスタムフック
 * @param {boolean} isVisible - 表示状態
 * @param {Object} [options={}] - アニメーション設定
 * @param {string} [options.enter="opacity-100 scale-100"] - 表示時のクラス名
 * @param {string} [options.exit="opacity-0 scale-95"] - 非表示時のクラス名
 * @param {number} [options.duration=300] - アニメーション時間（ミリ秒）
 * @returns {{ animationClass: string, isAnimating: boolean }} アニメーション用のクラス名とアニメーション中かどうかの状態
 */
export const useAnimation = (isVisible, options = {}) => {
  const { enter = "opacity-100 scale-100", exit = "opacity-0 scale-95", duration = 300 } = options;
  const [animationClass, setAnimationClass] = useState(exit);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isVisible) {
      setAnimationClass(enter);
      setIsAnimating(true);
    } else {
      setIsAnimating(true);
      timeoutId = setTimeout(() => {
        setAnimationClass(exit);
        setIsAnimating(false);
      }, duration);
    }

    // クリーンアップ関数
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible, enter, exit, duration]);

  return { animationClass, isAnimating };
};
