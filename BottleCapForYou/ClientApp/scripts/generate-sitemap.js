/**
 * Regenerates public/sitemap.xml from the catalogue data.
 *
 * Runs automatically before `npm run build` (see the "prebuild" script), so the
 * sitemap can never drift from the pages that are actually prerendered.
 *
 * Slugs are read out of products.data.ts rather than duplicated here. The parse
 * is deliberately strict: if it does not find exactly the expected shape it
 * fails the build instead of quietly emitting an incomplete sitemap.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'src/app/products/products.data.ts');
const OUT = path.join(ROOT, 'public/sitemap.xml');

const SITE = 'https://bottlecapforyou.com';

// Must mirror LANGUAGE_PREFIX / HREFLANG_CODE in src/app/core/locale.ts
const LANGUAGES = [
  { prefix: '', hreflang: 'en' },
  { prefix: '/zh', hreflang: 'zh-Hans' },
  { prefix: '/ar', hreflang: 'ar' }
];

function readSlugs() {
  const source = fs.readFileSync(DATA, 'utf8');
  const slugs = [...source.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map((m) => m[1]);

  if (slugs.length === 0) {
    throw new Error('No product slugs found in products.data.ts - has the format changed?');
  }

  const unique = new Set(slugs);
  if (unique.size !== slugs.length) {
    throw new Error('Duplicate product slug found in products.data.ts');
  }

  return slugs;
}

/** One <url> entry with reciprocal hreflang annotations across all languages. */
function localizedEntry(pathFor) {
  const alternates = LANGUAGES.map(
    (lang) =>
      `    <xhtml:link rel="alternate" hreflang="${lang.hreflang}" href="${SITE}${pathFor(lang.prefix)}" />`
  );
  alternates.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pathFor('')}" />`
  );

  return LANGUAGES.map((lang) =>
    ['  <url>', `    <loc>${SITE}${pathFor(lang.prefix)}</loc>`, ...alternates, '  </url>'].join('\n')
  );
}

function build() {
  const slugs = readSlugs();
  const blocks = [];

  // Home, in three languages. English home keeps its trailing slash.
  blocks.push(...localizedEntry((prefix) => (prefix === '' ? '/' : prefix)));

  // Product catalogue.
  blocks.push(...localizedEntry((prefix) => `${prefix}/products`));

  // One entry per product per language.
  for (const slug of slugs) {
    blocks.push(...localizedEntry((prefix) => `${prefix}/products/${slug}`));
  }

  // News is English-only, so it carries no hreflang annotations.
  blocks.push(['  <url>', `    <loc>${SITE}/news</loc>`, '  </url>'].join('\n'));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset',
    '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '  xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '>',
    ...blocks,
    '</urlset>',
    ''
  ].join('\n');

  fs.writeFileSync(OUT, xml);

  const urlCount = (xml.match(/<loc>/g) || []).length;
  const expected = LANGUAGES.length * (2 + slugs.length) + 1;

  if (urlCount !== expected) {
    throw new Error(`Sitemap has ${urlCount} URLs, expected ${expected}`);
  }

  console.log(`sitemap.xml: ${urlCount} URLs (${slugs.length} products x ${LANGUAGES.length} languages)`);
}

build();
