import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SOCIAL_LINKS } from "@/config/navigation";
import { UI_LABELS } from "@/content/copy";
import type { SocialIcon } from "@/types/content";

const ICONS = {
  github: faGithub,
  email: faEnvelope,
} as const satisfies Record<SocialIcon, IconDefinition>;

type SocialLinksProps = {
  className: string;
  linkClassName: string;
};

export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => {
        const opensNewTab = href.startsWith("https://");

        return (
          <li key={label}>
            <a
              href={href}
              className={linkClassName}
              aria-label={opensNewTab ? UI_LABELS.opensInNewTab(label) : label}
              {...(opensNewTab && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <FontAwesomeIcon icon={ICONS[icon]} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
