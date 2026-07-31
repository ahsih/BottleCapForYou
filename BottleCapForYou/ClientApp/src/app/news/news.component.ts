import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import {
  DomSanitizer,
  Meta,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { AppLanguage } from '../i18n/translations';

type NewsPost = {
  date: string;
  title: Record<AppLanguage, string>;
  summary: Record<AppLanguage, string>;
  videoUrl: string;
  embedUrl?: string;
  isPortrait?: boolean;
  source: 'facebook' | 'youtube';
};

type NewsVideoCard = {
  date: string;
  title: string;
  summary: string;
  videoUrl: SafeResourceUrl;
  source: 'facebook' | 'youtube';
  sourceUrl: string;
  isPortrait: boolean;
};

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  private readonly siteUrl = 'https://www.bottlecapforyou.com';
  private readonly defaultShareImage = `${this.siteUrl}/logo.png`;
  private readonly i18n = inject(I18nService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly facebookPageUrl =
    'https://www.facebook.com/profile.php?id=61586840468520';
  readonly contact = {
    phones: ['+86 15816427686'],
    email: 'jack.zhang@bottlecapforyou.com',
    whatsapp: '+86 15816427686',
  };
  readonly language = this.i18n.language;
  readonly content = this.i18n.content;
  readonly posts = computed<NewsVideoCard[]>(() =>
    this.newsPosts.map((post) => ({
      date: post.date,
      title: post.title[this.language()],
      summary: post.summary[this.language()],
      videoUrl: this.toEmbedUrl(post),
      source: post.source,
      sourceUrl: post.videoUrl,
      isPortrait: post.isPortrait ?? false,
    })),
  );

  private readonly newsPosts: NewsPost[] = [
    {
      date: 'July 2026',
      title: {
        en: 'New Facebook factory reel',
        'zh-CN': 'New Facebook factory reel',
        ar: 'New Facebook factory reel',
      },
      summary: {
        en: 'A new Facebook reel update with recent factory footage and bottle cap production activity for buyers reviewing current supply.',
        'zh-CN':
          'A new Facebook reel update with recent factory footage and bottle cap production activity for buyers reviewing current supply.',
        ar: 'A new Facebook reel update with recent factory footage and bottle cap production activity for buyers reviewing current supply.',
      },
      videoUrl: 'https://www.facebook.com/reel/1337281157942157/',
      embedUrl:
        'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1337281157942157%2F&show_text=false&width=267&t=0',
      isPortrait: true,
      source: 'facebook',
    },
    {
      date: 'June 2026',
      title: {
        en: 'Latest Facebook reel update',
        'zh-CN': 'Latest Facebook reel update',
        ar: 'Latest Facebook reel update',
      },
      summary: {
        en: 'A new Facebook reel update with recent factory activity and bottle cap production footage for buyers reviewing current supply.',
        'zh-CN':
          'A new Facebook reel update with recent factory activity and bottle cap production footage for buyers reviewing current supply.',
        ar: 'A new Facebook reel update with recent factory activity and bottle cap production footage for buyers reviewing current supply.',
      },
      videoUrl: 'https://www.facebook.com/reel/2445866769267547/',
      embedUrl:
        'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2445866769267547%2F&show_text=false&width=560&t=0',
      source: 'facebook',
    },
    {
      date: 'June 2026',
      title: {
        en: 'Latest Facebook factory video update',
        'zh-CN': 'Latest Facebook factory video update',
        ar: 'Latest Facebook factory video update',
      },
      summary: {
        en: 'A new Facebook video update for buyers reviewing current bottle cap production, factory activity and supply readiness.',
        'zh-CN':
          'A new Facebook video update for buyers reviewing current bottle cap production, factory activity and supply readiness.',
        ar: 'A new Facebook video update for buyers reviewing current bottle cap production, factory activity and supply readiness.',
      },
      videoUrl: 'https://www.facebook.com/reel/2469506123501826/',
      embedUrl:
        'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2469506123501826%2F&show_text=false&width=560&t=0',
      source: 'facebook',
    },
    {
      date: 'May 2026',
      title: {
        en: 'New bottle cap factory Facebook reel',
        'zh-CN': 'New bottle cap factory Facebook reel',
        ar: 'New bottle cap factory Facebook reel',
      },
      summary: {
        en: 'A new Facebook reel update showing recent factory activity and bottle cap production for buyers reviewing current supply.',
        'zh-CN':
          'A new Facebook reel update showing recent factory activity and bottle cap production for buyers reviewing current supply.',
        ar: 'A new Facebook reel update showing recent factory activity and bottle cap production for buyers reviewing current supply.',
      },
      videoUrl: 'https://www.facebook.com/reel/1331111505584543/',
      embedUrl:
        'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1331111505584543%2F&show_text=false&width=267&t=0',
      isPortrait: true,
      source: 'facebook',
    },
    {
      date: 'May 2026',
      title: {
        en: 'Bottle cap factory Facebook reel',
        'zh-CN': 'Bottle cap factory Facebook reel',
        ar: 'Bottle cap factory Facebook reel',
      },
      summary: {
        en: 'A new short-form factory update shared on Facebook for buyers following current bottle cap production activity.',
        'zh-CN':
          'A new short-form factory update shared on Facebook for buyers following current bottle cap production activity.',
        ar: 'A new short-form factory update shared on Facebook for buyers following current bottle cap production activity.',
      },
      videoUrl: 'https://www.facebook.com/reel/2067963057490543/',
      embedUrl:
        'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2067963057490543%2F&show_text=false&width=267&t=0',
      isPortrait: true,
      source: 'facebook',
    },
    {
      date: 'May 2026',
      title: {
        en: 'Bottle cap production video update',
        'zh-CN': 'Bottle cap production video update',
        ar: 'Bottle cap production video update',
      },
      summary: {
        en: 'A closer look at current bottle cap production and factory output for wholesale and export supply.',
        'zh-CN':
          'A closer look at current bottle cap production and factory output for wholesale and export supply.',
        ar: 'A closer look at current bottle cap production and factory output for wholesale and export supply.',
      },
      videoUrl: 'https://www.youtube.com/watch?v=ufULI2MLBdI',
      source: 'youtube',
    },
    {
      date: 'April 2026',
      title: {
        en: 'Bottle cap line and packing update',
        'zh-CN': 'Bottle cap line and packing update',
        ar: 'Bottle cap line and packing update',
      },
      summary: {
        en: 'This update highlights production flow, packing readiness and the type of factory footage buyers often ask to review.',
        'zh-CN':
          'This update highlights production flow, packing readiness and the type of factory footage buyers often ask to review.',
        ar: 'This update highlights production flow, packing readiness and the type of factory footage buyers often ask to review.',
      },
      videoUrl: 'https://www.youtube.com/watch?v=MB_rIKS3rI8',
      source: 'youtube',
    },
    {
      date: 'April 2026',
      title: {
        en: 'Factory showcase video for international buyers',
        'zh-CN': 'Factory showcase video for international buyers',
        ar: 'Factory showcase video for international buyers',
      },
      summary: {
        en: 'A video snapshot of the factory environment and product handling process for buyers comparing manufacturers.',
        'zh-CN':
          'A video snapshot of the factory environment and product handling process for buyers comparing manufacturers.',
        ar: 'A video snapshot of the factory environment and product handling process for buyers comparing manufacturers.',
      },
      videoUrl: 'https://www.youtube.com/watch?v=lYfYZgAZP1Y',
      source: 'youtube',
    },
    {
      date: 'April 2026',
      title: {
        en: 'Latest bottle cap operations video',
        'zh-CN': 'Latest bottle cap operations video',
        ar: 'Latest bottle cap operations video',
      },
      summary: {
        en: 'The latest video rounds out the update section with additional factory footage, production detail and export-oriented presentation.',
        'zh-CN':
          'The latest video rounds out the update section with additional factory footage, production detail and export-oriented presentation.',
        ar: 'The latest video rounds out the update section with additional factory footage, production detail and export-oriented presentation.',
      },
      videoUrl: 'https://www.youtube.com/watch?v=ELjbJtqVRgA',
      source: 'youtube',
    },
  ];

  constructor() {
    effect(() => {
      this.updateSeo(this.language());
    });
  }

  setLanguage(language: AppLanguage): void {
    this.i18n.setLanguage(language);
  }

  pageTitle(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'News and Updates';
      case 'ar':
        return 'News and Updates';
      default:
        return 'News and Updates';
    }
  }

  pageIntro(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'Browse the latest page updates about bottle cap production, export supply and factory capabilities.';
      case 'ar':
        return 'Browse the latest page updates about bottle cap production, export supply and factory capabilities.';
      default:
        return 'Browse the latest page updates about bottle cap production, export supply and factory capabilities.';
    }
  }

  facebookPageLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'Follow on Facebook';
      case 'ar':
        return 'Follow on Facebook';
      default:
        return 'Follow on Facebook';
    }
  }

  pageNote(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'Reach out directly for pricing, OEM requests, export supply and wholesale enquiries.';
      case 'ar':
        return 'Reach out directly for pricing, OEM requests, export supply and wholesale enquiries.';
      default:
        return 'Reach out directly for pricing, OEM requests, export supply and wholesale enquiries.';
    }
  }

  contactCta(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'Contact Our Sales Team';
      case 'ar':
        return 'Contact Our Sales Team';
      default:
        return 'Contact Our Sales Team';
    }
  }

  contactIntro(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'Phone, WhatsApp and email are the fastest ways to discuss bottle cap orders, packaging details and shipment plans.';
      case 'ar':
        return 'Phone, WhatsApp and email are the fastest ways to discuss bottle cap orders, packaging details and shipment plans.';
      default:
        return 'Phone, WhatsApp and email are the fastest ways to discuss bottle cap orders, packaging details and shipment plans.';
    }
  }

  phoneLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'Phone';
      case 'ar':
        return 'Phone';
      default:
        return 'Phone';
    }
  }

  whatsappLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'WhatsApp';
      case 'ar':
        return 'WhatsApp';
      default:
        return 'WhatsApp';
    }
  }

  emailLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'Email';
      case 'ar':
        return 'Email';
      default:
        return 'Email';
    }
  }

  phoneHref(phone: string): string {
    return `tel:${phone.replace(/\s+/g, '')}`;
  }

  emailHref(email: string): string {
    return `mailto:${email}`;
  }

  whatsappHref(phone: string): string {
    const normalized = phone.replace(/[^\d+]/g, '').replace('+', '');
    return `https://wa.me/${normalized}`;
  }

  private toEmbedUrl(post: NewsPost): SafeResourceUrl {
    if (post.embedUrl) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(post.embedUrl);
    }

    const videoId = this.extractVideoId(post.videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`,
    );
  }

  private extractVideoId(videoUrl: string): string {
    const url = new URL(videoUrl);
    return url.searchParams.get('v') ?? '';
  }

  private updateSeo(language: AppLanguage): void {
    let title = 'Bottle Cap Factory News and Production Updates | Bottle Cap For You';
    let description =
      'Watch recent bottle cap factory videos, production updates and export supply news from HuiZhou DingYuan Gaiye Plastic Co., Ltd.';
    let locale = 'en_GB';
    let inLanguage = 'en';

    if (language === 'zh-CN') {
      locale = 'zh_CN';
      inLanguage = 'zh-CN';
    } else if (language === 'ar') {
      locale = 'ar';
      inLanguage = 'ar';
    }

    const canonicalUrl = `${this.siteUrl}/news`;

    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'robots',
      content: 'index,follow,max-image-preview:large',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: this.defaultShareImage });
    this.meta.updateTag({ property: 'og:site_name', content: 'Bottle Cap For You' });
    this.meta.updateTag({ property: 'og:locale', content: locale });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: this.defaultShareImage });

    let canonicalLink = this.document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    this.document.getElementById('manufacturer-schema')?.remove();

    let schemaScript = this.document.getElementById('news-schema');
    if (!schemaScript) {
      schemaScript = this.document.createElement('script');
      schemaScript.setAttribute('id', 'news-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${this.siteUrl}/#website`,
        url: `${this.siteUrl}/`,
        name: 'Bottle Cap For You',
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: this.newsPosts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: post.videoUrl,
          name: post.title[language],
          description: post.summary[language],
        })),
      },
    });
  }
}
