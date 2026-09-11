// =============================
// src/pages/_app.js
// 全ページ共通のフォント・スタイル
// =============================

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter } from "next/font/google";
import "@/styles/global.css";

// Font Awesome のスタイルは上で読み込んだCSSを使い、実行時の <style> 挿入を無効化する（CSP対策）
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}
