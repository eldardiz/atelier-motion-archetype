import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Atelier accessibility scan — runs against the deployed production URL.
 *
 * What this covers (via axe-core):
 *  - WCAG 2.1 AA color contrast (text on backgrounds)
 *  - Image alt text presence
 *  - ARIA attribute correctness
 *  - Heading order
 *  - Landmark roles
 *  - Form label association
 *  - Link discernibility
 *
 * Soft-fail policy: violations are LOGGED but the test passes unless an axe
 * error occurs. The point is the report — not blocking deploys on findings
 * we want to triage manually.
 */

test.describe('Atelier homepage accessibility', () => {
  test('axe-core full scan (WCAG 2.1 AA)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze()

    console.log('\n────────────────────────────────────────')
    console.log(`AXE SCAN RESULT — ${results.violations.length} violations`)
    console.log('────────────────────────────────────────')

    if (results.violations.length === 0) {
      console.log('✅ No violations found.')
    } else {
      results.violations.forEach((v, i) => {
        console.log(`\n${i + 1}. ${v.id}  [${v.impact ?? 'unknown'}]`)
        console.log(`   ${v.description}`)
        console.log(`   Help: ${v.helpUrl}`)
        console.log(`   Nodes affected: ${v.nodes.length}`)
        v.nodes.slice(0, 3).forEach((node, j) => {
          const target = Array.isArray(node.target) ? node.target.join(' > ') : String(node.target)
          console.log(`     ${j + 1}. ${target}`)
          if (node.failureSummary) {
            const summary = node.failureSummary.split('\n').slice(0, 2).join(' | ')
            console.log(`        ${summary}`)
          }
        })
        if (v.nodes.length > 3) {
          console.log(`     … and ${v.nodes.length - 3} more`)
        }
      })
    }

    // Hard-fail only on critical issues to keep the report informative
    const critical = results.violations.filter((v) => v.impact === 'critical')
    expect(critical, `${critical.length} CRITICAL accessibility violations found`).toEqual([])
  })

  test('color-contrast specific (WCAG AA only)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze()

    console.log('\n────────────────────────────────────────')
    console.log(`COLOR CONTRAST — ${results.violations.length} violations`)
    console.log('────────────────────────────────────────')

    results.violations.forEach((v) => {
      console.log(`\n${v.id}  [${v.impact ?? 'unknown'}]`)
      console.log(`   ${v.description}`)
      v.nodes.forEach((node, i) => {
        const target = Array.isArray(node.target) ? node.target.join(' > ') : String(node.target)
        console.log(`   ${i + 1}. ${target}`)
        if (node.failureSummary) {
          const m = node.failureSummary.match(/Expected contrast ratio of ([\d.:]+).*?Background color: (#[0-9a-fA-F]+).*?Foreground color: (#[0-9a-fA-F]+)/s)
          if (m) {
            console.log(`      Expected ratio: ${m[1]} | fg ${m[3]} on bg ${m[2]}`)
          }
          const actualMatch = node.failureSummary.match(/contrast of ([\d.]+)/)
          if (actualMatch) console.log(`      Actual ratio: ${actualMatch[1]}`)
        }
      })
    })

    if (results.violations.length === 0) {
      console.log('✅ All text meets WCAG AA contrast ratios.')
    }
  })

  test('images have alt text (or aria-hidden)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const audit = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'))
      return imgs.map((img) => ({
        src: img.src.slice(0, 70),
        alt: img.getAttribute('alt'),
        ariaHidden: img.getAttribute('aria-hidden'),
        decorativeOk: img.getAttribute('alt') === '' || img.getAttribute('aria-hidden') === 'true',
      }))
    })
    const missing = audit.filter((i) => i.alt === null && i.ariaHidden !== 'true')
    console.log(`\nIMAGE ALT — ${audit.length} images scanned`)
    if (missing.length === 0) {
      console.log('✅ All images either have alt text or are aria-hidden (decorative).')
    } else {
      console.log(`❌ ${missing.length} images missing alt + not aria-hidden:`)
      missing.forEach((m, i) => console.log(`  ${i + 1}. ${m.src}…`))
    }
    expect(missing).toEqual([])
  })

  test('interactive elements have accessible labels', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const audit = await page.evaluate(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>('button, a[href], [role="button"]'),
      )
      return els.map((el) => ({
        tag: el.tagName,
        text: (el.textContent ?? '').trim().slice(0, 40),
        ariaLabel: el.getAttribute('aria-label'),
        title: el.getAttribute('title'),
      }))
    })
    const unlabeled = audit.filter((e) => !e.text && !e.ariaLabel && !e.title)
    console.log(`\nINTERACTIVE LABELS — ${audit.length} elements scanned`)
    if (unlabeled.length === 0) {
      console.log('✅ All buttons + links have discernible labels.')
    } else {
      console.log(`❌ ${unlabeled.length} unlabeled:`)
      unlabeled.forEach((u, i) => console.log(`  ${i + 1}. <${u.tag}> (no text, no aria-label)`))
    }
    expect(unlabeled).toEqual([])
  })
})
