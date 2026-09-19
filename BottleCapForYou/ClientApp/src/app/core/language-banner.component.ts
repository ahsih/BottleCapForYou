import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { AppLanguage } from '../i18n/translations';
import { I18nService } from './i18n.service';
import { directionFor } from './locale';

type BannerText = {
  message: string;
  action: string;
  dismiss: string;
};

/** Written in the language being offered, since that is the one the reader knows. */
const BANNER_TEXT: Record<AppLanguage, BannerText> = {
  en: {
    message: 'View this site in English?',
    action: 'Switch to English',
    dismiss: 'No thanks'
  },
  'zh-CN': {
    message: '是否以中文浏览本网站？',
    action: '切换到中文',
    dismiss: '不用了'
  },
  ar: {
    message: 'هل تريد تصفح الموقع بالعربية؟',
    action: 'التبديل إلى العربية',
    dismiss: 'لا، شكرًا'
  }
};

/**
 * Offers the visitor their browser's language without taking the decision away
 * from them. The page itself always stays in the language of its URL: an
 * automatic redirect would put two languages behind one address again and can
 * stop crawlers ever reaching the other versions.
 *
 * Renders in the browser only, so prerendered HTML is unaffected.
 */
@Component({
  selector: 'app-language-banner',
  standalone: true,
  template: `
    @if (suggested(); as language) {
      <aside
        class="language-banner"
        [attr.dir]="directionFor(language)"
        [attr.lang]="language"
        role="region"
        [attr.aria-label]="text(language).message"
      >
        <span class="language-banner__message">{{ text(language).message }}</span>
        <span class="language-banner__actions">
          <button type="button" class="language-banner__switch" (click)="accept(language)">
            {{ text(language).action }}
          </button>
          <button type="button" class="language-banner__dismiss" (click)="dismiss()">
            {{ text(language).dismiss }}
          </button>
        </span>
      </aside>
    }
  `,
  styles: [
    `
      .language-banner {
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.75rem 1rem;
        padding: 0.75rem 1rem;
        background: #10263f;
        color: #fff;
        font-size: 0.95rem;
        box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.25);
      }

      .language-banner__actions {
        display: flex;
        gap: 0.5rem;
      }

      .language-banner button {
        padding: 0.45rem 0.9rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        font: inherit;
        cursor: pointer;
      }

      .language-banner__switch {
        background: #fff;
        color: #10263f;
        border-color: #fff;
        font-weight: 600;
      }

      .language-banner__dismiss {
        background: transparent;
        color: #fff;
      }

      @media (max-width: 480px) {
        .language-banner {
          font-size: 0.875rem;
        }
      }
    `
  ]
})
export class LanguageBannerComponent {
  private readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly dismissed = signal(!isPlatformBrowser(this.platformId) || this.i18n.hasChosenLanguage());

  protected readonly directionFor = directionFor;

  protected readonly suggested = computed<AppLanguage | null>(() => {
    if (this.dismissed()) {
      return null;
    }

    const preferred = this.i18n.browserLanguage();

    return preferred && preferred !== this.i18n.language() ? preferred : null;
  });

  protected text(language: AppLanguage): BannerText {
    return BANNER_TEXT[language];
  }

  protected accept(language: AppLanguage): void {
    this.dismissed.set(true);
    this.i18n.switchLanguage(language);
  }

  protected dismiss(): void {
    this.dismissed.set(true);
    this.i18n.persistChoice(this.i18n.language());
  }
}
