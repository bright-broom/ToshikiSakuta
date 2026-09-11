import { type NextRequest, NextResponse } from "next/server";
import { BLOCKED_RESPONSE, X_ROBOTS_TAG } from "@/config/crawler-policy";
import { STATIC_SECURITY_HEADERS, buildContentSecurityPolicy, createNonce } from "@/config/security";
import { getBlockReason } from "@/lib/request-guard";

/**
 * 1. 検索エンジン・AI などのクローラーと、検索サイトからの流入を 403 で拒否する
 * 2. それ以外のリクエストにはリクエストごとの nonce を発行し、Content-Security-Policy を付与する
 *    （Next.js はリクエストヘッダーの CSP から nonce を読み取り、自身が出力する script / style に付与する）
 */
export function proxy(request: NextRequest) {
  const blockReason = getBlockReason({
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
    url: request.nextUrl,
  });

  if (blockReason) {
    // next.config.ts の headers() は proxy が直接返すレスポンスには適用されないため、ここで付与する
    const response = new NextResponse(BLOCKED_RESPONSE.body, { status: BLOCKED_RESPONSE.status });
    for (const { key, value } of STATIC_SECURITY_HEADERS) response.headers.set(key, value);
    response.headers.set("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
    response.headers.set("Content-Type", "text/plain; charset=utf-8");
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Vary", "User-Agent, Referer");
    response.headers.set("X-Robots-Tag", X_ROBOTS_TAG);
    return response;
  }

  // next/link のプリフェッチは HTML を返さないため、CSP の発行は不要
  const isPrefetch = request.headers.has("next-router-prefetch") || request.headers.get("purpose") === "prefetch";
  if (isPrefetch) return NextResponse.next();

  const contentSecurityPolicy = buildContentSecurityPolicy({ nonce: createNonce() });
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  return response;
}

export const config = {
  matcher: [
    // 画像などの静的ファイルにもクローラー対策を適用するため、ビルド済みチャンクと robots.txt 以外はすべて対象にする。
    // プリフェッチ用のヘッダーでクローラー判定を回避されないよう、missing 条件は使わない
    "/((?!_next/static/|robots\\.txt$).*)",
  ],
};
