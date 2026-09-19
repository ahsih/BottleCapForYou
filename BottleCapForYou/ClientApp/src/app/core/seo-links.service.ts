import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { AppLanguage } from '../i18n/translations';
import {
  APP_LANGUAGES,
  HREFLANG_CODE,
  PageKey,
  isLocalized,
  pageUrl,
  switchTarget
} from './locale';

/**
 * Maintains the <link rel="canonical"> and the reciprocal
 * <link rel="alternate" hreflang="..."> set in <head>.
 *
 * Every language version of a page must list every other version, including
 * itself, plus an x-default pointing at the English page - Google ignores
 * hreflang annotations that are not reciprocated.
 */
@Injectable({ providedIn: 'root' })
export class SeoLinksService {
  private readonly document = inject(DOCUMENT);

  /** Applies the tags for one page and returns its canonical URL. */
  apply(language: AppLanguage, page: PageKey): string {
    // `thank-you` is not a destination of its own; it points at the home page
    // so the confirmation screen never competes with it in search results.
    const seoPage = switchTarget(page, language);
    const canonical = pageUrl(language, seoPage);

    this.setCanonical(canonical);

    // A page that exists in only one language gets no hreflang at all -
    // annotations are a claim that alternatives exist.
    this.setAlternates(isLocalized(seoPage) ? seoPage : null);

    return canonical;
  }

  private setCanonical(href: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', href);
  }

  private setAlternates(page: PageKey | null): void {
    // Rebuild rather than patch: the set belongs to the current page, and
    // stale entries from the previous navigation would be wrong here.
    this.document
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((link) => link.remove());

    if (page === null) {
      return;
    }

    for (const language of APP_LANGUAGES) {
      this.appendAlternate(HREFLANG_CODE[language], pageUrl(language, page));
    }

    this.appendAlternate('x-default', pageUrl('en', page));
  }

  private appendAlternate(hreflang: string, href: string): void {
    const link = this.document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    this.document.head.appendChild(link);
  }
}
