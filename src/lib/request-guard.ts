// クローラー・検索流入の判定（src/proxy.ts から使用）
// Node.js のテストランナーから直接読み込むため、パスエイリアスを使わず拡張子付きの相対パスで import する
import {
  OTHER_CRAWLERS,
  SEARCH_ENGINE_CRAWLERS,
  SEARCH_REFERRER_BRANDS,
  SEARCH_REFERRER_HOSTS,
} from "../config/crawler-policy.ts";

export type BlockReason = "crawler" | "search-referral";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// トークンの前後が英数字でないことを条件に、部分一致による誤検知（例: "Yeti" を含む別の単語）を防ぐ
const CRAWLER_PATTERN = new RegExp(
  `(?:^|[^a-z0-9])(?:${[...SEARCH_ENGINE_CRAWLERS, ...OTHER_CRAWLERS].map(escapeRegExp).join("|")})(?:$|[^a-z0-9])`,
  "i",
);

const MAX_HEADER_LENGTH = 2048;

/** User-Agent が検索エンジン・AI・SEO などのクローラーか */
export function isCrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return CRAWLER_PATTERN.test(userAgent.slice(0, MAX_HEADER_LENGTH));
}

/** ホスト名が検索サイト・AI 検索のものか */
export function isSearchHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (SEARCH_REFERRER_HOSTS.some((domain) => host === domain || host.endsWith(`.${domain}`))) return true;

  // google.com / www.google.co.jp / yandex.com.tr など、国別ドメインの検索サイト（サブドメインは www のみ）
  const labels = host.split(".");
  const [first, ...rest] = labels[0] === "www" ? labels.slice(1) : labels;
  return (
    first !== undefined &&
    SEARCH_REFERRER_BRANDS.some((brand) => brand === first) &&
    rest.length >= 1 &&
    rest.length <= 2 &&
    rest.every((label) => /^[a-z]{2,3}$/.test(label))
  );
}

/** Referer・utm_source が検索サイト・AI 検索を示しているか */
export function isSearchReferral(referer: string | null, url: URL): boolean {
  const refererUrl = referer ? URL.parse(referer.slice(0, MAX_HEADER_LENGTH)) : null;
  if (refererUrl && refererUrl.host !== url.host && isSearchHost(refererUrl.hostname)) return true;

  // ChatGPT などは Referer を送らず utm_source にドメインを付けることがある
  const utmSource = url.searchParams.get("utm_source");
  return utmSource !== null && isSearchHost(utmSource.slice(0, 255));
}

/** リクエストを拒否すべき理由を返す（許可する場合は null） */
export function getBlockReason(request: { userAgent: string | null; referer: string | null; url: URL }): BlockReason | null {
  if (isCrawler(request.userAgent)) return "crawler";
  if (isSearchReferral(request.referer, request.url)) return "search-referral";
  return null;
}
