# セキュリティポリシー

## 脆弱性の報告

本リポジトリは非公開です。脆弱性を発見したコラボレーターは、Issue や Pull Request では公開せず、リポジトリ管理者（[@bright-broom](https://github.com/bright-broom)）に直接ご連絡ください。

## 実施しているセキュリティ対策

| 対象 | 対策 |
| --- | --- |
| Content Security Policy | `src/proxy.ts` でリクエストごとに nonce を発行する厳格な CSP（`'strict-dynamic'`）。本番はインラインスクリプト・インラインスタイル・イベントハンドラ属性・`javascript:` URL・eval をすべて禁止。画像・通信・フォントは自サイトのみ |
| HTTP ヘッダー | HSTS、X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Permissions-Policy、COOP / CORP、Origin-Agent-Cluster、X-Powered-By 非表示（`src/config/security.ts` で一元管理） |
| 外部通信 | サーバー・ブラウザともに実行時の外部サイトへのアクセスなし（制作実績の画像はリポジトリ内に保持） |
| エラー画面 | 404・エラー画面を Tailwind のクラスだけで実装し、CSP に違反しない |
| 検索エンジン対策 | 全レスポンスに `X-Robots-Tag`（noindex 等）、HTML に robots メタタグ。検索エンジン・AI・SEO・アーカイブのクローラーと、検索サイトからの遷移（Referer / `utm_source`）を proxy で 403。サイトマップ・canonical は出力しない |
| 攻撃対象の削減 | 画像最適化 API（`/_next/image`）を無効化、開発サーバーは localhost のみで待ち受け |
| 依存パッケージ | バージョン固定（`save-exact`）、install スクリプト無効化、`npm audit` とレジストリ署名検証を CI で毎週実行、Dependabot（公開後 7 日間のクールダウン付き、同時更新が必要なパッケージはグループ化） |
| CI | アクションをコミット SHA で固定、`GITHUB_TOKEN` は読み取り権限のみ、認証情報を checkout に残さない |
| テスト | CSP・ヘッダー・クローラー判定のユニットテストと、本番ビルドを検証する E2E テスト（クローラー・検索流入の 403、X-Robots-Tag、CSP 違反 0 件、nonce、注入コードの無効化、404） |

## 既知の制約

- App Router のクライアントランタイムが `innerHTML` を使用するため、CSP の `require-trusted-types-for` は指定していません。
- nonce を使うため全ページをリクエスト時にレンダリングしており、静的配信・CDN キャッシュは使えません。
- レンダリング自体が失敗した場合に Next.js が返す組み込みの 500 ページ（`/_global-error`）は、nonce のないインラインスタイルを含むため、CSP によりスタイルが適用されません（本文は表示されます）。
- クローラーの判定は User-Agent によるため、検索エンジンを名乗らない（偽装した）スクレイパーは遮断できません。検索エンジン自身は正しい User-Agent を名乗るため、インデックス防止には影響しません。
- Gmail や Google ドキュメント内のリンクは `www.google.com` を経由して遷移するため、Google 検索と区別できず 403 になります。URL を直接入力するか、ブックマークからはアクセスできます。
- robots.txt と X-Robots-Tag に従わない検索エンジンは存在しえますが、主要な検索エンジンのクローラーは proxy で 403 になるため、コンテンツは取得されません。
