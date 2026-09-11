/**
 * 外部サイトから og:image を取得する際の制限値
 * src/lib/og-image.ts から相対パスで読み込まれる（Node.js のテストランナーでも解決できるようにするため）
 */
export const OG_IMAGE_FETCH_LIMITS = {
  /** 応答しないサイトでレンダリングが止まらないようにする */
  timeoutMs: 5000,
  /** 巨大なレスポンスによるメモリ枯渇を防ぐ */
  maxHtmlBytes: 512 * 1024,
  /** 1 タグあたりの走査量を制限する（ReDoS 対策） */
  maxMetaTagLength: 2048,
  maxImageUrlLength: 2048,
} as const;

/** 取得結果のキャッシュ期間（next.config.ts の cacheLife プロファイル名） */
export const OG_IMAGE_CACHE_PROFILE = "days";
