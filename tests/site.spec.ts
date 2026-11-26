import { expect, test, type Page } from "@playwright/test";
import { profile } from "../src/content/profile";

const phone = { width: 390, height: 844 };

/** Waits until React has started, so clicks are not lost on a page that is still loading. */
async function openHome(page: Page) {
  await page.goto("/");
  await expect(page.locator("html[data-hydrated]")).toBeAttached();
}

/**
 * Asks the browser itself whether the mobile menu is exposed to assistive
 * technology, by reading its accessibility tree.
 */
async function mobileMenuIsExposed(page: Page) {
  const session = await page.context().newCDPSession(page);
  const { nodes } = await session.send("Accessibility.getFullAXTree");
  await session.detach();
  return nodes.some(
    (node) => !node.ignored && node.role?.value === "navigation" && node.name?.value === "Mobile",
  );
}

test.describe("home page", () => {
  test("shows the name, the title and every role, with no browser errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await openHome(page);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      `${profile.name}, ${profile.title}`,
    );
    await expect(page.locator("#journey ol > li")).toHaveCount(profile.roles.length);
    for (const role of profile.roles) {
      await expect(page.locator("#journey").getByText(role.org, { exact: true })).toBeAttached();
    }
    expect(errors).toEqual([]);
  });

  test("reveals content and counts the figures up when scrolled to", async ({ page }) => {
    await openHome(page);

    const impact = page.locator("#impact");
    await impact.scrollIntoViewIfNeeded();
    await expect(impact.locator("[data-reveal]").first()).toHaveCSS("opacity", "1");
    await expect(impact).toContainText("80%");
    await expect(impact).toContainText("40%");
    await expect(impact).toContainText("90%");
  });

  test("sends visitors to LinkedIn and does not publish an email address", async ({ page }) => {
    await openHome(page);

    const link = page.locator("#contact").getByRole("link", { name: profile.contact.label });
    await expect(link).toHaveAttribute("href", profile.contact.href);

    const html = await page.content();
    expect(html).not.toContain("mailto:");
    expect(html).not.toMatch(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  });
});

test.describe("on a phone", () => {
  test.use({ viewport: phone });

  test("does not scroll sideways", async ({ page }) => {
    await openHome(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("menu opens, closes on Escape and returns focus to its button", async ({ page }) => {
    await openHome(page);
    const button = page.getByRole("button", { name: "Open menu" });
    const menu = page.locator("#mobile-nav");

    // Closed: hidden from keyboard and screen readers.
    await expect(menu).toHaveAttribute("inert", "");
    expect(await mobileMenuIsExposed(page)).toBe(false);

    await button.click();
    await expect(menu).not.toHaveAttribute("inert");
    await expect.poll(() => mobileMenuIsExposed(page)).toBe(true);
    await expect(
      page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "About" }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("inert", "");
    expect(await mobileMenuIsExposed(page)).toBe(false);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every section is readable and the figures are real", async ({ page }) => {
    await page.goto("/");

    // Nothing may be left hidden waiting for a script.
    const reveals = page.locator("[data-reveal]");
    expect(await reveals.count()).toBeGreaterThan(0);
    for (const element of await reveals.all()) {
      await expect(element).toHaveCSS("opacity", "1");
    }

    await expect(page.locator("#impact")).toContainText("> 80%");
    await expect(page.locator("#impact")).toContainText("40%");
    await expect(page.locator("#impact")).toContainText("90%");
    await expect(page.locator("#journey")).toContainText(profile.roles[0].org);
  });
});
