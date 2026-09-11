export type NavigationSection<Id extends string = string> = {
  /** セクション要素の id（ページ内リンクの遷移先） */
  id: Id;
  /** ナビゲーションの表示名 */
  label: string;
};

export type SocialIcon = "github";

export type SocialLink = {
  /** リンク名（スクリーンリーダー向けラベル） */
  label: string;
  /** 外部サイトの URL（新しいタブで開く） */
  href: `https://${string}`;
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

export type ProjectImage = {
  /** public/ 配下の画像パス */
  src: `/images/${string}`;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  url: `https://${string}`;
  image: ProjectImage;
  tags: readonly string[];
};
