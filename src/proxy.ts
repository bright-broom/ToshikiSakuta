import { type NextRequest, NextResponse } from "next/server";
import { buildContentSecurityPolicy, createNonce } from "@/config/security";

/**
 * リクエストごとに nonce を発行し、Content-Security-Policy を付与する
 * Next.js はリクエストヘッダーの CSP から nonce を読み取り、自身が出力する script / style に付与する
 */
export function proxy(request: NextRequest) {
  const contentSecurityPolicy = buildContentSecurityPolicy(createNonce());

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  return response;
}

export const config = {
  matcher: [
    {
      // 静的ファイルとメタデータファイルは HTML を返さないため対象外
      source: "/((?!_next/static|_next/image|images/|icon.svg|robots.txt|sitemap.xml|\\.well-known/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
