import type { NavigationSection, SocialLink } from "@/types/content";
import { siteConfig } from "./site";

export const SECTION_IDS = {
  home: "home",
  works: "works",
  about: "about",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** ページ内リンクの href を生成する */
export const sectionHref = (id: SectionId) => `#${id}` as const;

export const SECTIONS = [
  { id: SECTION_IDS.home, label: "Home" },
  { id: SECTION_IDS.works, label: "Works" },
  { id: SECTION_IDS.about, label: "About" },
] as const satisfies readonly NavigationSection<SectionId>[];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.links.github, icon: "github" },
] as const satisfies readonly SocialLink[];
