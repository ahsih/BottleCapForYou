import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

/** The ways a visitor can start a conversation with the factory. */
export type ContactChannel = 'whatsapp' | 'email' | 'phone' | 'form';

type GoogleTagFunction = (
  command: 'event',
  eventName: string,
  config: Record<string, unknown>,
) => void;

type GoogleTagWindow = Window & {
  gtag?: GoogleTagFunction;
  dataLayer?: unknown[];
};

/**
 * Reports contact attempts to Google Ads.
 *
 * Why this exists separately from AnalyticsService: that service is currently
 * switched off in AppComponent and also needs the /api/analytics backend and a
 * MySQL connection, both of which are disabled. Ads conversion reporting must
 * not depend on any of that - it is the signal the campaign bids on, so it runs
 * on its own with no backend at all.
 *
 * Without this, the only conversion Google Ads ever received was the footer
 * form. Every WhatsApp, email and phone enquiry was invisible to bidding.
 */
@Injectable({ providedIn: 'root' })
export class ConversionTrackingService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * One conversion action covers every channel for now, so reporting works
   * today without any change in the Ads account. To report WhatsApp separately,
   * create a second conversion action in Google Ads and paste its
   * 'AW-xxxxxxxxx/label' value over the matching entry below.
   */
  private readonly conversionLabels: Record<ContactChannel, string> = {
    whatsapp: 'AW-18226061372/F-xUCOO3sNUcELzA7vJD',
    email: 'AW-18226061372/F-xUCOO3sNUcELzA7vJD',
    phone: 'AW-18226061372/F-xUCOO3sNUcELzA7vJD',
    form: 'AW-18226061372/F-xUCOO3sNUcELzA7vJD',
  };

  private readonly dedupeKeyPrefix = 'bcfy_conversion_';
  private started = false;

  /**
   * Listens for contact clicks anywhere in the app. A single capture-phase
   * listener covers the home, products, product detail and news pages at once,
   * including links added later, so no component has to remember to report.
   */
  start(): void {
    if (this.started || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.started = true;
    this.document.addEventListener('click', this.handleClick, true);
  }

  /**
   * Reports one contact attempt. Repeats within the same browser session are
   * dropped: a buyer who taps WhatsApp three times is one lead, and counting
   * them three times would teach Google Ads to bid on restlessness.
   */
  track(channel: ContactChannel): void {
    if (!isPlatformBrowser(this.platformId) || this.alreadyCounted(channel)) {
      return;
    }

    this.markCounted(channel);

    const target = window as unknown as GoogleTagWindow;

    // Google Tag Manager is on the page too, so give it the same event. A GTM
    // trigger can then feed Ads as well, which keeps working if the gtag
    // snippet is ever removed from index.html.
    target.dataLayer = target.dataLayer ?? [];
    target.dataLayer.push({
      event: 'contact_conversion',
      contact_channel: channel,
    });

    if (typeof target.gtag !== 'function') {
      return;
    }

    target.gtag('event', 'conversion', {
      send_to: this.conversionLabels[channel],
      contact_channel: channel,
    });
  }

  private readonly handleClick = (event: MouseEvent): void => {
    const target = event.target instanceof Element ? event.target : null;
    const anchor = target?.closest('a');

    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    const channel = this.channelFor(anchor.getAttribute('href') ?? '');

    if (channel) {
      this.track(channel);
    }
  };

  private channelFor(href: string): ContactChannel | null {
    if (href.startsWith('tel:')) {
      return 'phone';
    }

    if (href.startsWith('mailto:')) {
      return 'email';
    }

    if (href.includes('wa.me') || href.includes('whatsapp')) {
      return 'whatsapp';
    }

    return null;
  }

  private alreadyCounted(channel: ContactChannel): boolean {
    try {
      return sessionStorage.getItem(this.dedupeKeyPrefix + channel) !== null;
    } catch {
      // Private mode or blocked storage: report the conversion rather than
      // lose it. A duplicate is a smaller problem than a missing lead.
      return false;
    }
  }

  private markCounted(channel: ContactChannel): void {
    try {
      sessionStorage.setItem(this.dedupeKeyPrefix + channel, '1');
    } catch {
      // Nothing to do - see alreadyCounted.
    }
  }
}
