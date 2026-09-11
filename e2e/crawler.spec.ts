import { X_ROBOTS_TAG } from "../src/config/crawler-policy.ts";
import { expect, test } from "./fixtures";

const GOOGLEBOT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const GPTBOT = "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)";
const CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

test.describe("検索エンジン対策", () => {
  test("ページと画像・静的ファイル・robots.txt のすべてに X-Robots-Tag が付く", async ({ page, request }) => {
    await page.goto("/");
    const chunk = await page.locator('script[src^="/_next/static/"]').first().getAttribute("src");
    expect(chunk).toBeTruthy();

    for (const path of ["/", "/images/projects/zikin.webp", "/icon.svg", "/robots.txt", chunk ?? "", "/does-not-exist"]) {
      const response = await request.get(path, { headers: { "user-agent": CHROME } });
      expect(response.headers()["x-robots-tag"], path).toBe(X_ROBOTS_TAG);
    }
  });

  test("HTML に noindex の robots メタタグを出力する", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex, nofollow/);
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /noindex, nofollow, noimageindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test("サイトマップを公開しない", async ({ request }) => {
    expect((await request.get("/sitemap.xml")).status()).toBe(404);
  });

  test("robots.txt は主要検索エンジンにのみクロールを許可し、それ以外を全面拒否する", async ({ request }) => {
    const response = await request.get("/robots.txt", { headers: { "user-agent": GOOGLEBOT } });
    expect(response.status()).toBe(200);
    const body = await response.text();

    expect(body).toMatch(/User-Agent: Googlebot\n(?:User-Agent: .+\n)*Allow: \//);
    expect(body).toMatch(/User-Agent: GPTBot\n(?:User-Agent: .+\n)*Disallow: \//);
    expect(body).toMatch(/User-Agent: \*\nDisallow: \//);
    expect(body).not.toContain("Sitemap");
  });

  for (const [name, userAgent] of [
    ["検索エンジン", GOOGLEBOT],
    ["AI クローラー", GPTBOT],
  ] as const) {
    test(`${name}のクローラーはページも画像も 403 で拒否する`, async ({ request }) => {
      for (const path of ["/", "/images/projects/zikin.webp", "/icon.svg", "/does-not-exist"]) {
        const response = await request.get(path, { headers: { "user-agent": userAgent } });
        expect(response.status(), path).toBe(403);
        expect(response.headers()["x-robots-tag"], path).toBe(X_ROBOTS_TAG);
        expect(response.headers()["cache-control"], path).toBe("no-store");
        expect(await response.text(), path).toBe("Forbidden");
      }
    });
  }

  test("プリフェッチ用ヘッダーを付けてもクローラー判定を回避できない", async ({ request }) => {
    const response = await request.get("/", { headers: { "user-agent": GOOGLEBOT, purpose: "prefetch", "next-router-prefetch": "1" } });
    expect(response.status()).toBe(403);
  });

  test("検索サイト・AI 検索からの遷移は 403 で拒否する", async ({ request }) => {
    for (const referer of ["https://www.google.co.jp/", "https://www.bing.com/search?q=toshiki", "https://search.yahoo.co.jp/"]) {
      const response = await request.get("/", { headers: { "user-agent": CHROME, referer } });
      expect(response.status(), referer).toBe(403);
    }
    expect((await request.get("/?utm_source=chatgpt.com", { headers: { "user-agent": CHROME } })).status()).toBe(403);
  });

  test("直接アクセスとその他のサイトからの遷移は表示できる", async ({ request }) => {
    expect((await request.get("/", { headers: { "user-agent": CHROME } })).status()).toBe(200);
    expect((await request.get("/", { headers: { "user-agent": CHROME, referer: "https://github.com/bright-broom" } })).status()).toBe(200);
  });
});
