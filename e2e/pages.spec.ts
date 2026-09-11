import { SECTIONS } from "../src/config/navigation.ts";
import { UI_LABELS } from "../src/content/copy.ts";
import { PROJECTS } from "../src/content/projects.ts";
import { siteConfig } from "../src/config/site.ts";
import { expect, test } from "./fixtures";

test.describe("トップページ", () => {
  test("エラーなく表示され、制作実績の画像がすべて読み込まれる", async ({ page, pageErrors }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(siteConfig.title);
    await expect(page.locator("html")).toHaveAttribute("lang", siteConfig.locale);

    for (const project of PROJECTS) {
      const image = page.getByAltText(UI_LABELS.screenshotAlt(project.title));
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(pageErrors).toEqual([]);
  });

  test("外部リンクは noopener noreferrer 付きで新しいタブを開く", async ({ page }) => {
    await page.goto("/");
    const externalLinks = page.locator('a[target="_blank"]');
    expect(await externalLinks.count()).toBeGreaterThan(0);
    for (const rel of await externalLinks.evaluateAll((links) => links.map((link) => link.getAttribute("rel")))) {
      expect(rel).toBe("noopener noreferrer");
    }
  });
});

test.describe("デスクトップナビゲーション", () => {
  test.skip(({ isMobile }) => isMobile, "デスクトップのみ");

  test("リンクで移動し、現在のセクションが示される", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: UI_LABELS.primaryNavigation });
    await expect(nav.locator('[aria-current="location"]')).toHaveText(SECTIONS[0].label);

    for (const { id, label } of SECTIONS.slice(1)) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(nav.locator('[aria-current="location"]')).toHaveText(label);
    }

    await page.getByRole("link", { name: UI_LABELS.backToTop }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  });
});

test.describe("モバイルメニュー", () => {
  test.skip(({ isMobile }) => !isMobile, "モバイルのみ");

  test("開閉・Escape・リンク選択で閉じ、閉じている間は操作できない", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: UI_LABELS.openMenu });
    const menu = page.getByRole("navigation", { name: UI_LABELS.mobileNavigation });

    await expect(menu).toBeHidden();
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: UI_LABELS.closeMenu })).toHaveAttribute("aria-expanded", "true");

    await menu.getByRole("link").first().focus();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: UI_LABELS.openMenu })).toBeFocused();

    const target = SECTIONS.at(-1);
    await page.getByRole("button", { name: UI_LABELS.openMenu }).click();
    await menu.getByRole("link", { name: target?.label, exact: true }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`#${target?.id}$`));
  });
});

test.describe("404 ページ", () => {
  test("CSP に適合した 404 ページを返す", async ({ page, pageErrors }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    expect(response?.headers()["content-security-policy"]).toContain("'nonce-");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });
});
