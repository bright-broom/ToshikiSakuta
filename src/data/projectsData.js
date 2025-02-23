// =============================
// src/data/projectsData.js
// プロジェクトデータを管理し、OG画像を自動取得するモジュール
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

// =============================
// ヘルパー関数
// =============================

/**
 * 指定したURLのOGPメタタグから `og:image` を取得する
 * @param {string} url - 取得対象のURL
 * @returns {Promise<string>} - 取得したOG画像のURL（取得できなかった場合はデフォルト画像）
 */
async function fetchOgImage(url) {
  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      console.warn(`OG画像取得失敗: ${url} (HTTP ${response.status})`);
      return DEFAULT_IMAGE;
    }

    const text = await response.text();
    const match = text.match(/<meta[^>]+property=["']og:image["'][^>]+content=["'](.*?)["']/i);

    return match ? match[1] : DEFAULT_IMAGE;
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

export { getProjects };
