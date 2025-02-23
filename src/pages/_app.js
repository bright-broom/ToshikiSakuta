// =============================
// src/pages/_app.js
// グローバルな設定 & スタイル管理
// =============================

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter } from "next/font/google";
import "../styles/global.css";

// Font Awesome の自動CSS追加を無効化（手動でスタイルを適用）
config.autoAddCss = false;

// Google Fonts の Inter フォントを設定
const inter = Inter({ subsets: ["latin"] });

/**
 * カスタム App コンポーネント
 * Next.js のページコンポーネントをラップし、グローバルな設定を適用
 *
 * @param {Object} props
 * @param {React.ComponentType} props.Component - レンダリングされるページコンポーネント
 * @param {Object} props.pageProps - 各ページに渡されるプロパティ
 * @returns {JSX.Element} グローバルレイアウトを適用したアプリ
 */
export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
