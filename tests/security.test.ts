import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { STATIC_SECURITY_HEADERS, buildContentSecurityPolicy, createNonce } from "../src/config/security.ts";

/** "a b; c d" 形式の CSP をディレクティブごとの配列に分解する */
const parse = (policy: string) =>
  new Map(
    policy.split("; ").map((directive) => {
      const [name = "", ...values] = directive.split(" ");
      return [name, values] as const;
    }),
  );

describe("createNonce", () => {
  test("128 bit のランダム値を base64 で返す", () => {
    const nonce = createNonce();
    assert.equal(Buffer.from(nonce, "base64").byteLength, 16);
    assert.notEqual(nonce, createNonce());
  });
});

describe("buildContentSecurityPolicy（本番）", () => {
  const policy = parse(buildContentSecurityPolicy({ nonce: "abc", isDevelopment: false }));

  test("スクリプトは nonce と strict-dynamic のみ許可し、eval とインラインを禁止する", () => {
    assert.deepEqual(policy.get("script-src"), ["'self'", "'nonce-abc'", "'strict-dynamic'"]);
    assert.deepEqual(policy.get("script-src-attr"), ["'none'"]);
  });

  test("インラインスタイルは nonce 付きのみ許可する", () => {
    assert.deepEqual(policy.get("style-src"), ["'self'", "'nonce-abc'"]);
  });

  test("画像・通信は自サイトのみ、埋め込みとフォーム送信は禁止する", () => {
    assert.deepEqual(policy.get("default-src"), ["'none'"]);
    assert.deepEqual(policy.get("img-src"), ["'self'"]);
    assert.deepEqual(policy.get("connect-src"), ["'self'"]);
    assert.deepEqual(policy.get("frame-ancestors"), ["'none'"]);
    assert.deepEqual(policy.get("form-action"), ["'none'"]);
    assert.deepEqual(policy.get("base-uri"), ["'none'"]);
    assert.deepEqual(policy.get("object-src"), ["'none'"]);
  });

  test("許可リストに unsafe-* を含まない", () => {
    for (const [name, values] of policy) {
      assert.ok(!values.some((value) => value.startsWith("'unsafe-")), name);
    }
  });

  test("http のサブリソースを https に昇格する", () => {
    assert.ok(policy.has("upgrade-insecure-requests"));
  });
});

describe("buildContentSecurityPolicy（開発）", () => {
  const policy = parse(buildContentSecurityPolicy({ nonce: "abc", isDevelopment: true }));

  test("HMR とデバッグに必要な範囲だけ緩める", () => {
    assert.ok(policy.get("script-src")?.includes("'unsafe-eval'"));
    assert.deepEqual(policy.get("style-src"), ["'self'", "'unsafe-inline'"]);
    assert.deepEqual(policy.get("connect-src"), ["'self'", "ws:"]);
    assert.ok(!policy.has("upgrade-insecure-requests"));
  });
});

describe("STATIC_SECURITY_HEADERS", () => {
  const headers = new Map(STATIC_SECURITY_HEADERS.map(({ key, value }) => [key, value]));

  test("主要なセキュリティヘッダーを含む", () => {
    assert.match(headers.get("Strict-Transport-Security") ?? "", /max-age=\d{8,}/);
    assert.equal(headers.get("X-Content-Type-Options"), "nosniff");
    assert.equal(headers.get("X-Frame-Options"), "DENY");
    assert.equal(headers.get("Cross-Origin-Opener-Policy"), "same-origin");
    assert.match(headers.get("Permissions-Policy") ?? "", /camera=\(\)/);
  });
});
