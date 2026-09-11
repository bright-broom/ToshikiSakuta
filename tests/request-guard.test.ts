import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { OTHER_CRAWLERS, SEARCH_ENGINE_CRAWLERS } from "../src/config/crawler-policy.ts";
import { getBlockReason, isCrawler, isSearchHost, isSearchReferral } from "../src/lib/request-guard.ts";

const SITE = new URL("https://portfolio.example/");

describe("isCrawler", () => {
  const crawlerUserAgents = [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/139.0.0.0 Safari/537.36",
    "Googlebot-Image/1.0",
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
    "Y!J-WSC/1.0",
    "Mozilla/5.0 (Linux; Android 6.0.1) (compatible; Yeti/1.1; +https://naver.me/spd)",
    "DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)",
    "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
    "Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1)",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
    "CCBot/2.0 (https://commoncrawl.org/faq/)",
    "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)",
    "ia_archiver (+http://www.alexa.com/site/help/webmasters; crawler@alexa.com)",
  ];

  for (const userAgent of crawlerUserAgents) {
    test(`拒否: ${userAgent.slice(0, 70)}`, () => assert.equal(isCrawler(userAgent), true));
  }

  test("定義したすべてのクローラー名を検出する", () => {
    for (const token of [...SEARCH_ENGINE_CRAWLERS, ...OTHER_CRAWLERS]) {
      assert.equal(isCrawler(`Mozilla/5.0 (compatible; ${token}/1.0)`), true, token);
    }
  });

  const browserUserAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) Gecko/20100101 Firefox/142.0",
    // SNS のリンクプレビューは検索流入ではないため許可する
    "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
    "Twitterbot/1.0",
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)",
  ];

  for (const userAgent of browserUserAgents) {
    test(`許可: ${userAgent.slice(0, 70)}`, () => assert.equal(isCrawler(userAgent), false));
  }

  test("空・未指定は許可する", () => {
    assert.equal(isCrawler(null), false);
    assert.equal(isCrawler(""), false);
  });

  test("巨大な User-Agent でも短時間で判定する", () => {
    const start = performance.now();
    isCrawler("a".repeat(1_000_000));
    assert.ok(performance.now() - start < 100);
  });
});

describe("isSearchHost", () => {
  for (const host of [
    "www.google.com",
    "google.co.jp",
    "www.google.com.au",
    "www.bing.com",
    "cn.bing.com",
    "search.yahoo.co.jp",
    "duckduckgo.com",
    "yandex.ru",
    "search.naver.com",
    "chatgpt.com",
    "www.perplexity.ai",
    "WWW.GOOGLE.COM.",
  ]) {
    test(`検索サイト: ${host}`, () => assert.equal(isSearchHost(host), true));
  }

  for (const host of [
    "portfolio.example",
    "github.com",
    "mail.yahoo.co.jp",
    "mail.naver.com",
    "notgoogle.com",
    "google.example.org",
    "google.evil.example.com",
    "bing.com.evil.example",
  ]) {
    test(`検索サイトではない: ${host}`, () => assert.equal(isSearchHost(host), false));
  }
});

describe("isSearchReferral", () => {
  test("検索サイトからの Referer を検出する", () => {
    assert.equal(isSearchReferral("https://www.google.co.jp/", SITE), true);
    assert.equal(isSearchReferral("https://search.yahoo.co.jp/search?p=toshiki", SITE), true);
  });

  test("utm_source に検索サイトが指定されていれば検出する", () => {
    assert.equal(isSearchReferral(null, new URL("https://portfolio.example/?utm_source=chatgpt.com")), true);
    assert.equal(isSearchReferral(null, new URL("https://portfolio.example/?utm_source=newsletter")), false);
  });

  test("直接アクセス・自サイト内・その他のサイトからの遷移は許可する", () => {
    assert.equal(isSearchReferral(null, SITE), false);
    assert.equal(isSearchReferral("https://portfolio.example/#works", SITE), false);
    assert.equal(isSearchReferral("https://github.com/bright-broom", SITE), false);
    assert.equal(isSearchReferral("not a url", SITE), false);
  });
});

describe("getBlockReason", () => {
  test("クローラーを優先して判定する", () => {
    assert.equal(getBlockReason({ userAgent: "Googlebot/2.1", referer: "https://www.google.com/", url: SITE }), "crawler");
    assert.equal(
      getBlockReason({ userAgent: "Mozilla/5.0 Chrome/140.0", referer: "https://www.bing.com/", url: SITE }),
      "search-referral",
    );
    assert.equal(getBlockReason({ userAgent: "Mozilla/5.0 Chrome/140.0", referer: null, url: SITE }), null);
  });
});
