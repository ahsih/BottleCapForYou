import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
} from '@angular/core';
import { AppLanguage } from '../i18n/translations';
import { CONTACT_EMAIL, CONTACT_PHONE, whatsappUrl } from './contact-details';
import { I18nService } from './i18n.service';
import { directionFor } from './locale';

type BarText = {
  whatsapp: string;
  email: string;
  call: string;
};

const BAR_TEXT: Record<AppLanguage, BarText> = {
  en: { whatsapp: 'WhatsApp Us', email: 'Email', call: 'Call' },
  'zh-CN': { whatsapp: 'WhatsApp 咨询', email: '邮件', call: '致电' },
  ar: { whatsapp: 'واتساب', email: 'إيميل', call: 'اتصل' },
};

/**
 * A contact route that is always on screen.
 *
 * The enquiry form sits at the very bottom of a page roughly 13,000px tall, so
 * on a phone it is about eleven screens below the fold and almost nobody
 * reaches it. Once the hero buttons scroll away there was previously no way to
 * make contact at all. This bar keeps WhatsApp, email and phone one tap away
 * for the whole visit, on every page.
 */
@Component({
  selector: 'app-contact-bar',
  standalone: true,
  template: `
    <nav
      class="contact-bar"
      [attr.dir]="direction()"
      [attr.lang]="language()"
      aria-label="Contact the factory"
    >
      <a
        class="contact-bar__action contact-bar__action--whatsapp"
        [href]="whatsappHref()"
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.55 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.9L0 24l6.46-1.69a11.8 11.8 0 0 0 5.61 1.43h.01c6.52 0 11.83-5.3 11.83-11.82 0-3.16-1.23-6.13-3.39-8.44ZM12.08 21.7h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.83 1 1.02-3.73-.24-.38a9.78 9.78 0 0 1-1.51-5.19c0-5.42 4.42-9.83 9.85-9.83 2.63 0 5.1 1.02 6.95 2.88a9.77 9.77 0 0 1 2.88 6.95c0 5.42-4.42 9.84-9.84 9.84Zm5.39-7.34c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.15-.19.29-.76.94-.93 1.14-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.51h-.56c-.19 0-.5.07-.75.36-.25.29-.96.94-.96 2.29s.98 2.64 1.12 2.83c.15.19 1.92 2.93 4.66 4.11.65.28 1.16.44 1.56.56.65.21 1.24.18 1.71.11.52-.08 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.38-.07-.12-.27-.19-.56-.34Z"
          />
        </svg>
        <span>{{ text().whatsapp }}</span>
      </a>

      <a class="contact-bar__action" [href]="emailHref">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 4.76-8-4.76V6l8 4.75L20 6v2.24Z"
          />
        </svg>
        <span>{{ text().email }}</span>
      </a>

      <a class="contact-bar__action" [href]="phoneHref">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.93 21 3 13.07 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"
          />
        </svg>
        <span>{{ text().call }}</span>
      </a>
    </nav>
  `,
  styles: [
    `
      .contact-bar {
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        /* Below the language banner (1000) so the banner is never obscured;
           the banner lifts itself above this bar using --contact-bar-height. */
        z-index: 900;
        display: flex;
        align-items: stretch;
        gap: 1px;
        background: #0b2033;
        box-shadow: 0 -2px 14px rgba(0, 0, 0, 0.3);
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }

      .contact-bar__action {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        /* Comfortably past the 44px minimum touch target. */
        min-height: 56px;
        padding: 0.5rem 0.75rem;
        background: #10263f;
        color: #fff;
        font-size: 0.95rem;
        font-weight: 700;
        text-decoration: none;
        white-space: nowrap;
      }

      .contact-bar__action--whatsapp {
        background: #25d366;
        color: #06301a;
      }

      .contact-bar__action svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
        flex: none;
      }

      .contact-bar__action:focus-visible {
        outline: 3px solid #ffc53d;
        outline-offset: -3px;
      }

      @media (min-width: 761px) {
        /* On a wide screen the bar does not need the full width, and a compact
           group leaves the page itself unobstructed. */
        .contact-bar {
          inset-inline: auto;
          inset-inline-end: 24px;
          bottom: 24px;
          gap: 8px;
          border-radius: 999px;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
        }

        .contact-bar__action {
          min-height: 48px;
          border-radius: 999px;
          padding: 0.5rem 1.25rem;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
        }
      }
    `,
  ],
})
export class ContactBarComponent implements OnInit, OnDestroy {
  private readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);

  /** Height reserved at the foot of the page so the bar never hides content. */
  private readonly barHeightVariable = '--contact-bar-height';

  protected readonly language = this.i18n.language;
  protected readonly direction = computed(() => directionFor(this.language()));
  protected readonly text = computed<BarText>(() => BAR_TEXT[this.language()]);
  protected readonly emailHref = `mailto:${CONTACT_EMAIL}`;
  protected readonly phoneHref = `tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`;

  protected whatsappHref(): string {
    return whatsappUrl(CONTACT_PHONE, this.language());
  }

  ngOnInit(): void {
    this.setBarHeight('64px');
  }

  ngOnDestroy(): void {
    this.setBarHeight('0px');
  }

  private setBarHeight(value: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.documentElement.style.setProperty(this.barHeightVariable, value);
  }
}
