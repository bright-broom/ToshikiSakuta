import { SECTION_IDS, type SectionId } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** ヒーローセクションの文言と導線 */
export const HERO_COPY = {
  heading: siteConfig.displayName,
  subheading: siteConfig.role,
  actions: [
    { target: SECTION_IDS.works, label: "Works", variant: "primary" },
    { target: SECTION_IDS.about, label: "About", variant: "secondary" },
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

/** 画面上の補助テキスト・アクセシビリティ用ラベル */
export const UI_LABELS = {
  primaryNavigation: "サイトナビゲーション",
  mobileNavigation: "モバイルナビゲーション",
  openMenu: "メニューを開く",
  closeMenu: "メニューを閉じる",
  backToTop: "ページトップへ戻る",
  sitemap: "サイトマップ",
  contactAndSocial: "Contact & Social",
  techStack: "使用技術",
  opensInNewTab: (label: string) => `${label}（新しいタブで開く）`,
  screenshotAlt: (title: string) => `${title}のスクリーンショット`,
  copyright: (year: number) => `© ${year} ${siteConfig.displayName}. All rights reserved.`,
} as const;
