import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
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
  source: 'facebook' | 'youtube';
};

type NewsVideoCard = {
  date: string;
  title: string;
  summary: string;
  videoUrl: SafeResourceUrl;
  source: 'facebook' | 'youtube';
  sourceUrl: string;
};

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  private readonly i18n = inject(I18nService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly contact = {
    phones: ['+44 7597702688', '+86 18818995568'],
    email: 'jack.zhang@bottlecapforyou.com',
    whatsapp: '+447597702688',
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
    })),
  );

  private readonly newsPosts: NewsPost[] = [
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
      date: 'May 2026',
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
      date: 'May 2026',
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
      date: 'May 2026',
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
}
