// 環境変数の読み取りと検証
// Node.js のテストランナーから読み込むため、外部モジュールに依存しない

const LOCAL_SITE_URL = "http://localhost:3000";

type SiteUrlEnvironment = {
  NODE_ENV?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

/** 空文字や空白だけの値は未設定として扱う */
const readEnv = (value: string | undefined) => (value?.trim() ? value.trim() : undefined);

/**
 * サイトの公開 URL（metadataBase / sitemap / robots で使用）
 * 優先順位: NEXT_PUBLIC_SITE_URL > Vercel の本番ドメイン > ローカル（開発時のみ）
 * 本番ビルドで URL を決められない場合は、localhost の canonical や sitemap を公開しないようエラーにする
 */
export function getSiteUrl(env: SiteUrlEnvironment = process.env): URL {
  const explicitUrl = readEnv(env.NEXT_PUBLIC_SITE_URL);
  const vercelHost = readEnv(env.VERCEL_PROJECT_PRODUCTION_URL);
  const candidate = explicitUrl ?? (vercelHost ? `https://${vercelHost}` : undefined);

  if (!candidate) {
    if (env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL を設定してください（例: https://example.com）");
    }
    return new URL(LOCAL_SITE_URL);
  }

  const url = URL.parse(candidate);
  if (!url) {
    throw new Error(`サイト URL の形式が正しくありません: ${candidate}`);
  }
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error(`サイト URL は https で指定してください: ${candidate}`);
  }
  return url;
}
