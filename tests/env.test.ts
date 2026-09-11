import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { getSiteUrl } from "../src/config/env.ts";

describe("getSiteUrl", () => {
  test("NEXT_PUBLIC_SITE_URL を最優先する", () => {
    const url = getSiteUrl({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "https://example.com",
      VERCEL_PROJECT_PRODUCTION_URL: "project.vercel.app",
    });
    assert.equal(url.href, "https://example.com/");
  });

  test("未設定なら Vercel の本番ドメインを https で使う", () => {
    assert.equal(getSiteUrl({ NODE_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "project.vercel.app" }).href, "https://project.vercel.app/");
  });

  test("空文字は未設定として扱う", () => {
    assert.equal(
      getSiteUrl({ NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "  ", VERCEL_PROJECT_PRODUCTION_URL: "project.vercel.app" }).href,
      "https://project.vercel.app/",
    );
  });

  test("開発時に未設定なら localhost を使う", () => {
    assert.equal(getSiteUrl({ NODE_ENV: "development" }).href, "http://localhost:3000/");
  });

  test("本番で URL を決められない場合はエラーにする", () => {
    assert.throws(() => getSiteUrl({ NODE_ENV: "production" }), /NEXT_PUBLIC_SITE_URL/);
  });

  test("不正な URL や localhost 以外の http はエラーにする", () => {
    assert.throws(() => getSiteUrl({ NEXT_PUBLIC_SITE_URL: "not a url" }), /形式/);
    assert.throws(() => getSiteUrl({ NEXT_PUBLIC_SITE_URL: "http://example.com" }), /https/);
    assert.equal(getSiteUrl({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }).hostname, "localhost");
  });
});
