import type { NextConfig } from "next";
import { X_ROBOTS_TAG } from "./src/config/crawler-policy.ts";
import { STATIC_SECURITY_HEADERS } from "./src/config/security.ts";

const nextConfig: NextConfig = {
  // Cache Components（"use cache" / cacheLife）によるキャッシュモデルを使用する
  cacheComponents: true,
  // 手動メモ化（useMemo / useCallback / memo）の代わりに React Compiler で最適化する
  reactCompiler: true,
  typedRoutes: true,
  // フレームワーク情報をレスポンスヘッダーに出さない
  poweredByHeader: false,
  // next/image は使用しないため、画像最適化 API（/_next/image）を無効化して攻撃対象を減らす
  images: { unoptimized: true },
  // next dev による AGENTS.md / CLAUDE.md の自動生成を無効化する
  agentRules: false,
  async headers() {
    // Content-Security-Policy はリクエストごとの nonce が必要なため src/proxy.ts で付与する。
    // X-Robots-Tag は proxy の対象外（ビルド済みチャンク・robots.txt）を含む全レスポンスに付与する
    return [
      { source: "/:path*", headers: [...STATIC_SECURITY_HEADERS, { key: "X-Robots-Tag", value: X_ROBOTS_TAG }] },
    ];
  },
};

export default nextConfig;
