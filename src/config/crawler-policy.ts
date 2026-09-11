// 検索エンジン・クローラー対策の設定
// サイトは公開するが、検索エンジンからの流入は一切受け付けない。
// src/proxy.ts・src/app/robots.ts・next.config.ts・Node.js のテストランナーから読み込むため、外部モジュールに依存しない

/** 全レスポンスに付与する X-Robots-Tag（HTML 以外の画像なども対象） */
export const X_ROBOTS_TAG = "noindex, nofollow, noarchive, nosnippet, noimageindex";

/**
 * 主要な検索エンジンのクローラー
 * robots.txt でクロールを禁止すると noindex や 403 を確認できず、外部リンクから URL だけが登録されることがあるため、
 * robots.txt ではクロールを許可し、proxy で 403 と noindex を返してインデックスさせない
 */
export const SEARCH_ENGINE_CRAWLERS = [
  "Googlebot",
  "Google-InspectionTool",
  "GoogleOther",
  "Storebot-Google",
  "AdsBot-Google",
  "Mediapartners-Google",
  "APIs-Google",
  "FeedFetcher-Google",
  "bingbot",
  "BingPreview",
  "msnbot",
  "adidxbot",
  "Slurp",
  "Y!J",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "YandexImages",
  "Applebot",
  "Yeti",
  "Daum",
  "SeznamBot",
  "PetalBot",
  "Qwantbot",
  "MojeekBot",
  "coccocbot",
  "Sogou",
  "360Spider",
  "Exabot",
] as const;

/** AI 検索・AI 学習・SEO 分析・アーカイブのクローラー（robots.txt でも全面拒否する） */
export const OTHER_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
  "meta-externalfetcher",
  "FacebookBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "YouBot",
  "AI2Bot",
  "Timpibot",
  "ImagesiftBot",
  "PanguBot",
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "SerpstatBot",
  "rogerbot",
  "Screaming Frog SEO Spider",
  "ia_archiver",
  "archive.org_bot",
] as const;

/** robots.txt 専用のトークン（User-Agent には現れず、AI 学習への利用可否だけを表す） */
export const ROBOTS_TXT_ONLY_TOKENS = ["Google-Extended", "Applebot-Extended"] as const;

/**
 * 検索サイト・AI 検索のホスト（指定したホストとそのサブドメイン）
 * これらから遷移してきたリクエスト（Referer / utm_source）は、インデックスの有無にかかわらず拒否する。
 * メールなど検索以外のサービスと同じドメインを持つサイトは、検索用のサブドメインだけを指定する
 */
export const SEARCH_REFERRER_HOSTS = [
  "bing.com",
  "search.yahoo.co.jp",
  "search.yahoo.com",
  "duckduckgo.com",
  "baidu.com",
  "ya.ru",
  "search.naver.com",
  "search.daum.net",
  "ecosia.org",
  "search.brave.com",
  "startpage.com",
  "qwant.com",
  "ask.com",
  "search.aol.com",
  "sogou.com",
  "so.com",
  "search.seznam.cz",
  "mojeek.com",
  "kagi.com",
  "you.com",
  "perplexity.ai",
  "chatgpt.com",
  "copilot.microsoft.com",
] as const;

/**
 * 国別ドメインを持つ検索サイト（google.com / www.google.co.jp / yandex.ru など、トップページのホストのみ）
 * 注意: Gmail や Google ドキュメント内のリンクも www.google.com を経由するため、同じく拒否される
 */
export const SEARCH_REFERRER_BRANDS = ["google", "yandex"] as const;

/** クローラー・検索経由のリクエストに返すレスポンス */
export const BLOCKED_RESPONSE = {
  status: 403,
  body: "Forbidden",
} as const;
