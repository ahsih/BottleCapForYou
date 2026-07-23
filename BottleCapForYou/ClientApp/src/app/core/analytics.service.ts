import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type AnalyticsPayload = {
  sessionId: string;
  pageViewId: string;
  path: string;
  title: string;
  landingPath: string;
  referrer: string;
  language: string;
  timeZone: string;
  deviceType: string;
  screenWidth: number;
  screenHeight: number;
  activeSeconds: number;
  totalSeconds: number;
  eventName?: string;
  utm: Record<string, string>;
  metadata?: Record<string, string>;
};

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly sessionStorageKey = 'bcfy_analytics_session_id';
  private readonly endpoint = '/api/analytics/track';
  private readonly heartbeatMs = 20000;

  private started = false;
  private sessionId = '';
  private pageViewId = '';
  private landingPath = '';
  private referrer = '';
  private currentPath = '';
  private activeMs = 0;
  private totalMs = 0;
  private lastTickAt = 0;
  private heartbeatId: number | undefined;
  private utm: Record<string, string> = {};

  start(): void {
    if (this.started || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.started = true;
    this.sessionId = this.getOrCreateSessionId();
    this.landingPath = this.browserPath();
    this.referrer = this.document.referrer;
    this.utm = this.readUtmParameters();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.startPage(event.urlAfterRedirects));

    window.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('pagehide', this.handlePageHide);
    this.document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.document.addEventListener('click', this.handleClick, true);

    this.heartbeatId = window.setInterval(() => {
      this.updateElapsedTime();
      this.send();
    }, this.heartbeatMs);

    queueMicrotask(() => this.startPage(this.browserPath()));
  }

  trackEvent(eventName: string, metadata?: Record<string, string>): void {
    if (!this.started || !this.currentPath) {
      return;
    }

    this.updateElapsedTime();
    this.send(eventName, false, metadata);
  }

  private startPage(path: string): void {
    const normalizedPath = path || '/';
    if (this.currentPath === normalizedPath && this.pageViewId) {
      return;
    }

    if (this.currentPath) {
      this.updateElapsedTime();
      this.send('page_end');
    }

    this.currentPath = normalizedPath;
    this.pageViewId = this.createId();
    this.activeMs = 0;
    this.totalMs = 0;
    this.lastTickAt = performance.now();
    this.send('page_view');
  }

  private readonly handleHashChange = (): void => {
    this.startPage(this.browserPath());
  };

  private readonly handleVisibilityChange = (): void => {
    this.updateElapsedTime();
    if (this.document.hidden) {
      this.send('page_hidden', true);
    } else {
      this.send('page_visible');
    }
  };

  private readonly handlePageHide = (): void => {
    this.updateElapsedTime();
    this.send('page_end', true);
    if (this.heartbeatId !== undefined) {
      window.clearInterval(this.heartbeatId);
    }
  };

  private readonly handleClick = (event: MouseEvent): void => {
    const target = event.target instanceof Element ? event.target : null;
    const anchor = target?.closest('a') as HTMLAnchorElement | null;
    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute('href') ?? '';
    const label = this.cleanText(anchor.textContent ?? '');

    if (href.startsWith('tel:')) {
      this.trackEvent('contact_click', { type: 'phone', label });
      return;
    }

    if (href.startsWith('mailto:')) {
      this.trackEvent('contact_click', { type: 'email', label });
      return;
    }

    if (href.includes('wa.me') || href.includes('whatsapp')) {
      this.trackEvent('contact_click', { type: 'whatsapp', label });
      return;
    }

    if (href === '#contact' && label.toLowerCase().includes('sample')) {
      this.trackEvent('sample_request_click', { label });
    }
  };

  private updateElapsedTime(): void {
    const now = performance.now();
    const previous = this.lastTickAt || now;
    const delta = Math.max(0, now - previous);
    this.totalMs += delta;

    if (!this.document.hidden) {
      this.activeMs += delta;
    }

    this.lastTickAt = now;
  }

  private send(
    eventName = '',
    useBeacon = false,
    metadata?: Record<string, string>,
  ): void {
    if (!this.sessionId || !this.pageViewId || !this.currentPath) {
      return;
    }

    const payload: AnalyticsPayload = {
      sessionId: this.sessionId,
      pageViewId: this.pageViewId,
      path: this.currentPath,
      title: this.document.title,
      landingPath: this.landingPath,
      referrer: this.referrer,
      language: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      deviceType: this.deviceType(),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      activeSeconds: Math.round(this.activeMs / 1000),
      totalSeconds: Math.round(this.totalMs / 1000),
      utm: this.utm,
    };

    if (eventName) {
      payload.eventName = eventName;
    }

    if (metadata) {
      payload.metadata = metadata;
    }

    const body = JSON.stringify(payload);
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(
        this.endpoint,
        new Blob([body], { type: 'application/json' }),
      );
      return;
    }

    void fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: useBeacon,
    }).catch(() => undefined);
  }

  private getOrCreateSessionId(): string {
    try {
      const existing = sessionStorage.getItem(this.sessionStorageKey);
      if (existing) {
        return existing;
      }

      const sessionId = this.createId();
      sessionStorage.setItem(this.sessionStorageKey, sessionId);
      return sessionId;
    } catch {
      return this.createId();
    }
  }

  private readUtmParameters(): Record<string, string> {
    const result: Record<string, string> = {};
    const query = new URLSearchParams(window.location.search);
    for (const key of [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
    ]) {
      const value = query.get(key);
      if (value) {
        result[key] = value;
      }
    }

    return result;
  }

  private browserPath(): string {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }

  private deviceType(): string {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 760) {
      return 'mobile';
    }

    return 'desktop';
  }

  private createId(): string {
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (char) =>
      (
        Number(char) ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(char) / 4)))
      ).toString(16),
    );
  }

  private cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim().slice(0, 120);
  }
}
