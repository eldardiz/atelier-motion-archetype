import { test, expect } from '@playwright/test'

/**
 * Site-wide animation wiring smoke test — verifies that:
 *  1. Each AnimationInit data-attribute hook has at least N opt-ins in the rendered DOM.
 *     This catches regressions where someone removes a data-* on a section and silently
 *     loses an animation.
 *  2. PlaylistSection mounts with its .playlist-vinyl (vinylSpin auto-binds on this).
 *  3. TestimonialsSection mounts with 6 cards, exactly one active at a time.
 *  4. The testimonial auto-rotate cycles within 6 seconds.
 *  5. Hovering pauses the cycle.
 */

test.describe('Site-wide GSAP animation wiring', () => {
  test('AnimationInit data-attributes are present across sections', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Each helper in AnimationInit scans for one of these — verify the engine
    // has something to bind to in the rendered page.
    const reveal = await page.locator('[data-reveal]').count()
    const wordsPullUp = await page.locator('[data-words-pullup]').count()
    const animPara = await page.locator('[data-anim-para]').count()
    const parallax = await page.locator('[data-parallax]').count()
    const cardStagger = await page.locator('[data-card-stagger]').count()
    const card = await page.locator('[data-card]').count()
    const parallaxTrigger = await page.locator('[data-parallax-trigger]').count()

    expect(reveal, '[data-reveal] elements').toBeGreaterThanOrEqual(8)
    expect(wordsPullUp, '[data-words-pullup] elements').toBeGreaterThanOrEqual(6)
    expect(animPara, '[data-anim-para] elements').toBeGreaterThanOrEqual(4)
    expect(parallax, '[data-parallax] elements').toBeGreaterThanOrEqual(4)
    expect(cardStagger, '[data-card-stagger] containers').toBeGreaterThanOrEqual(3)
    expect(card, '[data-card] items').toBeGreaterThanOrEqual(10)
    expect(parallaxTrigger, '[data-parallax-trigger] scopes').toBeGreaterThanOrEqual(3)
  })

  test('PlaylistSection mounts with vinyl + tracklist', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('section.sesta-playlist')).toBeVisible()
    await expect(page.locator('.playlist-vinyl')).toBeAttached()
    await expect(page.locator('.playlist-vinyl svg')).toBeAttached()
    const tracks = page.locator('.sesta-playlist__track')
    await expect(tracks).toHaveCount(4)
  })

  test('TestimonialsSection mounts with 6 cards, one active', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const cards = page.locator('.sesta-testi__card')
    await expect(cards).toHaveCount(6)
    const active = page.locator('.sesta-testi__card.is-active')
    await expect(active).toHaveCount(1)
  })

  test('TestimonialsSection auto-rotates the active card', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Capture the initial active card's name from its aria-label
    const initial = await page.locator('.sesta-testi__card.is-active').getAttribute('aria-label')
    expect(initial).toBeTruthy()

    // Move the pointer far away so :hover / onMouseEnter doesn't pause the cycle
    await page.mouse.move(10, 10)

    // Wait through one cycle (5s) + a small buffer
    await page.waitForTimeout(6000)

    const next = await page.locator('.sesta-testi__card.is-active').getAttribute('aria-label')
    expect(next, 'active card should change within 6s').not.toBe(initial)
  })

  test('Hover pauses the testimonial cycle', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Scroll testimonials into view so hover lands on the section
    await page.locator('section.sesta-testi').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)

    const before = await page.locator('.sesta-testi__card.is-active').getAttribute('aria-label')
    await page.locator('section.sesta-testi').hover()
    await page.waitForTimeout(6000)
    const after = await page.locator('.sesta-testi__card.is-active').getAttribute('aria-label')
    expect(after, 'active card should NOT change while hovered').toBe(before)
  })
})
