# セキュリティポリシー

## 脆弱性の報告

脆弱性を発見した場合は、Issue や Pull Request では公開せず、以下へご連絡ください。

- メール: toshikiii7@gmail.com

受領後、内容を確認のうえ対応状況をご連絡します。

## 実施しているセキュリティ対策

| 対象 | 対策 |
| --- | --- |
| HTTP ヘッダー | 厳格な CSP（インラインスクリプト・インラインスタイル・eval 禁止、Trusted Types 必須）、HSTS、X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Permissions-Policy、COOP / CORP、X-Powered-By 非表示 |
| 外部通信 | 外部サイトへのアクセスはビルド時（サーバー側）のみ。閲覧者のブラウザは外部サイトと通信しない（`connect-src 'self'`） |
| OG 画像取得 | https 限定、タイムアウト、読み込みサイズ上限、Content-Type 検証、ReDoS を起こさない解析、危険な URL スキームの拒否。画像本体はサーバーから取得しない（SSRF 対策） |
| 攻撃対象の削減 | 画像最適化 API（`/_next/image`）を無効化、開発サーバーは localhost のみで待ち受け |
| 依存パッケージ | lockfile 固定、install スクリプト無効化、`npm audit` とレジストリ署名検証を CI で毎週実行、Dependabot（公開後 7 日間のクールダウン付き） |
| CI | アクションをコミット SHA で固定、`GITHUB_TOKEN` は読み取り権限のみ、認証情報を checkout に残さない |
