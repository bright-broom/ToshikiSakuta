/**
 * サイトの識別情報とメタデータ
 * サーバー / クライアントの両方から参照されるため、環境変数や秘密情報は含めない
 */
export const siteConfig = {
  name: "Toshiki Sakuta",
  title: "Toshiki Sakuta | Web Engineer",
  description: "Webエンジニア Toshiki Sakuta のポートフォリオ。制作実績と経歴を紹介しています。",
  locale: "ja",
  openGraphLocale: "ja_JP",
  links: {
    github: "https://github.com/bright-broom",
  },
} as const;
