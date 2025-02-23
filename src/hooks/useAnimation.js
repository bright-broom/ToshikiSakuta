// src/hooks/useAnimation.js

import { useState, useEffect } from 'react';

/**
 * アニメーション状態を制御するカスタムフック
 * @param {boolean} isVisible - 表示状態
 * @param {Object} options - アニメーション設定
 * @param {string} options.enter - 表示時のクラス名
 * @param {string} options.exit - 非表示時のクラス名
 * @param {number} options.duration - アニメーション時間（ミリ秒）
 * @returns {{ animationClass: string }} アニメーション用のクラス名
 */
export const useAnimation = (isVisible, options) => {
  const [animationClass, setAnimationClass] = useState(options.exit);

  useEffect(() => {
    let timeoutId;

    if (isVisible) {
      setAnimationClass(options.enter);
    } else {
      setAnimationClass(options.exit);
    }

    // クリーンアップ関数
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, options.enter, options.exit]);

  return { animationClass };
};