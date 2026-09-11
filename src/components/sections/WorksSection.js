// =============================
// src/components/sections/WorksSection.js
// 制作実績一覧
// =============================

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { DEFAULT_PROJECT_IMAGE } from "@/data/projects";

/**
 * プロジェクト画像
 * 外部OG画像は画像最適化APIを通さず直接表示し、読み込めない場合は代替画像に切り替える
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.title
 */
function ProjectImage({ src, title }) {
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(src);
  const showFallback = useCallback(() => setImageSrc(DEFAULT_PROJECT_IMAGE), []);

  // ハイドレーション前に読み込みに失敗した画像は onError が発火しないため、マウント時にも確認する
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) showFallback();
  }, [showFallback]);

  return (
    <div className="relative h-48 overflow-hidden sm:h-56">
      <img
        ref={imageRef}
        src={imageSrc}
        alt={`${title}のスクリーンショット`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={showFallback}
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
    </div>
  );
}

/**
 * @param {Object} props
 * @param {import("@/data/projects").Project & { imageSrc: string }} props.project
 */
function ProjectCard({ project }) {
  const titleId = `project-${project.id}-title`;

  return (
    <article className="relative overflow-hidden transition-transform duration-300 group bg-white/5 backdrop-blur-sm rounded-xl hover:-translate-y-1">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-xl"
        aria-labelledby={titleId}
      >
        <ProjectImage src={project.imageSrc} title={project.title} />

        <div className="relative p-6">
          <h3 id={titleId} className="mb-2 text-xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="text-[#bfdbfe] mb-4">{project.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label="使用技術">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-[#bfdbfe]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="absolute inset-0 transition-colors duration-300 border-2 border-transparent pointer-events-none group-hover:border-white/20 rounded-xl"
          aria-hidden="true"
        />
      </a>
    </article>
  );
}

/**
 * @param {Object} props
 * @param {Array<import("@/data/projects").Project & { imageSrc: string }>} props.projects
 */
export default function WorksSection({ projects }) {
  return (
    <section
      id="works"
      aria-label="作品紹介"
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af]"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Works" description="最新のテクノロジーを活用した制作実績" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
