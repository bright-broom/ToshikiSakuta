const LOCAL_SITE_URL = "http://localhost:3000";

/**
 * サイトの公開 URL（metadataBase / sitemap / robots で使用）
 * 優先順位: NEXT_PUBLIC_SITE_URL > Vercel の本番ドメイン > ローカル
 */
export function getSiteUrl(): URL {
  const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProductionHost ? `https://${vercelProductionHost}` : LOCAL_SITE_URL);

  const url = new URL(candidate);
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error(`サイト URL は https で指定してください: ${candidate}`);
  }
  return url;
}
