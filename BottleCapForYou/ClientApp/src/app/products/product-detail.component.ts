import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { SeoLinksService } from '../core/seo-links.service';
import { PageKey, SITE_URL, localizedRoute, productRoute } from '../core/locale';
import { AppLanguage } from '../i18n/translations';
import {
  CATEGORY_LABEL,
  PRODUCTS,
  ProductListItem,
  productBySlug,
  translateProductText
} from './products.data';

type DetailText = {
  breadcrumbHome: string;
  breadcrumbProducts: string;
  specifications: string;
  features: string;
  relatedProducts: string;
  enquire: string;
  whatsapp: string;
  backToCatalogue: string;
  notFound: string;
  notFoundText: string;
  imageOf: string;
};

const detailText: Record<AppLanguage, DetailText> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbProducts: 'Products',
    specifications: 'Specifications',
    features: 'Features',
    relatedProducts: 'Related products',
    enquire: 'Request a quote',
    whatsapp: 'WhatsApp enquiry',
    backToCatalogue: 'Back to all products',
    notFound: 'Product not found',
    notFoundText: 'This product may have been renamed or withdrawn.',
    imageOf: 'Photo of'
  },
  'zh-CN': {
    breadcrumbHome: '首页',
    breadcrumbProducts: '产品',
    specifications: '规格参数',
    features: '产品特点',
    relatedProducts: '相关产品',
    enquire: '索取报价',
    whatsapp: 'WhatsApp 咨询',
    backToCatalogue: '返回全部产品',
    notFound: '未找到该产品',
    notFoundText: '该产品可能已更名或下架。',
    imageOf: '产品图片：'
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbProducts: 'المنتجات',
    specifications: 'المواصفات',
    features: 'المميزات',
    relatedProducts: 'منتجات ذات صلة',
    enquire: 'اطلب عرض سعر',
    whatsapp: 'استفسار عبر واتساب',
    backToCatalogue: 'العودة إلى كل المنتجات',
    notFound: 'المنتج غير موجود',
    notFoundText: 'ربما تم تغيير اسم هذا المنتج أو سحبه.',
    imageOf: 'صورة لـ'
  }
};

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly i18n = inject(I18nService);
  private readonly seoLinks = inject(SeoLinksService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private readonly whatsappNumber = '8615816427686';

  protected readonly language = this.i18n.language;
  protected readonly content = this.i18n.content;
  protected readonly textDirection = this.i18n.direction;

  /**
   * Read from the snapshot rather than the param stream: the slug is fixed for
   * the lifetime of the component because each product is its own route.
   */
  protected readonly product = computed<ProductListItem | undefined>(() =>
    productBySlug(this.route.snapshot.params['slug'] ?? '')
  );

  protected readonly images = computed<string[]>(() => {
    const product = this.product();
    if (!product) {
      return [];
    }

    if (product.imagePaths?.length) {
      return product.imagePaths;
    }

    return Array.from(
      { length: product.imageCount },
      (_, index) => `Products/${product.folder}/${index + 1}.${product.imageExtension}`
    );
  });

  /** Up to three other products in the same category. */
  protected readonly related = computed<ProductListItem[]>(() => {
    const product = this.product();
    if (!product) {
      return [];
    }

    return PRODUCTS.filter(
      (candidate) => candidate.category === product.category && candidate.id !== product.id
    ).slice(0, 3);
  });

  constructor() {
    effect(() => {
      this.updateSeo(this.language());
    });
  }

  protected text(key: keyof DetailText): string {
    return detailText[this.language()][key];
  }

  protected productText(text?: string): string {
    return translateProductText(text, this.language());
  }

  protected localePath(page: PageKey): string {
    return localizedRoute(this.language(), page);
  }

  protected homeAnchor(fragment: string): string {
    const home = localizedRoute(this.language(), 'home');
    return home === '/' ? `/#${fragment}` : `${home}#${fragment}`;
  }

  protected setLanguage(language: AppLanguage): void {
    this.i18n.switchLanguage(language);
  }

  protected productPath(slug: string): string {
    return productRoute(this.language(), slug);
  }

  protected imageUrl(path: string): string {
    return `${SITE_URL}/${path}`;
  }

  protected whatsappLink(): string {
    const product = this.product();
    const message = product ? `${this.text('enquire')}: ${this.productText(product.title)}` : '';

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  private updateSeo(language: AppLanguage): void {
    const product = this.product();

    if (!product) {
      this.title.setTitle(this.text('notFound'));
      this.meta.updateTag({ name: 'robots', content: 'noindex,follow' });
      this.document.getElementById('product-schema')?.remove();
      return;
    }

    const name = translateProductText(product.title, language);
    const description = translateProductText(product.summary, language);
    const canonicalUrl = this.seoLinks.applyProduct(language, product.slug);
    const images = this.images().map((path) => this.imageUrl(path));

    this.title.setTitle(`${name} | Bottle Cap For You`);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large' });
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({ property: 'og:title', content: name });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'Bottle Cap For You' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: name });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    if (images.length) {
      this.meta.updateTag({ property: 'og:image', content: images[0] });
      this.meta.updateTag({ name: 'twitter:image', content: images[0] });
    }

    this.writeProductSchema(product, name, description, canonicalUrl, images, language);
  }

  /**
   * Product JSON-LD without `offers`: the catalogue carries no price, and a
   * fabricated or empty offer is worse than none. This is valid Product schema
   * that Merchant feeds and Dynamic Search Ads can read, but it is not eligible
   * for Google's product rich results until real pricing is added here.
   */
  private writeProductSchema(
    product: ProductListItem,
    name: string,
    description: string,
    canonicalUrl: string,
    images: string[],
    language: AppLanguage
  ): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name,
      description,
      sku: product.slug,
      image: images,
      url: canonicalUrl,
      inLanguage: language,
      category: translateProductText(CATEGORY_LABEL[product.category], language),
      brand: {
        '@type': 'Brand',
        name: 'Bottle Cap For You'
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
        url: `${SITE_URL}/`
      },
      additionalProperty: product.specs.map((spec) => ({
        '@type': 'PropertyValue',
        name: translateProductText(spec.label, language),
        value: translateProductText(spec.value, language)
      }))
    };

    this.document.getElementById('product-schema')?.remove();

    const script = this.document.createElement('script');
    script.id = 'product-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
