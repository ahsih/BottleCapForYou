import { AppLanguage } from '../i18n/translations';

/** Pages that exist in every language. */
export type PageKey = 'home' | 'news' | 'products' | 'thank-you';

export const SITE_URL = 'https://bottlecapforyou.com';

export const APP_LANGUAGES: readonly AppLanguage[] = ['en', 'zh-CN', 'ar'];

/**
 * URL prefix per language. English is served from the site root so that the
 * already-indexed URLs, the sitemap and the live ads landing pages keep
 * working; only the added languages take a prefix.
 */
export const LANGUAGE_PREFIX: Record<AppLanguage, string> = {
  en: '',
  'zh-CN': '/zh',
  ar: '/ar'
};

/**
 * hreflang values. Chinese is advertised as `zh-Hans` (script subtag) rather
 * than `zh`, which is what Google matches Simplified Chinese searches against.
 */
export const HREFLANG_CODE: Record<AppLanguage, string> = {
  en: 'en',
  'zh-CN': 'zh-Hans',
  ar: 'ar'
};

export const PAGE_PATH: Record<PageKey, string> = {
  home: '',
  news: '/news',
  products: '/products',
  'thank-you': '/thank-you'
};

/** Text direction for a language, used for <html dir> and page layout. */
export function directionFor(language: AppLanguage): 'rtl' | 'ltr' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Router path for a page in a language, e.g. '/zh/products'. The English home
 * page is '/'; every other path is emitted without a trailing slash to match
 * the canonical form the server redirects to.
 */
export function pageRoute(language: AppLanguage, page: PageKey): string {
  const path = `${LANGUAGE_PREFIX[language]}${PAGE_PATH[page]}`;
  return path === '' ? '/' : path;
}

/**
 * Router path for a link shown while browsing in `language`. Pages that have no
 * translation resolve to their English path, so a link never points at a URL
 * that was never generated.
 */
export function localizedRoute(language: AppLanguage, page: PageKey): string {
  return pageRoute(isLocalized(page) ? language : 'en', page);
}

/** Absolute URL for a page in a language, used for canonical and hreflang. */
export function pageUrl(language: AppLanguage, page: PageKey): string {
  const path = `${LANGUAGE_PREFIX[language]}${PAGE_PATH[page]}`;
  return path === '' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Pages that genuinely exist in every language.
 *
 * `news` is deliberately absent: its copy is still English-only, so giving it
 * /zh and /ar URLs would publish three duplicate English pages, two of them
 * labelled as Chinese and Arabic, and the hreflang annotations would be
 * promising translations that do not exist. Add 'news' here once the page's
 * content is translated - routes, hreflang, and the server mappings all follow
 * from this list.
 */
export const LOCALIZED_PAGES: readonly PageKey[] = ['home', 'products', 'thank-you'];

export function isLocalized(page: PageKey): boolean {
  return LOCALIZED_PAGES.includes(page);
}

/**
 * The page a language switch should land on. `thank-you` is a post-submit
 * confirmation rather than a destination, and a page with no translation has
 * nowhere to go in another language - both fall back to that language's home.
 */
export function switchTarget(page: PageKey, language: AppLanguage): PageKey {
  if (page === 'thank-you') {
    return 'home';
  }

  return language !== 'en' && !isLocalized(page) ? 'home' : page;
}

/** Maps a browser language tag (e.g. 'zh-TW', 'ar-EG') to a supported language. */
export function matchBrowserLanguage(tag: string): AppLanguage {
  const normalized = tag.toLowerCase();

  if (normalized.startsWith('zh')) {
    return 'zh-CN';
  }

  if (normalized.startsWith('ar')) {
    return 'ar';
  }

  return 'en';
}
