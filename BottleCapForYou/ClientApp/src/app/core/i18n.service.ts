import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, signal } from '@angular/core';
import { AppLanguage, SiteTranslations, translations } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly storageKey = 'site-language';
  private readonly currentLanguage = signal<AppLanguage>('en');

  readonly language = this.currentLanguage.asReadonly();
  readonly content = computed<SiteTranslations>(() => translations[this.currentLanguage()]);

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    const initialLanguage = this.resolveInitialLanguage();
    this.applyLanguage(initialLanguage);
  }

  setLanguage(language: AppLanguage): void {
    this.applyLanguage(language);
    this.persist(language);
  }

  private applyLanguage(language: AppLanguage): void {
    this.currentLanguage.set(language);
    this.document.documentElement.lang = language;
  }

  private resolveInitialLanguage(): AppLanguage {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'en' || saved === 'zh-CN') {
      return saved;
    }

    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('zh') ? 'zh-CN' : 'en';
  }

  private persist(language: AppLanguage): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(this.storageKey, language);
  }
}
