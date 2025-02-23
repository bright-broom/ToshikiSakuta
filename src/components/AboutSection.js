// =============================
// src/components/AboutSection.js
// 自己紹介・スキル・経歴の表示
// =============================

import React, { memo } from "react";
import { skills, timeline } from "../data/aboutData";

/**
 * 共通スタイル定義
 */
const styles = {
  section: "relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8]",
  container: "relative px-6 mx-auto max-w-7xl sm:px-8 lg:px-12",
  heading: "mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl",
  subtext: "text-lg sm:text-xl text-[#bfdbfe] max-w-3xl mx-auto",
  skillBadge: "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-[#bfdbfe] hover:scale-110 transition",
  skillCategory: "p-6 rounded-lg bg-white/5 backdrop-blur-sm",
  timelineItem: "relative pl-8",
  timelineIndicator: "absolute top-0 left-0 w-3 h-3 -translate-x-1/2 bg-white rounded-full",
  timelineLine: "absolute top-0 bottom-0 left-0 w-px bg-white/20",
};

/**
 * セクションヘッダー
 */
const SectionHeader = memo(() => (
  <div className="mb-16 text-center">
    <h2 className={styles.heading}>About Me</h2>
    <p className={styles.subtext}>創造性とテクノロジーを融合させ、革新的なソリューションを提供します</p>
  </div>
));

SectionHeader.displayName = "SectionHeader";

/**
 * スキルバッジ
 */
const SkillBadge = memo(({ name }) => <span className={styles.skillBadge}>{name}</span>);

SkillBadge.displayName = "SkillBadge";

/**
 * スキルカテゴリー
 */
const SkillCategory = memo(({ category, technologies }) => (
  <div className={styles.skillCategory}>
    <h3 className="mb-4 font-semibold text-white">{category}</h3>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <SkillBadge key={tech} name={tech} />
      ))}
    </div>
  </div>
));

SkillCategory.displayName = "SkillCategory";

/**
 * スキルセット
 */
const SkillSet = memo(() => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    {skills.map((skill) => (
      <SkillCategory key={skill.category} {...skill} />
    ))}
  </div>
));

SkillSet.displayName = "SkillSet";

/**
 * タイムラインアイテム
 */
const TimelineItem = memo(({ period, title, description }) => (
  <div className={styles.timelineItem}>
    <div className={styles.timelineIndicator} aria-hidden="true" />
    <time className="block text-sm font-semibold text-[#93c5fd] mb-1">{period}</time>
    <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
    <p className="text-[#bfdbfe]">{description}</p>
  </div>
));

TimelineItem.displayName = "TimelineItem";

/**
 * タイムライン
 */
const Timeline = memo(() => (
  <div className="relative">
    <div className={styles.timelineLine} />
    <div className="space-y-12">
      {timeline.map((entry) => (
        <TimelineItem key={entry.period} {...entry} />
      ))}
    </div>
  </div>
));

Timeline.displayName = "Timeline";

/**
 * 背景装飾
 */
const BackgroundDecoration = memo(() => (
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
      <div className="bg-white rounded-full w-80 h-80 blur-3xl opacity-30" />
    </div>
    <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
      <div className="w-64 h-64 bg-white rounded-full blur-3xl opacity-20" />
    </div>
  </div>
));

BackgroundDecoration.displayName = "BackgroundDecoration";

/**
 * About セクション
 */
const AboutSection = () => (
  <section id="about" aria-label="自己紹介" className={styles.section}>
    <div className={styles.container}>
      <BackgroundDecoration />
      <div className="relative">
        <SectionHeader />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 左カラム: 自己紹介とスキル */}
          <div className="space-y-8">
            <div className="prose prose-lg prose-invert">
              <p className="text-[#eff6ff] leading-relaxed">
                兵庫県出身のエンジニア。中学時代に趣味で作ったWebサイトが友人にウケたのをきっかけにWebに興味を持つ。
                高校で情報を学び、大学では工業デザインを専攻。卒業後は、自動車の電子回路設計に携わる。
                クラウド技術の可能性に惹かれ、IT業界へ転身。Azure環境構築、サイバーセキュリティ対策の経験を有する。
              </p>
            </div>
            <SkillSet />
          </div>
          {/* 右カラム: タイムライン */}
          <Timeline />
        </div>
      </div>
    </div>
  </section>
);

export default memo(AboutSection);
