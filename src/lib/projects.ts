import { cacheLife } from "next/cache";
import { OG_IMAGE_CACHE_PROFILE } from "@/config/og-image";
import { DEFAULT_PROJECT_IMAGE, PROJECTS } from "@/content/projects";
import { fetchOgImage } from "@/lib/og-image";
import type { ProjectWithImage } from "@/types/content";

/**
 * 制作実績に OG 画像の URL を付与して返す
 * 外部サイトへのアクセスはサーバー側でのみ行い、結果をキャッシュする
 * （CSP の connect-src を 'self' に限定でき、閲覧者の情報も外部に渡らない）
 */
export async function getProjectsWithImages(): Promise<ProjectWithImage[]> {
  "use cache";
  cacheLife(OG_IMAGE_CACHE_PROFILE);

  return Promise.all(
    PROJECTS.map(async (project) => ({
      ...project,
      imageSrc: (await fetchOgImage(project.url)) ?? DEFAULT_PROJECT_IMAGE,
    })),
  );
}
