import { ProjectImage } from "@/components/works/project-image";
import { UI_LABELS } from "@/content/copy";
import type { ProjectWithImage } from "@/types/content";

type ProjectCardProps = {
  project: ProjectWithImage;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`;

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-xs transition-transform duration-300 hover:-translate-y-1">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600 focus:outline-hidden"
        aria-labelledby={titleId}
      >
        <ProjectImage src={project.imageSrc} title={project.title} />

        <div className="relative p-6">
          <h3 id={titleId} className="mb-2 text-xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="mb-4 text-brand-200">{project.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label={UI_LABELS.techStack}>
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-brand-200"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-white/20"
          aria-hidden="true"
        />
      </a>
    </article>
  );
}
