import type { NavigationSection, SocialLink } from "@/types/content";
import { siteConfig } from "./site";

export const SECTION_IDS = {
  home: "home",
  works: "works",
  about: "about",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** セクションのラベル（ナビゲーション・ボタンで共通） */
export const SECTION_LABELS = {
  home: "Home",
  works: "Works",
  about: "About",
} as const satisfies Record<SectionId, string>;

/** ページ内リンクの href を生成する */
export const sectionHref = (id: SectionId) => `#${id}` as const;

/** ナビゲーションの表示順 */
export const SECTIONS = [
  { id: SECTION_IDS.home, label: SECTION_LABELS.home },
  { id: SECTION_IDS.works, label: SECTION_LABELS.works },
  { id: SECTION_IDS.about, label: SECTION_LABELS.about },
] as const satisfies readonly [NavigationSection<SectionId>, ...NavigationSection<SectionId>[]];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.links.github, icon: "github" },
] as const satisfies readonly SocialLink[];
