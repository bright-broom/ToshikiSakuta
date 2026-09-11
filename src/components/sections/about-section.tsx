import { SectionHeading } from "@/components/ui/section-heading";
import { SECTION_IDS } from "@/config/navigation";
import { SECTION_HEADINGS } from "@/content/copy";
import { BIO, SKILLS, TIMELINE } from "@/content/profile";

const HEADING_ID = "about-heading";

function SkillList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {SKILLS.map(({ category, technologies }) => (
        <div key={category} className="rounded-lg bg-white/5 p-6 backdrop-blur-xs">
          <h3 className="mb-4 font-semibold text-white">{category}</h3>
          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-200 transition hover:scale-110"
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
            <div className="absolute top-0 left-0 size-3 -translate-x-1/2 rounded-full bg-white" aria-hidden="true" />
            <p className="mb-1 block text-sm font-semibold text-brand-300">{period}</p>
            <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
            <p className="text-brand-200">{description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby={HEADING_ID}
      className="relative overflow-hidden bg-linear-to-b from-brand-500 to-brand-700 py-16 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <div className="size-80 rounded-full bg-white opacity-30 blur-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
            <div className="size-64 rounded-full bg-white opacity-20 blur-3xl" />
          </div>
        </div>

        <div className="relative">
          <SectionHeading id={HEADING_ID} {...SECTION_HEADINGS.about} />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <p className="leading-relaxed text-brand-50">{BIO}</p>
              <SkillList />
            </div>
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
}
