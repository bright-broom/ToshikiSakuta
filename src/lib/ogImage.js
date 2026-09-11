// =============================
// src/lib/ogImage.js
// 外部サイトの og:image を取得する（サーバー側専用: getStaticProps から呼び出す）
// =============================

const FETCH_TIMEOUT_MS = 5000; // 応答しないサイトでビルドが止まらないようにする
const MAX_HTML_BYTES = 512 * 1024; // 巨大なレスポンスによるメモリ枯渇を防ぐ
const MAX_META_TAG_LENGTH = 2048; // 1タグあたりの走査量を制限する（ReDoS対策）
const MAX_IMAGE_URL_LENGTH = 2048;

/**
 * レスポンス本文を上限バイト数まで、または </head> が現れるまで読み込む
 * @param {Response} response
 * @returns {Promise<string>}
 */
async function readHead(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  let received = 0;

  try {
    while (received < MAX_HTML_BYTES) {
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
 * HTMLから og:image の値を抽出する
 * タグ単位で長さを制限し、バックトラックが爆発しない正規表現のみを使う
 * @param {string} html
 * @returns {string | null}
 */
export function extractOgImage(html) {
  const metaTags = html.match(new RegExp(`<meta\\s[^>]{0,${MAX_META_TAG_LENGTH}}>`, "gi")) ?? [];

  for (const tag of metaTags) {
    if (!/\b(?:property|name)\s*=\s*["']og:image["']/i.test(tag)) continue;
    const content = tag.match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (content) return (content[1] ?? content[2]).replace(/&amp;/g, "&").trim();
  }

  return null;
}

/**
 * og:image の値を安全な絶対URLに変換する
 * https 以外（http・javascript・data など）や認証情報付きURLは拒否する
 * @param {string | null} value - og:image の値
 * @param {string} baseUrl - 相対パス解決の基準となるページURL
 * @returns {string | null}
 */
export function toSafeImageUrl(value, baseUrl) {
  if (!value || value.length > MAX_IMAGE_URL_LENGTH) return null;

  try {
    const imageUrl = new URL(value, baseUrl);
    if (imageUrl.protocol !== "https:" || imageUrl.username || imageUrl.password) return null;
    return imageUrl.href;
  } catch {
    return null;
  }
}

/**
 * 指定したURLのページから og:image のURLを取得する
 * 画像そのものはサーバーから取得しない（SSRF対策）。表示できない場合はクライアント側で代替画像に切り替える
 * @param {string} url - https のページURL
 * @returns {Promise<string | null>} 安全なOG画像URL。取得できなければ null
 */
export async function fetchOgImage(url) {
  try {
    const response = await fetch(url, {
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    // リダイレクト先が https 以外の場合や HTML 以外の応答は扱わない
    const finalUrl = new URL(response.url || url);
    if (!response.ok || finalUrl.protocol !== "https:" || !response.headers.get("content-type")?.includes("text/html")) {
      console.warn(`OG画像取得失敗: ${url} (HTTP ${response.status})`);
      await response.body?.cancel();
      return null;
    }

    return toSafeImageUrl(extractOgImage(await readHead(response)), finalUrl.href);
  } catch (error) {
    console.warn(`OG画像取得エラー: ${url} (${error.name})`);
    return null;
  }
}
