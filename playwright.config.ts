import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // ブラウザのダウンロードを避け、インストール済みの Google Chrome を使う（GitHub Actions の ubuntu-latest にも同梱）
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
  // 本番ビルド（npm run build）に対して検証する
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
  },
});
