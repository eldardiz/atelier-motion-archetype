import { test, expect } from '@playwright/test'

/**
 * Osmo Bold Full Screen Navigation smoke test — verifies the navbar's
 * clip-path overlay reveal works and the toggle wiring is correct.
 *
 * Covers:
 *  - navbar markup present with data-navigation-status="not-active" on load
 *  - hamburger toggle flips data-navigation-status to "active"
 *  - tile clip-path opens (visible fullscreen overlay)
 *  - menu links are present
 *  - ESC closes the menu
 *  - clicking a link closes the menu
 *  - body scroll is locked while open
 */

test.describe('Bold Full Screen Navigation', () => {
  test('navbar mounts with closed state', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const nav = page.locator('nav.bold-nav-full')
    await expect(nav).toBeAttached()
    await expect(nav).toHaveAttribute('data-navigation-status', 'not-active')

    const hamburger = nav.locator('[data-navigation-toggle="toggle"]')
    await expect(hamburger).toBeVisible()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')

    // Three hamburger bars
    await expect(nav.locator('.bold-nav-full__hamburger-bar')).toHaveCount(3)

    // Menu links are in the DOM even when closed (just clipped)
    await expect(nav.locator('.bold-nav-full__link')).toHaveCount(5)
  })

  test('hamburger toggles overlay open and closed', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const nav = page.locator('nav.bold-nav-full')
    const hamburger = nav.locator('[data-navigation-toggle="toggle"]')

    await hamburger.click()
    await expect(nav).toHaveAttribute('data-navigation-status', 'active')
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    // Tile is now fully revealed (clip-path is fully open)
    const tile = nav.locator('.bold-nav-full__tile')
    await expect(tile).toHaveCSS('clip-path', /polygon\(0%? 0%?, 100%? 0%?, 100%? 100%?, 0%? 100%?\)/)

    // Body scroll is locked
    await expect.poll(async () => await page.evaluate(() => document.body.style.overflow)).toBe('hidden')

    await hamburger.click()
    await expect(nav).toHaveAttribute('data-navigation-status', 'not-active')
    await expect.poll(async () => await page.evaluate(() => document.body.style.overflow)).toBe('')
  })

  test('ESC closes the menu', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const nav = page.locator('nav.bold-nav-full')
    await nav.locator('[data-navigation-toggle="toggle"]').click()
    await expect(nav).toHaveAttribute('data-navigation-status', 'active')

    await page.keyboard.press('Escape')
    await expect(nav).toHaveAttribute('data-navigation-status', 'not-active')
  })

  test('clicking a link closes the menu', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const nav = page.locator('nav.bold-nav-full')
    await nav.locator('[data-navigation-toggle="toggle"]').click()
    await expect(nav).toHaveAttribute('data-navigation-status', 'active')

    // Wait for the link reveal transition to finish so clicks land
    await page.waitForTimeout(900)

    await nav.locator('.bold-nav-full__link').first().click()
    await expect(nav).toHaveAttribute('data-navigation-status', 'not-active')
  })
})
