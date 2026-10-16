#!/usr/bin/env node

/**
 * scrape-reviews.mjs — scrape Baltec's Google Maps reviews ONCE into
 * src/data/reviews.json. The site renders that static file; nothing calls
 * Google at runtime.
 *
 * Ported from AyniCollective/scripts/scrape-reviews.mjs.
 *
 * The site ships these quotes as real customer testimony: only scraped output
 * may ever reach src/data/reviews.json. Never fabricate or reword reviews.
 *
 * Run (needs Playwright + Chromium; not a project dependency on purpose):
 *   node scripts/scrape-reviews.mjs
 *   PLAYWRIGHT_DIR=/path/to/node_modules/playwright node scripts/scrape-reviews.mjs
 *
 * Google may serve a "limited view" with no reviews to headless browsers; the
 * retry loop reloads from the Maps homepage until the full page shows. If it
 * never does, the existing JSON is left untouched.
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '..', 'src/data/reviews.json');

/** Place from the map embed in src/components/Contact.tsx (CID of 0x9d865f5bb08652ec). */
const PLACE_NAME = 'Balanceo Dinámico Baltec SRL';
const PLACE_CID = '11350864758242169580';
const PLACE_URL = `https://www.google.com/maps?cid=${PLACE_CID}`;

const MAX_ATTEMPTS = 4;
const TEXT_SELECTOR = '.wiI7pd, .Jlozfb';
const SHARE_SELECTOR =
  '[aria-label*="Share"][aria-label*="review"], [aria-label^="Compartir la opinión de"], [aria-label^="Compartir reseña de"]';

async function loadPlaywright() {
  if (process.env.PLAYWRIGHT_DIR) {
    return import(pathToFileURL(join(process.env.PLAYWRIGHT_DIR, 'index.mjs')).href);
  }
  return import('playwright');
}

async function navigateToPlace(page) {
  // hl=es: the reviews are in Spanish; any other locale makes Google
  // auto-translate them.
  await page.goto('https://www.google.com/maps?hl=es', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(3000);
  await page
    .locator('button:has-text("Aceptar todo"), button:has-text("Accept all")')
    .first()
    .click({ timeout: 3000 })
    .catch(() => {});
  await page.goto(`${PLACE_URL}&hl=es`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(6000);
}

async function main() {
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    locale: 'es-AR',
    extraHTTPHeaders: { 'Accept-Language': 'es-AR,es;q=0.9' },
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  const page = await context.newPage();

  try {
    let summary = null;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      console.log(`Attempt ${attempt}/${MAX_ATTEMPTS}`);
      await navigateToPlace(page);
      // Overall rating + total count from the place header (".F7nice").
      summary = await page.evaluate(() => {
        const box = document.querySelector('.F7nice');
        if (!box) return null;
        const txt = box.textContent || '';
        const rating = parseFloat((txt.match(/(\d[.,]\d)/) || [])[1]?.replace(',', '.') || 'NaN');
        const count = parseInt((txt.match(/\(([\d.,]+)\)/) || [])[1]?.replace(/[.,]/g, '') || 'NaN', 10);
        return { rating, count };
      });
      console.log('URL:', page.url(), 'summary:', summary);
      if (summary && !Number.isNaN(summary.rating)) break;
      summary = null;
      await page.waitForTimeout(8000);
    }
    if (!summary) {
      console.error('Could not load the place page (limited view?). reviews.json left untouched.');
      process.exitCode = 1;
      return;
    }

    const tab = page
      .locator('[role="tab"]:has-text("Opiniones"), [role="tab"]:has-text("Reseñas"), [role="tab"]:has-text("Reviews")')
      .first();
    if (await tab.count()) {
      await tab.click({ timeout: 5000 });
      await page.waitForTimeout(3000);
    }

    // The list lazy-loads in batches: bring the last card into view and wheel
    // the inner scroller until the count stops growing.
    let prev = -1;
    for (let i = 0; i < 25; i++) {
      const cards = page.locator('.jftiEf');
      const n = await cards.count();
      if (n === prev && i > 4) break;
      prev = n;
      // Headless Maps shows 5 cards plus a "Ver más reseñas (N)" button.
      await page
        .locator('button:has-text("Ver más reseñas"), button:has-text("More reviews")')
        .first()
        .click({ timeout: 1500 })
        .catch(() => {});
      if (n) {
        await cards.last().scrollIntoViewIfNeeded().catch(() => {});
        await cards.last().hover().catch(() => {});
        await page.mouse.wheel(0, 3000);
      }
      await page.waitForTimeout(1200);
    }
    // Expand truncated texts ("Más").
    await page.evaluate(() => document.querySelectorAll('button.w8nwRe').forEach((b) => b.click()));
    await page.waitForTimeout(1000);

    const reviews = await page.evaluate(
      ({ textSelector, shareSelector }) => {
        const out = [];
        for (const btn of document.querySelectorAll(shareSelector)) {
          const label = btn.getAttribute('aria-label') || '';
          const m = label.match(/Share (.+)'s review/) || label.match(/Compartir (?:la opinión|reseña) de (.+?)\.?$/);
          const name = m ? m[1].trim() : '';
          // Walk up to the card: exactly one share button and one rating.
          let card = btn;
          let found = null;
          for (let i = 0; i < 15 && card; i++) {
            card = card.parentElement;
            if (!card) break;
            if (!card.querySelector('.kvMYJc')) continue;
            if (card.querySelectorAll(shareSelector).length !== 1) continue;
            if (card.querySelectorAll('.kvMYJc').length !== 1) continue;
            found = card;
            break;
          }
          if (!found || !name) continue;
          const text = found.querySelector(textSelector)?.textContent?.trim() || '';
          const stars = found.querySelector('.kvMYJc')?.getAttribute('aria-label') || '';
          const rating = parseInt((stars.match(/(\d)/) || [])[1] || '0', 10);
          const date = found.querySelector('.rsqaWe')?.textContent?.trim() || '';
          if (!rating) continue;
          if (!out.find((r) => r.name === name && r.text === text)) out.push({ name, rating, text, date });
        }
        return out;
      },
      { textSelector: TEXT_SELECTOR, shareSelector: SHARE_SELECTOR },
    );

    console.log(`Found ${reviews.length} reviews (${reviews.filter((r) => r.text).length} with text)`);
    if (reviews.length === 0) {
      console.error('No reviews extracted — layout changed? reviews.json left untouched.');
      process.exitCode = 1;
      return;
    }

    writeFileSync(
      OUTPUT,
      JSON.stringify(
        {
          scrapedAt: new Date().toISOString(),
          placeName: PLACE_NAME,
          placeUrl: PLACE_URL,
          rating: summary.rating,
          totalReviews: Number.isNaN(summary.count) ? reviews.length : summary.count,
          reviews,
        },
        null,
        2,
      ) + '\n',
    );
    console.log(`Saved to ${OUTPUT}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main();
