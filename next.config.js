const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy
 * 本番はインラインスクリプト・インラインスタイル・eval をすべて禁止する。
 * 開発時は HMR / React Refresh / エラーオーバーレイのために緩める
 */
const contentSecurityPolicy = [
  "default-src 'none'",
  `script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""}`,
  "script-src-attr 'none'",
  `style-src 'self'${isDev ? " 'unsafe-inline'" : ""}`,
  // 制作実績の OG 画像は外部サイトのものを表示するため https: を許可
  "img-src 'self' https:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["require-trusted-types-for 'script'", "upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // 開発サーバーは _clientMiddlewareManifest.js を application/json で返すため本番のみ付与
  ...(isDev ? [] : [{ key: "X-Content-Type-Options", value: "nosniff" }]),
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "browsing-topics=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "serial=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  // フレームワーク情報をレスポンスヘッダーに出さない
  poweredByHeader: false,
  // next/image は使用しないため、画像最適化 API（/_next/image）を無効化して攻撃対象を減らす
  images: { unoptimized: true },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
