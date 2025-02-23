// src/pages/_app.js

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Inter } from 'next/font/google';
import '../styles/global.css';

// Font Awesome の自動CSS追加を無効化
config.autoAddCss = false;

// Google Fonts の Inter フォントを設定
const inter = Inter({ subsets: ['latin'] });

/**
 * アプリケーションのルートコンポーネント
 * グローバルな設定とスタイルを管理
 */
export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
