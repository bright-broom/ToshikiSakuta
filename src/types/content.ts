export type NavigationSection<Id extends string = string> = {
  /** セクション要素の id（ページ内リンクの遷移先） */
  id: Id;
  /** ナビゲーションの表示名 */
  label: string;
};

export type SocialIcon = "github" | "email";

export type SocialLink = {
  /** リンク名（スクリーンリーダー向けラベル） */
  label: string;
  /** https: または mailto: の URL */
  href: `https://${string}` | `mailto:${string}`;
  icon: SocialIcon;
};

export type SkillCategory = {
  category: string;
  technologies: readonly string[];
};

export type TimelineEntry = {
  /** 期間（例: "2020-2023"） */
  period: string;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  /** サイト URL（OG 画像の取得元。https のみ） */
  url: `https://${string}`;
  tags: readonly string[];
};

export type ProjectWithImage = Project & {
  /** 表示する画像の URL（OG 画像、または代替画像） */
  imageSrc: string;
};
