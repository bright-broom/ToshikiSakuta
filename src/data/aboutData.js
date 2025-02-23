// =============================
// src/data/aboutData.js
// プロフィール情報を管理するデータモジュール
// =============================

/**
 * スキルカテゴリーの型定義
 * @typedef {Object} SkillCategory
 * @property {string} category - スキルの分類
 * @property {string[]} technologies - 各カテゴリ内のスキル一覧
 */

/**
 * 経歴のタイムライン型定義
 * @typedef {Object} TimelineEntry
 * @property {string} period - 期間（例: "2020-2023"）
 * @property {string} title - 経歴のタイトル
 * @property {string} company - 所属企業またはフリーランス
 * @property {string} description - 経歴の説明
 * @property {string[]} responsibilities - 主な担当業務
 * @property {string[]} technologies - 使用技術
 */

// =============================
// スキルセットデータ
// =============================

/**
 * スキルセット一覧
 * @type {SkillCategory[]}
 */
export const skills = [
  {
    category: "フロントエンド",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "バックエンド",
    technologies: ["Node.js", "Python", "Go", "AWS", "Azure", "Firebase"],
  },
  {
    category: "データベース",
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
  },
  {
    category: "クラウド・インフラ",
    technologies: ["AWS Lambda", "Docker", "Kubernetes", "Terraform", "Cloudflare"],
  },
  {
    category: "デザイン・UX",
    technologies: ["Figma", "UI/UX", "工業デザイン", "Adobe XD"],
  },
  {
    category: "その他",
    technologies: ["Git", "CI/CD", "セキュリティ", "回路設計", "WebRTC"],
  },
];

// =============================
// 経歴タイムラインデータ
// =============================

/**
 * 経歴のタイムライン
 * @type {TimelineEntry[]}
 */
export const timeline = [
  {
    period: "現在",
    title: "フリーランスエンジニア",
    company: "個人事業",
    description: "Webアプリケーション開発、クラウドインフラ設計・構築、技術コンサルティング。",
    responsibilities: [
      "React/Next.js を活用したモダンなWebアプリ開発",
      "AWS・Azureを活用したクラウドアーキテクチャ設計・運用",
      "CI/CDパイプラインの構築による開発の効率化",
      "技術記事の執筆・エンジニア教育",
      "セキュリティ監査とリスクマネジメント",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
  },
  {
    period: "2020-2023",
    title: "クラウドエンジニア",
    company: "大手IT企業",
    description: "Azure環境を基盤とした企業向けクラウドインフラの設計・構築を担当。",
    responsibilities: [
      "Azureを活用したエンタープライズ向けクラウドアーキテクチャ設計",
      "セキュリティ対策（ゼロトラストネットワークの導入）",
      "サーバーレスアーキテクチャの設計・運用",
      "Terraformを活用したIaCの導入・自動化",
      "クラウドネイティブなシステムの開発・最適化",
    ],
    technologies: ["Azure", "AWS", "Terraform", "Docker", "Kubernetes", "Python", "Go"],
  },
  {
    period: "2018-2020",
    title: "自動車電装エンジニア",
    company: "大手自動車メーカー",
    description: "自動車の電子回路設計および制御システムの開発。",
    responsibilities: [
      "ECU（電子制御ユニット）の設計・開発",
      "回路設計および基板実装（マイクロコントローラ/FPGA）",
      "CAN通信プロトコルを用いた車載ネットワーク開発",
      "シミュレーション環境の構築（MATLAB/Simulink）",
      "車載システムのテスト・デバッグ",
    ],
    technologies: ["C", "C++", "MATLAB", "Simulink", "FPGA", "CAN通信", "回路設計"],
  },
  {
    period: "2015-2018",
    title: "大学・研究開発",
    company: "○○大学工学部",
    description: "大学にて制御システム工学を研究し、産学連携プロジェクトに参画。",
    responsibilities: [
      "ロボティクス制御アルゴリズムの研究",
      "産業用ロボットのプログラミング",
      "AIを活用した画像処理の実験・分析",
      "組込みシステムの開発・評価",
      "論文執筆および学会発表",
    ],
    technologies: ["Python", "ROS", "OpenCV", "MATLAB", "C++"],
  },
];
