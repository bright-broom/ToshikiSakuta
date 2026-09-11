// src/lib/og-image.ts のセキュリティ上の境界条件を検証する
import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import { OG_IMAGE_FETCH_LIMITS } from "../src/config/og-image.ts";
import { extractOgImage, fetchOgImage, toSafeImageUrl } from "../src/lib/og-image.ts";

describe("extractOgImage", () => {
  test("property / content の順序に依存せず抽出する", () => {
    assert.equal(extractOgImage('<meta property="og:image" content="https://a.example/1.png">'), "https://a.example/1.png");
    assert.equal(extractOgImage("<meta content='https://a.example/2.png' property='og:image'>"), "https://a.example/2.png");
  });

  test("&amp; をデコードする", () => {
    assert.equal(
      extractOgImage('<meta property="og:image" content="https://a.example/i.png?a=1&amp;b=2">'),
      "https://a.example/i.png?a=1&b=2",
    );
  });

  test("og:image がなければ null", () => {
    assert.equal(extractOgImage('<meta property="og:title" content="x">'), null);
  });

  test("ReDoS を狙った入力（読み込み上限サイズ）でも短時間で終わる", () => {
    const payload = "<meta property ";
    const start = performance.now();
    extractOgImage(payload.repeat(Math.ceil(OG_IMAGE_FETCH_LIMITS.maxHtmlBytes / payload.length)));
    assert.ok(performance.now() - start < 2000);
  });
});

describe("toSafeImageUrl", () => {
  const base = "https://site.example/page";

  test("https の絶対 URL・相対パスを許可する", () => {
    assert.equal(toSafeImageUrl("https://cdn.example/a.png", base), "https://cdn.example/a.png");
    assert.equal(toSafeImageUrl("/og.png", base), "https://site.example/og.png");
  });

  const rejected = [
    "http://cdn.example/a.png",
    "javascript:alert(1)",
    "data:image/png;base64,AAAA",
    "https://user:pass@cdn.example/a.png",
    `https://cdn.example/${"a".repeat(OG_IMAGE_FETCH_LIMITS.maxImageUrlLength)}`,
    "",
    null,
  ];

  for (const value of rejected) {
    test(`拒否: ${String(value).slice(0, 40)}`, () => {
      assert.equal(toSafeImageUrl(value, base), null);
    });
  }
});

describe("fetchOgImage", () => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const PAGE_URL = "https://site.example/";

  /** fetch を差し替え、指定したレスポンスを返す */
  const mockFetch = (createResponse: (url: string, init: RequestInit) => Response | Promise<Response>) => {
    console.warn = () => {};
    globalThis.fetch = (async (url: string, init: RequestInit) => createResponse(url, init)) as typeof fetch;
  };

  const html = (body: string, init: ResponseInit = {}) =>
    new Response(body, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" }, ...init });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  });

  test("og:image を安全な絶対 URL として返す", async () => {
    mockFetch(() => html('<html><head><meta property="og:image" content="/images/og.png"></head>'));
    assert.equal(await fetchOgImage(PAGE_URL), "https://site.example/images/og.png");
  });

  test("危険な og:image は null", async () => {
    mockFetch(() => html('<head><meta property="og:image" content="javascript:alert(1)"></head>'));
    assert.equal(await fetchOgImage(PAGE_URL), null);
  });

  test("HTML 以外の応答は null", async () => {
    mockFetch(
      () =>
        new Response('<meta property="og:image" content="https://cdn.example/a.png">', {
          headers: { "Content-Type": "application/json" },
        }),
    );
    assert.equal(await fetchOgImage(PAGE_URL), null);
  });

  test("エラー応答は null", async () => {
    mockFetch(() => html('<meta property="og:image" content="https://cdn.example/a.png">', { status: 500 }));
    assert.equal(await fetchOgImage(PAGE_URL), null);
  });

  test("巨大な応答は上限までしか読み込まない", async () => {
    let bytesSent = 0;
    const chunk = new TextEncoder().encode("a".repeat(64 * 1024));
    const endless = new ReadableStream<Uint8Array>({
      pull(controller) {
        bytesSent += chunk.byteLength;
        controller.enqueue(chunk);
      },
    });
    mockFetch(() => new Response(endless, { headers: { "Content-Type": "text/html" } }));

    assert.equal(await fetchOgImage(PAGE_URL), null);
    assert.ok(bytesSent <= OG_IMAGE_FETCH_LIMITS.maxHtmlBytes * 2, `読み込み量: ${bytesSent} bytes`);
  });

  test("応答しないサイトはタイムアウトで打ち切る", { timeout: OG_IMAGE_FETCH_LIMITS.timeoutMs * 2 }, async () => {
    mockFetch((_url, init) => {
      const signal = init.signal;
      assert.ok(signal instanceof AbortSignal);
      return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(signal.reason)));
    });
    // AbortSignal.timeout のタイマーはイベントループを維持しないため、待機中にテストが終了しないようにする
    const keepAlive = setInterval(() => {}, 1000);
    try {
      const start = performance.now();
      assert.equal(await fetchOgImage(PAGE_URL), null);
      assert.ok(performance.now() - start < OG_IMAGE_FETCH_LIMITS.timeoutMs + 1000);
    } finally {
      clearInterval(keepAlive);
    }
  });

  test("ネットワークエラーは null", async () => {
    mockFetch(() => {
      throw new TypeError("fetch failed");
    });
    assert.equal(await fetchOgImage(PAGE_URL), null);
  });
});
