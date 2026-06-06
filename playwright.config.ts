import { defineConfig, devices } from '@playwright/test'

/**
 * Atelier archetype — Playwright config.
 *
 * Tests run against the deployed production URL (atelier-archetype.vercel.app)
 * NOT a local dev server. This avoids spinning up `next dev` which has
 * historically OOM-d local machines during accessibility audits.
 *
 * To test a branch / preview, override:  PLAYWRIGHT_BASE_URL=https://preview… npm run test
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: [['list']],
  timeout: 45_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'https://atelier-motion-archetype.vercel.app',
    ignoreHTTPSErrors: false,
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
