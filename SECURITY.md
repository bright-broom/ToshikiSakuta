# セキュリティポリシー

## 脆弱性の報告

脆弱性を発見した場合は、Issue や Pull Request では公開せず、リポジトリ管理者（[@bright-broom](https://github.com/bright-broom)）に非公開でご連絡ください。

受領後、内容を確認のうえ対応状況をご連絡します。

## 実施しているセキュリティ対策

| 対象 | 対策 |
| --- | --- |
| Content Security Policy | `src/proxy.ts` でリクエストごとに nonce を発行する厳格な CSP（`'strict-dynamic'`）。本番はインラインスクリプト・インラインスタイル・イベントハンドラ属性・`javascript:` URL・eval をすべて禁止 |
| HTTP ヘッダー | HSTS、X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Permissions-Policy、COOP / CORP、Origin-Agent-Cluster、X-Powered-By 非表示（`src/config/security.ts` で一元管理） |
| 外部通信 | 外部サイトへのアクセスはサーバー側のみ。閲覧者のブラウザは外部サイトと通信しない（`connect-src 'self'`） |
| OG 画像取得 | https 限定、タイムアウト、読み込みサイズ上限、Content-Type 検証、ReDoS を起こさない解析、危険な URL スキームの拒否。画像本体はサーバーから取得しない（SSRF 対策） |
| 攻撃対象の削減 | 画像最適化 API（`/_next/image`）を無効化、開発サーバーは localhost のみで待ち受け |
| 依存パッケージ | バージョン固定（`save-exact`）、install スクリプト無効化、`npm audit` とレジストリ署名検証を CI で毎週実行、Dependabot（公開後 7 日間のクールダウン付き） |
| CI | アクションをコミット SHA で固定、`GITHUB_TOKEN` は読み取り権限のみ、認証情報を checkout に残さない |

## 既知の制約

- App Router のクライアントランタイムが `innerHTML` を使用するため、CSP の `require-trusted-types-for` は指定していません。
- 制作実績の OG 画像を外部サイトから表示するため、`img-src` に `https:` を許可しています。
