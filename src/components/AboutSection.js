import React from "react";

const skills = [
  { category: "フロントエンド", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "バックエンド", items: ["Node.js", "Python", "AWS", "Azure"] },
  { category: "デザイン", items: ["Figma", "UI/UX", "工業デザイン"] },
  { category: "その他", items: ["Git", "CI/CD", "セキュリティ", "回路設計"] },
];

const timeline = [
  {
    period: "現在",
    title: "フリーランスエンジニア",
    description: "Webアプリケーション開発、クラウドインフラ構築",
  },
  {
    period: "2020-2023",
    title: "クラウドエンジニア",
    description: "Azure環境構築、セキュリティ対策",
  },
  {
    period: "2018-2020",
    title: "自動車電装エンジニア",
    description: "電子回路設計、制御システム開発",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      aria-label="自己紹介"
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8]"
    >
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-full w-96 h-96 blur-3xl" />
          </div>
        </div>

        <div className="relative">
          {/* ヘッダー */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-[#bfdbfe] max-w-3xl mx-auto">
              創造性とテクノロジーを融合させ、革新的なソリューションを提供します
            </p>
          </div>

          {/* メインコンテンツ */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 左カラム: 自己紹介 */}
            <div className="space-y-8">
              <div className="prose prose-lg prose-invert">
                <p className="text-[#eff6ff] leading-relaxed">
                  兵庫県出身のエンジニア。中学時代に趣味で作ったWebサイトが友人にウケたのをきっかけにWebに興味を持つ。
                  高校で情報を学び、大学では工業デザインを専攻。卒業後は、自動車の電子回路設計に携わる。
                  クラウド技術の可能性に惹かれ、IT業界へ転身。Azure環境構築、サイバーセキュリティ対策の経験を有する。
                </p>
              </div>

              {/* スキルセット */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {skills.map(({ category, items }) => (
                  <div
                    key={category}
                    className="p-6 rounded-lg bg-white/5 backdrop-blur-sm"
                  >
                    <h3 className="mb-4 font-semibold text-white">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm
                            font-medium bg-white/10 text-[#bfdbfe]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右カラム: タイムライン */}
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-white/20" />
              <div className="space-y-12">
                {timeline.map(({ period, title, description }, index) => (
                  <div
                    key={period}
                    className="relative pl-8"
                  >
                    <div
                      className="absolute top-0 left-0 w-3 h-3 -translate-x-1/2 bg-white rounded-full"
                      aria-hidden="true"
                    />
                    <time className="block text-sm font-semibold text-[#93c5fd] mb-1">
                      {period}
                    </time>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {title}
                    </h3>
                    <p className="text-[#bfdbfe]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
