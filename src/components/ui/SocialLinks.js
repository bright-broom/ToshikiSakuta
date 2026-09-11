// =============================
// src/components/ui/SocialLinks.js
// 外部リンク（GitHub・メール）のアイコンリスト
// =============================

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SOCIAL_LINKS } from "@/data/navigation";

const ICONS = { github: faGithub, email: faEnvelope };

/**
 * @param {Object} props
 * @param {string} props.className - リストのクラス
 * @param {string} props.linkClassName - 各リンクのクラス
 */
export default function SocialLinks({ className, linkClassName }) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => {
        const opensNewTab = href.startsWith("https://");

        return (
          <li key={label}>
            <a
              href={href}
              className={linkClassName}
              aria-label={opensNewTab ? `${label}（新しいタブで開く）` : label}
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
