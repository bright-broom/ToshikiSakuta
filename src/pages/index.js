// =============================
// src/pages/index.js
// Next.js のルートページ
// =============================

import App from "../App";
import { getProjects } from "../data/projectsData";

// OG画像の再取得間隔（秒）
const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * 外部サイトへのアクセスを閲覧者のブラウザではなくサーバー側で行う
 * （CSP の connect-src を 'self' に限定でき、閲覧者の情報も外部に渡らない）
 */
export async function getStaticProps() {
  const projects = await getProjects();
  return { props: { projects }, revalidate: REVALIDATE_SECONDS };
}

/**
 * ルートページ（/）
 * @param {Object} props
 * @param {import("../data/projectsData").Project[]} props.projects
 * @returns {JSX.Element} アプリのメインコンポーネント
 */
export default function Home({ projects }) {
  return <App projects={projects} />;
}
