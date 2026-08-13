import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { AppLanguage } from '../i18n/translations';

type ProductCategory = 'all' | 'one-time' | 'reusable' | 'liner' | 'two-color';

type ProductSpec = {
  label: string;
  value: string;
};

type ProductListItem = {
  id: number;
  folder: string;
  order: number;
  imageCount: number;
  imageExtension: 'jpg' | 'webp';
  title: string;
  summary: string;
  category: Exclude<ProductCategory, 'all'>;
  tags: string[];
  specs: ProductSpec[];
};

type ProductFilter = {
  id: ProductCategory;
  label: string;
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly siteUrl = 'https://www.bottlecapforyou.com';
  private readonly primaryPhone = '+86 15816427686';

  readonly products: ProductListItem[] = [
    {
      id: 11,
      order: 1,
      folder: '12',
      imageCount: 2,
      imageExtension: 'webp',
      title: '8.2g blue two-piece bottle cap set with liner sealing pad',
      summary:
        'Detailed one-time use cap set with waterproof liner options for export orders.',
      category: 'liner',
      tags: ['8.2g', 'Liner', 'One-time use'],
      specs: [
        { label: 'Weight', value: '8 g' },
        { label: 'Height', value: '35.5 mm' },
        { label: 'Liner', value: '1.5 mm' },
      ],
    },
    {
      id: 13,
      order: 3,
      folder: '13',
      imageCount: 4,
      imageExtension: 'webp',
      title: '10.2g large two-color 5 gallon bottle cap',
      summary:
        'Two-color one-time use cap for buyers needing a heavier 5 gallon bottle cap style.',
      category: 'two-color',
      tags: ['10.2g', 'Two-color', 'One-time use'],
      specs: [
        { label: 'Weight', value: '8.2 g' },
        { label: 'Height', value: '36.2 mm' },
      ],
    },
    {
      id: 14,
      order: 4,
      folder: '14',
      imageCount: 7,
      imageExtension: 'webp',
      title: '8g blue two-piece reusable cap set with sealing pad',
      summary:
        'Reusable two-piece cap set with sealing pad for water bottle supply programmes.',
      category: 'reusable',
      tags: ['8g', 'Reusable', 'Liner'],
      specs: [
        { label: 'Weight', value: '10.2 g' },
        { label: 'Height', value: '37.5 mm' },
        { label: 'Liner', value: '1.5 mm' },
      ],
    },
    {
      id: 15,
      order: 5,
      folder: '15',
      imageCount: 5,
      imageExtension: 'webp',
      title: '10.2g blue two-color reusable inner cover cap',
      summary:
        'Reusable two-color inner cover option with inner plug for 5 gallon water bottles.',
      category: 'reusable',
      tags: ['10.2g', 'Reusable', 'Inner plug'],
      specs: [
        { label: 'Weight', value: '10.2 g' },
        { label: 'Height', value: '37.5 mm' },
      ],
    },
    {
      id: 1,
      folder: '1',
      order: 6,
      imageCount: 8,
      imageExtension: 'webp',
      title: '10.2g one time use 5 gallon water bottle cap',
      summary:
        'A one-time use cap option for standard 5 gallon water bottles and factory supply.',
      category: 'one-time',
      tags: ['One-time use'],
      specs: [
        { label: 'Use', value: 'One-time' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
    {
      id: 2,
      folder: '2',
      order: 7,
      imageCount: 10,
      imageExtension: 'webp',
      title: 'one time use 5 gallon water bottle cap assortment',
      summary:
        'Color options for wholesale buyers who need visible cap branding or line separation.',
      category: 'one-time',
      tags: ['One-time use'],
      specs: [
        { label: 'Use', value: 'One-time' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
    {
      id: 5,
      order: 8,
      folder: '5',
      imageCount: 10,
      imageExtension: 'webp',
      title: 'One-time use bottle cap',
      summary: 'One time use cap with a slide to open',
      category: 'one-time',
      tags: ['One-time use'],
      specs: [
        { label: 'Use', value: 'One-time' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
    {
      id: 6,
      order: 9,
      folder: '6',
      imageCount: 9,
      imageExtension: 'webp',
      title: 'One-time use 5 gallon bottle cap with pull detail',
      summary:
        'Reusable cap format for customers who need repeat handling and stable bulk supply.',
      category: 'one-time',
      tags: ['One-time use', 'Pull detail', 'Bulk'],
      specs: [
        { label: 'Use', value: 'One-time' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
    {
      id: 7,
      order: 10,
      folder: '7',
      imageCount: 7,
      imageExtension: 'webp',
      title: 'Blue reusable water bottle cap option',
      summary:
        'Blue cap style for standard water bottle applications and distributor supply.',
      category: 'reusable',
      tags: ['Reusable', 'Blue', 'Distributor'],
      specs: [
        { label: 'Use', value: 'Reusable' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
    {
      id: 8,
      order: 11,
      folder: '8',
      imageCount: 8,
      imageExtension: 'webp',
      title: 'Reusable blue 5 gallon cap color options',
      summary: 'Reusable bottle cap with white liner for leak proof',
      category: 'two-color',
      tags: ['Two-color', 'Private label', 'OEM'],
      specs: [
        { label: 'Use', value: 'Reusable' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
    {
      id: 9,
      order: 12,
      folder: '9',
      imageCount: 6,
      imageExtension: 'webp',
      title: 'Orange bottle cap sealing leak proof',
      summary:
        'Reusable orange cap with sealing liner for leak proof and water bottle supply.',
      category: 'liner',
      tags: ['Liner', 'Sealing', 'Component'],
      specs: [
        { label: 'Use', value: 'Reusable' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
    {
      id: 10,
      order: 13,
      folder: '10',
      imageCount: 8,
      imageExtension: 'webp',
      title: 'Custom 5 gallon water bottle cap colour',
      summary: 'Contact us for the colour you wish to order',
      category: 'reusable',
      tags: ['Custom'],
      specs: [
        { label: 'Use', value: 'One-time' },
        { label: 'Use', value: 'Reusable' },
        { label: 'Bottle', value: '5 gallon' },
      ],
    },
  ];

  readonly filters: ProductFilter[] = [
    { id: 'all', label: 'All bottle caps' },
    { id: 'one-time', label: 'One-time use' },
    { id: 'reusable', label: 'Reusable' },
    { id: 'liner', label: 'With liner' },
    { id: 'two-color', label: 'Two-color' },
  ];

  selectedCategory: ProductCategory = 'all';
  selectedProductId: number | null = null;
  searchTerm = '';
  activeImageNumbers: Record<number, number> = this.products.reduce<
    Record<number, number>
  >((accumulator, product) => {
    accumulator[product.id] = 1;
    return accumulator;
  }, {});
  zoomedProductIds: Record<number, boolean> = {};

  protected readonly i18n = inject(I18nService);
  protected readonly language = this.i18n.language;
  protected readonly content = this.i18n.content;
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this.updateSeo(this.language());
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const productId = Number(params.get('product'));
      this.selectedProductId = Number.isFinite(productId) ? productId : null;
    });
  }

  textDirection(): 'ltr' | 'rtl' {
    return this.language() === 'ar' ? 'rtl' : 'ltr';
  }

  setLanguage(language: AppLanguage): void {
    this.i18n.setLanguage(language);
  }

  get filteredProducts(): ProductListItem[] {
    const normalizedSearch = this.searchTerm.trim().toLowerCase();

    return this.products
      .filter((product) => {
        return (
          this.selectedCategory === 'all' ||
          product.category === this.selectedCategory
        );
      })
      .filter((product) => {
        if (!normalizedSearch) {
          return true;
        }

        const searchable = [
          product.title,
          product.summary,
          product.category,
          ...product.tags,
          ...product.specs.flatMap((spec) => [spec.label, spec.value]),
        ]
          .join(' ')
          .toLowerCase();

        return searchable.includes(normalizedSearch);
      })
      .sort((first, second) => {
        if (first.id === this.selectedProductId) {
          return -1;
        }

        if (second.id === this.selectedProductId) {
          return 1;
        }

        return first.order - second.order || first.id - second.id;
      });
  }

  filterProducts(category: ProductCategory): void {
    this.selectedCategory = category;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
  }

  productImagePath(product: ProductListItem, imageNumber?: number): string {
    const selectedImageNumber =
      imageNumber ?? this.activeImageNumbers[product.id] ?? 1;
    return `Products/${product.folder}/${selectedImageNumber}.${product.imageExtension}`;
  }

  productThumbnails(product: ProductListItem): number[] {
    const thumbnailCount = Math.min(product.imageCount, 4);
    const activeImage = this.activeImageNumbers[product.id] ?? 1;
    const maxStart = Math.max(1, product.imageCount - thumbnailCount + 1);
    const startImage = Math.min(
      Math.max(1, activeImage - Math.floor(thumbnailCount / 2)),
      maxStart,
    );

    return Array.from(
      { length: thumbnailCount },
      (_, index) => startImage + index,
    );
  }

  setProductImage(product: ProductListItem, imageNumber: number): void {
    this.activeImageNumbers[product.id] = imageNumber;
    this.zoomedProductIds[product.id] = false;
  }

  previousProductImage(product: ProductListItem): void {
    const currentImageNumber = this.activeImageNumbers[product.id] ?? 1;
    this.activeImageNumbers[product.id] =
      currentImageNumber <= 1 ? product.imageCount : currentImageNumber - 1;
    this.zoomedProductIds[product.id] = false;
  }

  nextProductImage(product: ProductListItem): void {
    const currentImageNumber = this.activeImageNumbers[product.id] ?? 1;
    this.activeImageNumbers[product.id] =
      currentImageNumber >= product.imageCount ? 1 : currentImageNumber + 1;
    this.zoomedProductIds[product.id] = false;
  }

  toggleProductImageZoom(product: ProductListItem): void {
    this.zoomedProductIds[product.id] = !this.zoomedProductIds[product.id];
  }

  productImagePosition(product: ProductListItem): string {
    return `${this.activeImageNumbers[product.id] ?? 1} / ${product.imageCount}`;
  }

  isSelectedProduct(product: ProductListItem): boolean {
    return product.id === this.selectedProductId;
  }

  productCountText(): string {
    const count = this.filteredProducts.length;
    return count === 1 ? '1 bottle cap' : `${count} bottle caps`;
  }

  whatsappHref(product?: ProductListItem): string {
    const message = product
      ? `Hello, I would like a quote for ${product.title}.`
      : 'Hello, I would like to ask about your 5 gallon bottle caps.';
    return `https://wa.me/${this.primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  }

  private updateSeo(language: AppLanguage): void {
    const title = 'Bottle Cap Products | 5 Gallon Water Bottle Cap Catalogue';
    const description =
      'Browse 5 gallon water bottle caps, reusable caps, one-time use caps, sealing liners and two-color cap options from HuiZhou DingYuan Gaiye Plastic Co., Ltd.';
    const canonicalUrl = `${this.siteUrl}/products`;
    const inLanguage =
      language === 'zh-CN' ? 'zh-CN' : language === 'ar' ? 'ar' : 'en';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'bottle cap products, 5 gallon bottle cap catalogue, reusable bottle cap, one-time use bottle cap, sealing liner bottle cap, plastic bottle cap supplier',
    });
    this.meta.updateTag({
      name: 'robots',
      content: 'index,follow,max-image-preview:large',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({
      property: 'og:image',
      content: `${this.siteUrl}/Products/12/1.webp`,
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Bottle Cap For You',
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `${this.siteUrl}/Products/12/1.webp`,
    });

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
    this.document.getElementById('news-schema')?.remove();

    let schemaScript = this.document.getElementById('product-list-schema');
    if (!schemaScript) {
      schemaScript = this.document.createElement('script');
      schemaScript.setAttribute('id', 'product-list-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: title,
      url: canonicalUrl,
      inLanguage,
      itemListElement: this.products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title,
          description: product.summary,
          image: `${this.siteUrl}/${this.productImagePath(product, 1)}`,
          category: '5 gallon water bottle cap',
          brand: {
            '@type': 'Brand',
            name: 'Bottle Cap For You',
          },
        },
      })),
    });
  }
}
