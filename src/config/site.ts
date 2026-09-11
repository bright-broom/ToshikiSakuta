/**
 * サイト全体で共有する識別情報
 * サーバー / クライアントの両方から参照されるため、環境変数や秘密情報は含めない
 */
export const siteConfig = {
  name: "Toshiki Sakuta",
  displayName: "TOSHIKI SAKUTA",
  role: "WEB ENGINEER",
  title: "Toshiki Sakuta | Web Engineer",
  description: "Webエンジニア Toshiki Sakuta のポートフォリオ。制作実績と経歴を紹介しています。",
  tagline: "創造性とテクノロジーで、より良い未来を創造します。",
  locale: "ja",
  openGraphLocale: "ja_JP",
  contactEmail: "toshikiii7@gmail.com",
  links: {
    github: "https://github.com/bright-broom",
  },
} as const;
