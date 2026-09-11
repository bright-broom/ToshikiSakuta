// CSP とセキュリティヘッダーの定義
// next.config.ts と src/proxy.ts、Node.js のテストランナーから読み込むため、外部モジュールに依存しない

type CspDirective =
  | "default-src"
  | "script-src"
  | "script-src-attr"
  | "style-src"
  | "img-src"
  | "font-src"
  | "connect-src"
  | "manifest-src"
  | "object-src"
  | "base-uri"
  | "form-action"
  | "frame-ancestors";

type CspOptions = {
  nonce: string;
  isDevelopment?: boolean;
};

/**
 * リクエストごとに使い捨ての nonce を生成する（128 bit）
 */
export function createNonce(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("base64");
}

/**
 * Content Security Policy
 * 本番はインラインスクリプト・インラインスタイル・eval をすべて禁止し、Next.js が出力するタグだけを nonce で許可する。
 * 開発時は React のデバッグ機能（eval）と HMR のために緩める。
 * App Router のクライアントランタイムは innerHTML を使用するため、require-trusted-types-for は指定できない
 */
export function buildContentSecurityPolicy({
  nonce,
  isDevelopment = process.env.NODE_ENV === "development",
}: CspOptions): string {
  const directives: Record<CspDirective, readonly string[]> = {
    "default-src": ["'none'"],
    "script-src": ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", ...(isDevelopment ? ["'unsafe-eval'"] : [])],
    "script-src-attr": ["'none'"],
    "style-src": ["'self'", isDevelopment ? "'unsafe-inline'" : `'nonce-${nonce}'`],
    "img-src": ["'self'"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(isDevelopment ? ["ws:"] : [])],
    "manifest-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'none'"],
    "form-action": ["'none'"],
    "frame-ancestors": ["'none'"],
  };

  const flags = isDevelopment ? [] : ["upgrade-insecure-requests"];

  return [...Object.entries(directives).map(([name, values]) => `${name} ${values.join(" ")}`), ...flags].join("; ");
}

const DISABLED_PERMISSIONS = [
  "accelerometer",
  "autoplay",
  "browsing-topics",
  "camera",
  "display-capture",
  "encrypted-media",
  "fullscreen",
  "geolocation",
  "gyroscope",
  "magnetometer",
  "microphone",
  "midi",
  "payment",
  "picture-in-picture",
  "publickey-credentials-get",
  "screen-wake-lock",
  "serial",
  "usb",
  "xr-spatial-tracking",
] as const;

/** 全レスポンスに付与するセキュリティヘッダー（CSP は nonce が必要なため src/proxy.ts で付与する） */
export const STATIC_SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: DISABLED_PERMISSIONS.map((feature) => `${feature}=()`).join(", ") },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
] as const satisfies readonly { key: string; value: string }[];
