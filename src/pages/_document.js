// =============================
// src/pages/_document.js
// HTML ドキュメントの骨格
// =============================

import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
