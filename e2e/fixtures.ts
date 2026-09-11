import { test as base, expect } from "@playwright/test";

type CspViolation = { directive: string; blockedUri: string; sample: string };

declare global {
  interface Window {
    __cspViolations: CspViolation[];
  }
}

/**
 * CSP 違反とページ内の未処理エラーを記録し、テスト終了時に 0 件であることを検証する
 * 意図的に違反を起こすテストは expectedViolations を true にする
 */
export const test = base.extend<{ expectedViolations: boolean; pageErrors: Error[] }>({
  expectedViolations: [false, { option: true }],
  pageErrors: async ({ page }, provide) => {
    const errors: Error[] = [];
    page.on("pageerror", (error) => errors.push(error));
    await provide(errors);
  },
  page: async ({ page, expectedViolations }, provide) => {
    await page.addInitScript(() => {
      window.__cspViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        window.__cspViolations.push({
          directive: event.effectiveDirective,
          blockedUri: event.blockedURI,
          sample: event.sample,
        });
      });
    });

    await provide(page);

    if (!expectedViolations && !page.isClosed()) {
      const violations = await page.evaluate(() => window.__cspViolations ?? []);
      expect(violations, "CSP 違反").toEqual([]);
    }
  },
});

export { expect };
