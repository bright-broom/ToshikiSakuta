import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SOCIAL_LINKS } from "@/config/navigation";
import { UI_LABELS } from "@/content/copy";
import type { SocialIcon } from "@/types/content";

const ICONS = {
  github: faGithub,
} as const satisfies Record<SocialIcon, IconDefinition>;

type SocialLinksProps = {
  className: string;
  linkClassName: string;
};

export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            aria-label={UI_LABELS.opensInNewTab(label)}
          >
            <FontAwesomeIcon icon={ICONS[icon]} />
          </a>
        </li>
      ))}
    </ul>
  );
}
