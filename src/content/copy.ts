import { SECTION_IDS, SECTION_LABELS, type SectionId } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** ヒーローセクションの文言と導線 */
export const HERO_COPY = {
  heading: siteConfig.name,
  subheading: "Web Engineer",
  actions: [
    { target: SECTION_IDS.works, label: SECTION_LABELS.works, variant: "primary" },
    { target: SECTION_IDS.about, label: SECTION_LABELS.about, variant: "secondary" },
  ],
} as const satisfies {
  heading: string;
  subheading: string;
  actions: readonly { target: SectionId; label: string; variant: "primary" | "secondary" }[];
};

/** 各セクションの見出し */
export const SECTION_HEADINGS = {
  works: { title: "Works", description: "最新のテクノロジーを活用した制作実績" },
  about: { title: "About Me", description: "創造性とテクノロジーを融合させ、革新的なソリューションを提供します" },
} as const;

/** フッターの文言 */
export const FOOTER_COPY = {
  tagline: "創造性とテクノロジーで、より良い未来を創造します。",
  rightsReserved: "All rights reserved.",
} as const;

/** エラーページの文言 */
export const ERROR_COPY = {
  notFound: {
    title: "ページが見つかりません",
    description: "お探しのページは移動または削除された可能性があります。",
  },
  unexpected: {
    title: "エラーが発生しました",
    description: "時間をおいて再度お試しください。",
    retry: "再読み込み",
  },
  backToHome: "トップページへ戻る",
} as const;

/** 画面上の補助テキスト・アクセシビリティ用ラベル */
export const UI_LABELS = {
  primaryNavigation: "サイトナビゲーション",
  mobileNavigation: "モバイルナビゲーション",
  openMenu: "メニューを開く",
  closeMenu: "メニューを閉じる",
  backToTop: "ページトップへ戻る",
  sitemap: "サイトマップ",
  social: "ソーシャル",
  techStack: "使用技術",
  opensInNewTab: (label: string) => `${label}（新しいタブで開く）`,
  screenshotAlt: (title: string) => `${title}のスクリーンショット`,
} as const;
