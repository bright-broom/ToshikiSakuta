// =============================
// src/data/projectsData.js
// プロジェクトデータを管理し、OG画像を自動取得するモジュール
// ※ getProjects はサーバー側（getStaticProps）でのみ実行する
// =============================

/**
 * プロジェクトデータの型定義
 * @typedef {Object} Project
 * @property {string} id - プロジェクトの一意識別子
 * @property {string} title - プロジェクトのタイトル
 * @property {string} description - プロジェクトの短い説明
 * @property {string} details - プロジェクトの詳細説明
 * @property {string} imgSrc - プロジェクト画像のパス
 * @property {string} url - プロジェクトのURL
 * @property {string[]} tags - 使用技術タグ
 */

// =============================
// 設定
// =============================

const DEFAULT_IMAGE = "/images/default.jpg"; // 取得できなかった場合のデフォルト画像
const FETCH_TIMEOUT_MS = 5000; // 応答しないサイトでビルドが止まらないようにする
const MAX_HTML_BYTES = 512 * 1024; // 巨大なレスポンスによるメモリ枯渇を防ぐ
const MAX_META_TAG_LENGTH = 2048; // 1タグあたりの走査量を制限する
const MAX_IMAGE_URL_LENGTH = 2048;

// =============================
// ヘルパー関数
// =============================

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
function extractOgImage(html) {
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
 * @param {string} value - og:image の値
 * @param {string} baseUrl - 相対パス解決の基準となるページURL
 * @returns {string | null}
 */
function toSafeImageUrl(value, baseUrl) {
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
 * 指定したURLのOGPメタタグから `og:image` を取得する
 * 画像そのものはサーバーから取得しない（SSRF対策）。表示に失敗した場合はクライアント側でデフォルト画像に切り替える
 * @param {string} url - 取得対象のURL
 * @returns {Promise<string>} - 取得したOG画像のURL（取得できなかった場合はデフォルト画像）
 */
async function fetchOgImage(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
      console.warn(`OG画像取得失敗: ${url} (HTTP ${response.status})`);
      await response.body?.cancel();
      return DEFAULT_IMAGE;
    }

    const html = await readHead(response);
    return toSafeImageUrl(extractOgImage(html), response.url || url) ?? DEFAULT_IMAGE;
  } catch (error) {
    console.error(`OG画像取得エラー: ${url}`, error);
    return DEFAULT_IMAGE;
  }
}

/**
 * プロジェクトリストを定義
 * @returns {Project[]} - 静的なプロジェクトデータ
 */
function getStaticProjects() {
  return [
    {
      id: "east-projects",
      title: "East Projects",
      description: "東京を拠点とするクリエイティブスタジオのコーポレートサイト",
      details: "Next.js、Tailwind CSS、Framer Motionを使用したモダンなウェブサイト制作",
      url: "https://eastprojects.jp/",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "albadx",
      title: "ZIKIN",
      description: "税金計算アプリ",
      details: "額面収入から各種税金の詳細額を会社負担額付きで表示",
      url: "https://zeikin.vercel.app/",
      tags: ["React", "Tailwind CSS", "SEO"],
    },
    {
      id: "dentaku",
      title: "DENTAKU",
      description: "モダンなUI/UXを備えた計算機アプリケーション",
      details: "アクセシビリティに配慮したインタラクティブな電卓アプリ",
      url: "https://dentaku-kappa.vercel.app/",
      tags: ["React", "TypeScript", "Accessibility"],
    },
  ];
}

// =============================
// メイン処理
// =============================

/**
 * プロジェクトデータを取得（OG画像を含む）
 * @returns {Promise<Project[]>}
 */
async function getProjects() {
  const projects = getStaticProjects();

  // OG画像を並列で取得
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      imgSrc: await fetchOgImage(project.url),
    }))
  );

  return projectsWithImages;
}

export { getProjects, DEFAULT_IMAGE };
