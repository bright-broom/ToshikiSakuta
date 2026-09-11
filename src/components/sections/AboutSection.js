// =============================
// src/components/sections/AboutSection.js
// 自己紹介・スキル・経歴
// =============================

import SectionHeading from "@/components/ui/SectionHeading";
import { BIO, SKILLS, TIMELINE } from "@/data/profile";

function SkillList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {SKILLS.map(({ category, technologies }) => (
        <div key={category} className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
          <h3 className="mb-4 font-semibold text-white">{category}</h3>
          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-[#bfdbfe] hover:scale-110 transition"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Timeline() {
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-0 w-px bg-white/20" aria-hidden="true" />
      <ol className="space-y-12">
        {TIMELINE.map(({ period, title, description }) => (
          <li key={period} className="relative pl-8">
            <div className="absolute top-0 left-0 w-3 h-3 -translate-x-1/2 bg-white rounded-full" aria-hidden="true" />
            <p className="block text-sm font-semibold text-[#93c5fd] mb-1">{period}</p>
            <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
            <p className="text-[#bfdbfe]">{description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="自己紹介"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8]"
    >
      <div className="relative px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        {/* 背景装飾 */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-full w-80 h-80 blur-3xl opacity-30" />
          </div>
          <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
            <div className="w-64 h-64 bg-white rounded-full blur-3xl opacity-20" />
          </div>
        </div>

        <div className="relative">
          <SectionHeading title="About Me" description="創造性とテクノロジーを融合させ、革新的なソリューションを提供します" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <p className="text-[#eff6ff] leading-relaxed">{BIO}</p>
              <SkillList />
            </div>
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
}
