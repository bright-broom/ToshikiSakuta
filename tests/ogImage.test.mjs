// src/lib/ogImage.js のセキュリティ上の境界条件を検証する
import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import { extractOgImage, fetchOgImage, toSafeImageUrl } from "../src/lib/ogImage.js";

describe("extractOgImage", () => {
  test("property / content の順序に依存せず抽出する", () => {
    assert.equal(extractOgImage('<meta property="og:image" content="https://a.example/1.png">'), "https://a.example/1.png");
    assert.equal(extractOgImage("<meta content='https://a.example/2.png' property='og:image'>"), "https://a.example/2.png");
  });

  test("&amp; をデコードする", () => {
    assert.equal(extractOgImage('<meta property="og:image" content="https://a.example/i.png?a=1&amp;b=2">'), "https://a.example/i.png?a=1&b=2");
  });

  test("og:image がなければ null", () => {
    assert.equal(extractOgImage('<meta property="og:title" content="x">'), null);
  });

  test("ReDoS を狙った入力（読み込み上限 512KB）でも短時間で終わる", () => {
    const start = performance.now();
    extractOgImage("<meta property ".repeat(Math.ceil((512 * 1024) / 15)));
    assert.ok(performance.now() - start < 2000);
  });
});

describe("toSafeImageUrl", () => {
  const base = "https://site.example/page";

  test("https の絶対URL・相対パスを許可する", () => {
    assert.equal(toSafeImageUrl("https://cdn.example/a.png", base), "https://cdn.example/a.png");
    assert.equal(toSafeImageUrl("/og.png", base), "https://site.example/og.png");
  });

  for (const value of [
    "http://cdn.example/a.png",
    "javascript:alert(1)",
    "data:image/png;base64,AAAA",
    "https://user:pass@cdn.example/a.png",
    `https://cdn.example/${"a".repeat(3000)}`,
    "",
    null,
  ]) {
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
  const mockFetch = (createResponse) => {
    console.warn = () => {};
    globalThis.fetch = async (url, init) => createResponse(url, init);
  };
  const html = (body, init = {}) => new Response(body, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" }, ...init });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  });

  test("og:image を安全な絶対URLとして返す", async () => {
    mockFetch(() => html('<html><head><meta property="og:image" content="/images/og.png"></head>'));
    assert.equal(await fetchOgImage(PAGE_URL), "https://site.example/images/og.png");
  });

  test("危険な og:image は null", async () => {
    mockFetch(() => html('<head><meta property="og:image" content="javascript:alert(1)"></head>'));
    assert.equal(await fetchOgImage(PAGE_URL), null);
  });

  test("HTML 以外の応答は null", async () => {
    mockFetch(() => new Response('<meta property="og:image" content="https://cdn.example/a.png">', { headers: { "Content-Type": "application/json" } }));
    assert.equal(await fetchOgImage(PAGE_URL), null);
  });

  test("エラー応答は null", async () => {
    mockFetch(() => html('<meta property="og:image" content="https://cdn.example/a.png">', { status: 500 }));
    assert.equal(await fetchOgImage(PAGE_URL), null);
  });

  test("巨大な応答は上限までしか読み込まない", async () => {
    let bytesSent = 0;
    const chunk = new TextEncoder().encode("a".repeat(64 * 1024));
    const endless = new ReadableStream({
      pull(controller) {
        bytesSent += chunk.byteLength;
        controller.enqueue(chunk);
      },
    });
    mockFetch(() => new Response(endless, { headers: { "Content-Type": "text/html" } }));

    assert.equal(await fetchOgImage(PAGE_URL), null);
    assert.ok(bytesSent <= 1024 * 1024, `読み込み量: ${bytesSent} bytes`);
  });

  test("応答しないサイトはタイムアウトで打ち切る", { timeout: 10_000 }, async () => {
    mockFetch((_url, init) => {
      assert.ok(init.signal instanceof AbortSignal);
      return new Promise((_resolve, reject) => init.signal.addEventListener("abort", () => reject(init.signal.reason)));
    });
    // AbortSignal.timeout のタイマーはイベントループを維持しないため、待機中にテストが終了しないようにする
    const keepAlive = setInterval(() => {}, 1000);
    try {
      const start = performance.now();
      assert.equal(await fetchOgImage(PAGE_URL), null);
      assert.ok(performance.now() - start < 6000);
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
