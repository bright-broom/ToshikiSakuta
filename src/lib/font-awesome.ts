// Font Awesome の共通設定
// スタイルは CSS ファイルとして読み込み、実行時の <style> 挿入を無効化する（CSP で nonce のない style を禁止しているため）。
// サーバー / クライアントそれぞれのバンドルで評価される必要があるため、アイコンを使うモジュールの境界で import する
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
