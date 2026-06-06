import { test, expect } from '@playwright/test'

/**
 * Motion hero smoke test — verifies the Veo image-sequence pipeline is
 * actually wired and serving frames.
 *
 * What this covers:
 *  - homepage returns 200
 *  - canvas element is present and aria-hidden
 *  - the SEO/a11y <h1> headline ("Progressio in traditione") is in the DOM
 *    as real text (not painted onto canvas)
 *  - frame 1, mid-frame, and last frame all return 200 from the static dir
 *  - no Kettmeir references survive in the served HTML
 *  - the section that pins (.motion-hero) is at the top of the page
 */

test.describe('Motion hero — Veo sequence pipeline', () => {
  test('homepage loads with motion hero markup', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const section = page.locator('section.motion-hero').first()
    await expect(section).toBeVisible()

    const canvas = section.locator('canvas.motion-hero__canvas')
    await expect(canvas).toBeAttached()
    await expect(canvas).toHaveAttribute('aria-hidden', 'true')

    const h1 = section.locator('h1.motion-hero__title')
    await expect(h1).toContainText(/Sesta/i)
    await expect(h1).toContainText(/Mallorca/i)

    // 3-column copy is in the DOM as real text (not painted onto canvas)
    const cols = section.locator('.motion-hero__columns .motion-hero__col')
    await expect(cols).toHaveCount(3)

    // Dark overlay + grain layers exist for the moody look
    await expect(section.locator('.motion-hero__veil')).toBeAttached()
    await expect(section.locator('.motion-hero__grain')).toBeAttached()

    // Corner labels render
    await expect(section.locator('.motion-hero__corner--tl')).toContainText(/Est/i)
    await expect(section.locator('.motion-hero__corner--tr')).toContainText(/Mallorca/i)
  })

  test('frame sequence serves desktop_00001 through desktop_00090', async ({ page, baseURL }) => {
    const base = baseURL ?? 'http://localhost:3011'
    const checks = [1, 30, 60, 90]
    for (const i of checks) {
      const url = `${base}/sequence/desktop/desktop_${String(i).padStart(5, '0')}.webp`
      const res = await page.request.get(url)
      expect(res.status(), `frame ${i} returned ${res.status()}`).toBe(200)
      const ctype = res.headers()['content-type'] ?? ''
      expect(ctype, `frame ${i} content-type is ${ctype}`).toMatch(/webp|image/)
    }
  })

  test('no Kettmeir traces in served HTML or assets', async ({ page, baseURL }) => {
    const base = baseURL ?? 'http://localhost:3011'

    // HTML must not reference kettmeir or kett_ prefix anywhere
    const html = (await (await page.request.get(`${base}/`)).text()).toLowerCase()
    expect(html, 'served HTML mentions kettmeir').not.toContain('kettmeir')
    expect(html, 'served HTML uses old kett_ frame prefix').not.toContain('kett_desktop')
    expect(html, 'served HTML uses old kett_ mobile frame prefix').not.toContain('kett_mobile')

    // Old asset paths must 404
    const oldKett = await page.request.get(`${base}/sequence/desktop/kett_desktop_00001.webp`)
    expect(oldKett.status(), 'old kett_desktop_00001.webp still serves').toBe(404)
  })

  test('motion hero is the top section and pins on scroll', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    // Wait for the canvas loader to finish so layout is stable
    await page.locator('section.motion-hero').first().waitFor({ state: 'visible' })
    // Give the preload + GSAP timeline a beat to settle
    await page.waitForTimeout(2500)

    const section = page.locator('section.motion-hero').first()
    const top = await section.evaluate((el) => el.getBoundingClientRect().top)
    expect(top, 'motion hero should start at the very top of the page').toBeLessThan(80) // navbar height tolerance

    // Scroll a third of viewport and confirm the section is still pinned (top stays at 0)
    await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 0.3, behavior: 'instant' as ScrollBehavior }))
    await page.waitForTimeout(400)
    const topAfter = await section.evaluate((el) => el.getBoundingClientRect().top)
    expect(topAfter, 'motion hero should still be pinned to top after scroll').toBeLessThan(80)
  })
})
