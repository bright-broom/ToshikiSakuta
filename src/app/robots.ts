import type { MetadataRoute } from "next";
import { OTHER_CRAWLERS, ROBOTS_TXT_ONLY_TOKENS, SEARCH_ENGINE_CRAWLERS } from "@/config/crawler-policy";

/**
 * robots.txt
 * - 主要な検索エンジン: クロールは許可し、取得時に 403 と noindex を返してインデックスさせない
 *   （robots.txt で禁止すると noindex を確認できず、外部リンクから URL だけが登録されることがあるため）
 * - それ以外のクローラー（AI・SEO・アーカイブ・未知のもの）: 全面拒否
 * サイトマップは公開しない
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: [...SEARCH_ENGINE_CRAWLERS], allow: "/" },
      { userAgent: [...OTHER_CRAWLERS, ...ROBOTS_TXT_ONLY_TOKENS], disallow: "/" },
      { userAgent: "*", disallow: "/" },
    ],
  };
}
