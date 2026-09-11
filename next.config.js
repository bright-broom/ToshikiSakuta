const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy
 * 本番ではインラインスクリプトと eval を禁止する。開発時は HMR / React Refresh のために緩める
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""}`,
  // next/image が style 属性を出力するため 'unsafe-inline' が必要
  "style-src 'self' 'unsafe-inline'",
  // 外部サイトの OG 画像を表示するため https: を許可
  "img-src 'self' https:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "media-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
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
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  // フレームワーク情報をレスポンスヘッダーに出さない
  poweredByHeader: false,
  images: {
    // 画像最適化 API で扱うのはローカル画像のみ（外部 OG 画像は unoptimized で直接表示）
    localPatterns: [{ pathname: "/images/**", search: "" }],
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
