import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/works/project-card";
import { SECTION_IDS } from "@/config/navigation";
import { SECTION_HEADINGS } from "@/content/copy";
import { PROJECTS } from "@/content/projects";

const HEADING_ID = "works-heading";

export function WorksSection() {
  return (
    <section
      id={SECTION_IDS.works}
      aria-labelledby={HEADING_ID}
      className="relative bg-linear-to-b from-brand-900 to-brand-800 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id={HEADING_ID} {...SECTION_HEADINGS.works} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
