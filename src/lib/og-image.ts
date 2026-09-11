// 外部サイトの og:image を取得する（サーバー側専用）
// Node.js のテストランナーから直接読み込むため、パスエイリアスを使わず拡張子付きの相対パスで import する
import { OG_IMAGE_FETCH_LIMITS } from "../config/og-image.ts";

const { timeoutMs, maxHtmlBytes, maxMetaTagLength, maxImageUrlLength } = OG_IMAGE_FETCH_LIMITS;

const META_TAG_PATTERN = new RegExp(`<meta\\s[^>]{0,${maxMetaTagLength}}>`, "gi");
const OG_IMAGE_PROPERTY_PATTERN = /\b(?:property|name)\s*=\s*["']og:image["']/i;
const CONTENT_ATTRIBUTE_PATTERN = /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i;

/**
 * レスポンス本文を上限バイト数まで、または </head> が現れるまで読み込む
 */
async function readHead(body: ReadableStream<Uint8Array>): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  let received = 0;

  try {
    while (received < maxHtmlBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      html += decoder.decode(value, { stream: true });
      if (/<\/head>/i.test(html)) break;
    }
  } finally {
    await reader.cancel().catch(() => {});
  }

  return html;
}

/**
 * HTML から og:image の値を抽出する
 * タグ単位で長さを制限し、バックトラックが爆発しない正規表現のみを使う
 */
export function extractOgImage(html: string): string | null {
  for (const tag of html.match(META_TAG_PATTERN) ?? []) {
    if (!OG_IMAGE_PROPERTY_PATTERN.test(tag)) continue;
    const content = tag.match(CONTENT_ATTRIBUTE_PATTERN);
    const value = content?.[1] ?? content?.[2];
    if (value !== undefined) return value.replaceAll("&amp;", "&").trim();
  }

  return null;
}

/**
 * og:image の値を安全な絶対 URL に変換する
 * https 以外（http・javascript・data など）や認証情報付き URL は拒否する
 */
export function toSafeImageUrl(value: string | null, baseUrl: string): string | null {
  if (!value || value.length > maxImageUrlLength) return null;

  const imageUrl = URL.parse(value, baseUrl);
  if (!imageUrl || imageUrl.protocol !== "https:" || imageUrl.username || imageUrl.password) return null;
  return imageUrl.href;
}

/**
 * 指定した URL のページから og:image の URL を取得する
 * 画像そのものはサーバーから取得しない（SSRF 対策）。表示できない場合はクライアント側で代替画像に切り替える
 * @returns 安全な OG 画像 URL。取得できなければ null
 */
export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(timeoutMs),
    });

    // リダイレクト先が https 以外の場合や HTML 以外の応答は扱わない
    const finalUrl = new URL(response.url || url);
    const isHtml = response.headers.get("content-type")?.includes("text/html") ?? false;
    if (!response.ok || finalUrl.protocol !== "https:" || !isHtml || !response.body) {
      console.warn(`OG画像取得失敗: ${url} (HTTP ${response.status})`);
      await response.body?.cancel();
      return null;
    }

    return toSafeImageUrl(extractOgImage(await readHead(response.body)), finalUrl.href);
  } catch (error) {
    console.warn(`OG画像取得エラー: ${url} (${error instanceof Error ? error.name : "UnknownError"})`);
    return null;
  }
}
