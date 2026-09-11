import { expect, test } from "./fixtures";

const nonceOf = (policy: string | undefined) => policy?.match(/'nonce-([^']+)'/)?.[1];

test.describe("セキュリティ", () => {
  test("HTML の全 script に、リクエストごとに異なる nonce が付与される", async ({ page, request }) => {
    const response = await page.goto("/");
    const policy = response?.headers()["content-security-policy"];
    const nonce = nonceOf(policy);
    expect(nonce).toBeTruthy();

    const scriptNonces = await page.locator("script").evaluateAll((scripts) => scripts.map((script) => script.nonce));
    expect(scriptNonces.length).toBeGreaterThan(0);
    expect(new Set(scriptNonces)).toEqual(new Set([nonce]));

    const second = await request.get("/");
    expect(nonceOf(second.headers()["content-security-policy"])).not.toBe(nonce);
  });

  test("セキュリティヘッダーが付与され、フレームワーク情報を出さない", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["strict-transport-security"]).toContain("max-age=");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("静的ファイルと同じ名前で始まる存在しないパスにも CSP が付く", async ({ request }) => {
    for (const path of ["/images/nope", "/icon.svgx", "/robots.txt.html"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
      expect(response.headers()["content-security-policy"], path).toContain("'nonce-");
    }
  });

  test("画像最適化 API は無効化されている", async ({ request }) => {
    const response = await request.get("/_next/image?url=%2Fimages%2Fprojects%2Fzikin.webp&w=640&q=75");
    expect(response.status()).not.toBe(200);
  });

  test.describe("注入されたコードは実行されない", () => {
    test.use({ expectedViolations: true });

    test("イベントハンドラ属性・javascript: URL・インラインスタイル", async ({ page }) => {
      await page.goto("/");

      const results = await page.evaluate(async () => {
        const state = { handler: false, javascriptUrl: false };
        Object.assign(window, { __state: state });

        const image = document.createElement("img");
        image.setAttribute("onerror", "window.__state.handler = true");
        image.src = "/__missing__.png";
        document.body.append(image);

        const link = document.createElement("a");
        link.href = "javascript:window.__state.javascriptUrl=true";
        document.body.append(link);
        link.click();

        const box = document.createElement("div");
        box.setAttribute("style", "position:absolute;width:123px;height:1px");
        document.body.append(box);
        const styledWidth = box.getBoundingClientRect().width;

        await new Promise((resolve) => setTimeout(resolve, 500));
        return { ...state, inlineStyleApplied: styledWidth === 123 };
      });

      expect(results).toEqual({ handler: false, javascriptUrl: false, inlineStyleApplied: false });
      const directives = await page.evaluate(() => window.__cspViolations.map((violation) => violation.directive));
      expect(directives).toEqual(expect.arrayContaining(["script-src-attr", "style-src-attr"]));
    });
  });
});
