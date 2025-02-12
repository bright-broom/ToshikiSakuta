import React from "react";
import Image from "next/image";

const projects = [
  {
    id: "east-projects",
    title: "East Projects",
    description: "東京を拠点とするクリエイティブスタジオのコーポレートサイト",
    details: "Next.js、Tailwind CSS、Framer Motionを使用したモダンなウェブサイト制作",
    imgSrc: "/images/Higashi Akimitsu.jpeg",
    url: "https://eastprojects.jp/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "albadx",
    title: "ALBADX",
    description: "デジタルマーケティング企業のウェブサイト",
    details: "レスポンシブデザイン、アニメーション効果、SEO最適化を実装",
    imgSrc: "/images/albadx.jpg",
    url: "https://albadx.vercel.app/",
    tags: ["React", "Tailwind CSS", "SEO"],
  },
  {
    id: "dentaku",
    title: "DENTAKU",
    description: "モダンなUI/UXを備えた計算機アプリケーション",
    details: "アクセシビリティに配慮したインタラクティブな電卓アプリ",
    imgSrc: "/images/dentaku.jpeg",
    url: "https://dentaku-kappa.vercel.app/",
    tags: ["React", "TypeScript", "Accessibility"],
  },
];

const WorksSection = () => {
  return (
    <section
      id="works"
      aria-label="作品紹介"
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Works</h2>
          <p className="text-lg sm:text-xl text-[#bfdbfe]">
            最新のテクノロジーを活用した制作実績
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="relative overflow-hidden transition-transform duration-300 group bg-white/5 backdrop-blur-sm rounded-xl hover:-translate-y-1"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-xl"
                aria-labelledby={`project-${project.id}-title`}
              >
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <Image
                    src={project.imgSrc}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

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
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs
                          font-medium bg-white/10 text-[#bfdbfe]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute inset-0 transition-colors duration-300 border-2 border-transparent pointer-events-none group-hover:border-white/20 rounded-xl"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
