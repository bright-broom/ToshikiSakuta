import { useEffect } from "react";

/**
 * Escape キー押下時にハンドラーを実行する
 * @param handler 実行する関数（null の場合は無効）
 */
export function useEscapeKey(handler: (() => void) | null): void {
  useEffect(() => {
    if (!handler) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handler]);
}
