import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppLanguage, SiteTranslations, translations } from '../i18n/translations';
import {
  PageKey,
  directionFor,
  matchBrowserLanguage,
  pageRoute,
  switchTarget
} from './locale';

@Injectable({ providedIn: 'root' })
export class I18nService {
  /**
   * Remembers the language the visitor last chose, so the suggestion banner
   * stops appearing once they have made a choice. It deliberately does NOT
   * decide which language is rendered - the URL does. Letting a stored value
   * override the URL would put two languages on one address, which is the
   * problem the per-language paths exist to solve.
   */
  private readonly storageKey = 'site-language';

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly currentLanguage = signal<AppLanguage>('en');
  private readonly currentPage = signal<PageKey>('home');

  readonly language = this.currentLanguage.asReadonly();
  readonly page = this.currentPage.asReadonly();
  readonly content = computed<SiteTranslations>(() => translations[this.currentLanguage()]);
  readonly direction = computed(() => directionFor(this.currentLanguage()));

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.syncFromRoute();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.syncFromRoute());
  }

  /** Navigates to the same page in another language. */
  switchLanguage(language: AppLanguage): void {
    this.persistChoice(language);
    void this.router.navigateByUrl(pageRoute(language, switchTarget(this.currentPage(), language)));
  }

  /** The language this visitor's browser asks for, or null outside the browser. */
  browserLanguage(): AppLanguage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return matchBrowserLanguage(navigator.language ?? 'en');
  }

  /** True once the visitor has explicitly picked or dismissed a language. */
  hasChosenLanguage(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    try {
      return localStorage.getItem(this.storageKey) !== null;
    } catch {
      return false;
    }
  }

  persistChoice(language: AppLanguage): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, language);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies). The
      // banner reappearing is an acceptable outcome; a crash is not.
    }
  }

  private syncFromRoute(): void {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.snapshot.data;
    const language = (data['language'] as AppLanguage | undefined) ?? 'en';

    this.currentPage.set((data['page'] as PageKey | undefined) ?? 'home');
    this.applyLanguage(language);
  }

  private applyLanguage(language: AppLanguage): void {
    this.currentLanguage.set(language);
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = directionFor(language);
  }
}
