// src/components/WorksSection.js

import React, { memo, useState, useEffect } from "react";
import Image from "next/image";
import { DEFAULT_IMAGE } from "../data/projectsData";

/**
 * セクションヘッダーコンポーネント
 */
const SectionHeader = memo(() => (
  <div className="mb-16 text-center">
    <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
      Works
    </h2>
    <p className="text-lg sm:text-xl text-[#bfdbfe]">
      最新のテクノロジーを活用した制作実績
    </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

/**
 * プロジェクト画像コンポーネント
 * 外部OG画像はホストが任意のため最適化せず表示し、読み込み失敗時はデフォルト画像に切り替える
 */
const ProjectImage = memo(({ src, title }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className="relative h-48 overflow-hidden sm:h-56">
      <Image
        src={imgSrc}
        alt={`${title}のスクリーンショット`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 transform group-hover:scale-105"
        loading="lazy"
        unoptimized={/^https:\/\//.test(imgSrc)}
        referrerPolicy="no-referrer"
        onError={() => setImgSrc(DEFAULT_IMAGE)}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
});

ProjectImage.displayName = 'ProjectImage';

/**
 * プロジェクトタグコンポーネント
 */
const ProjectTags = memo(({ tags }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-[#bfdbfe]"
      >
        {tag}
      </span>
    ))}
  </div>
));

ProjectTags.displayName = 'ProjectTags';

/**
 * プロジェクトカードコンポーネント
 */
const ProjectCard = memo(({ project }) => (
  <article className="relative overflow-hidden transition-transform duration-300 group bg-white/5 backdrop-blur-sm rounded-xl hover:-translate-y-1">
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-xl"
      aria-labelledby={`project-${project.id}-title`}
    >
      <ProjectImage src={project.imgSrc} title={project.title} />

      <div className="relative p-6">
        <h3
          id={`project-${project.id}-title`}
          className="mb-2 text-xl font-semibold text-white"
        >
          {project.title}
        </h3>
        <p className="text-[#bfdbfe] mb-4">
          {project.description}
        </p>
        <ProjectTags tags={project.tags} />
      </div>

      <div
        className="absolute inset-0 transition-colors duration-300 border-2 border-transparent pointer-events-none group-hover:border-white/20 rounded-xl"
        aria-hidden="true"
      />
    </a>
  </article>
));

ProjectCard.displayName = 'ProjectCard';

/**
 * プロジェクトグリッドコンポーネント
 */
const ProjectGrid = memo(({ projects }) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
});

ProjectGrid.displayName = 'ProjectGrid';

/**
 * Worksセクションコンポーネント
 * プロジェクト一覧を表示する（データはサーバー側の getStaticProps で取得）
 * @param {Object} props
 * @param {import("../data/projectsData").Project[]} props.projects
 */
const WorksSection = ({ projects = [] }) => {
  return (
    <section
      id="works"
      aria-label="作品紹介"
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af]"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader />
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
};

export default memo(WorksSection);
