import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, OnInit, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { SeoLinksService } from '../core/seo-links.service';
import { PageKey, localizedRoute, productRoute } from '../core/locale';
import { AppLanguage } from '../i18n/translations';
import {
  PRODUCTS,
  ProductCategory,
  ProductListItem,
  ProductSpec,
  translateProductText
} from './products.data';

type ProductFilter = {
  id: ProductCategory;
  label: string;
};

type ProductCatalogText = {
  navigationLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  whatsappQuote: string;
  contactUs: string;
  featuredImagesLabel: string;
  featuredImageAltLiner: string;
  featuredImageAltTwoColor: string;
  featuredImageAltReusable: string;
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  clearFilters: string;
  productFeaturesLabel: string;
  whatsapp: string;
  emptyTitle: string;
  emptyText: string;
  showAllProducts: string;
  askForProductQuote: string;
  previousImageFor: string;
  nextImageFor: string;
  zoomImageFor: string;
  showImage: string;
  thumbnail: string;
};

const productCatalogText: Record<AppLanguage, ProductCatalogText> = {
  en: {
    navigationLabel: 'Product page navigation',
    heroEyebrow: 'Product Catalogue',
    heroTitle: '5 Gallon Water Bottle Caps & Packaging Accessories',
    heroDescription:
      'Browse bottle caps, 5 gallon water bottles, carrying handles, and packaging accessories for distributors, importers, and OEM wholesale buyers.',
    whatsappQuote: 'WhatsApp Quote',
    contactUs: 'Contact Us',
    featuredImagesLabel: 'Featured bottle cap photos',
    featuredImageAltLiner: 'Blue two-piece bottle cap with liner',
    featuredImageAltTwoColor: 'Two-color 5 gallon bottle cap',
    featuredImageAltReusable: 'Reusable bottle cap with sealing pad',
    searchLabel: 'Search products',
    searchPlaceholder: 'Search caps, bottles, handles, accessories...',
    filterLabel: 'Filter products',
    clearFilters: 'Clear filters',
    productFeaturesLabel: 'Product features',
    whatsapp: 'WhatsApp',
    emptyTitle: 'No products found',
    emptyText: 'Try clearing the filter or searching for another product type.',
    showAllProducts: 'Show all products',
    askForProductQuote: 'Ask for product quote',
    previousImageFor: 'Show previous image for',
    nextImageFor: 'Show next image for',
    zoomImageFor: 'Zoom image for',
    showImage: 'Show image',
    thumbnail: 'thumbnail',
  },
  'zh-CN': {
    navigationLabel: '产品页面导航',
    heroEyebrow: '产品目录',
    heroTitle: '5 加仑桶装水瓶盖与包装配件',
    heroDescription:
      '浏览适用于经销商、进口商和 OEM 批发买家的瓶盖、5 加仑水桶、提手和包装配件。',
    whatsappQuote: 'WhatsApp 报价',
    contactUs: '联系我们',
    featuredImagesLabel: '精选瓶盖图片',
    featuredImageAltLiner: '带内衬的蓝色两件式瓶盖',
    featuredImageAltTwoColor: '双色 5 加仑瓶盖',
    featuredImageAltReusable: '带密封垫的可重复使用瓶盖',
    searchLabel: '搜索产品',
    searchPlaceholder: '搜索瓶盖、水桶、提手、配件...',
    filterLabel: '筛选产品',
    clearFilters: '清除筛选',
    productFeaturesLabel: '产品特点',
    whatsapp: 'WhatsApp',
    emptyTitle: '未找到产品',
    emptyText: '请清除筛选条件，或搜索其他产品类型。',
    showAllProducts: '显示全部产品',
    askForProductQuote: '索取产品报价',
    previousImageFor: '显示上一张图片：',
    nextImageFor: '显示下一张图片：',
    zoomImageFor: '放大图片：',
    showImage: '显示图片',
    thumbnail: '缩略图',
  },
  ar: {
    navigationLabel: 'التنقل في صفحة المنتجات',
    heroEyebrow: 'كتالوج المنتجات',
    heroTitle: 'أغطية عبوات مياه 5 جالون وملحقات التعبئة',
    heroDescription:
      'تصفح الأغطية وعبوات المياه سعة 5 جالون ومقابض الحمل وملحقات التعبئة للموزعين والمستوردين ومشتري الجملة OEM.',
    whatsappQuote: 'عرض سعر واتساب',
    contactUs: 'اتصل بنا',
    featuredImagesLabel: 'صور مميزة لأغطية الزجاجات',
    featuredImageAltLiner: 'غطاء زجاجة أزرق من قطعتين مع بطانة',
    featuredImageAltTwoColor: 'غطاء زجاجة 5 جالون بلونين',
    featuredImageAltReusable: 'غطاء قابل لإعادة الاستخدام مع وسادة إحكام',
    searchLabel: 'البحث عن المنتجات',
    searchPlaceholder: 'ابحث عن أغطية أو عبوات أو مقابض أو ملحقات...',
    filterLabel: 'تصفية المنتجات',
    clearFilters: 'مسح التصفية',
    productFeaturesLabel: 'مميزات المنتج',
    whatsapp: 'واتساب',
    emptyTitle: 'لم يتم العثور على منتجات',
    emptyText: 'حاول مسح التصفية أو البحث عن نوع آخر من المنتجات.',
    showAllProducts: 'عرض كل المنتجات',
    askForProductQuote: 'اطلب عرض سعر للمنتج',
    previousImageFor: 'عرض الصورة السابقة لـ',
    nextImageFor: 'عرض الصورة التالية لـ',
    zoomImageFor: 'تكبير صورة',
    showImage: 'عرض الصورة',
    thumbnail: 'صورة مصغرة',
  },
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly siteUrl = 'https://bottlecapforyou.com';
  private readonly primaryPhone = '+86 15816427686';

  readonly products: ProductListItem[] = PRODUCTS;

  readonly filters: ProductFilter[] = [
    { id: 'all', label: 'All products' },
    { id: 'one-time', label: 'One-time use' },
    { id: 'reusable', label: 'Reusable' },
    { id: 'liner', label: 'With liner' },
    { id: 'two-color', label: 'Two-color' },
    { id: 'accessories', label: 'Bottles & accessories' },
  ];

  selectedCategory: ProductCategory = 'all';
  selectedProductId: number | null = null;
  searchTerm = '';
  isMobileMenuOpen = false;
  activeImageNumbers: Record<number, number> = this.products.reduce<
    Record<number, number>
  >((accumulator, product) => {
    accumulator[product.id] = 1;
    return accumulator;
  }, {});
  zoomedProductIds: Record<number, boolean> = {};

  protected readonly i18n = inject(I18nService);

  private readonly seoLinks = inject(SeoLinksService);
  protected readonly language = this.i18n.language;
  protected readonly content = this.i18n.content;
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Language-aware router path for in-site navigation. */
  protected localePath(page: PageKey): string {
    return localizedRoute(this.i18n.language(), page);
  }

  /** Link to a product's own page. */
  protected productPath(slug: string): string {
    return productRoute(this.language(), slug);
  }

  /** Language-aware link to a section anchor on the home page, e.g. '/zh#contact'. */
  protected homeAnchor(fragment: string): string {
    const home = localizedRoute(this.i18n.language(), 'home');
    return home === '/' ? `/#${fragment}` : `${home}#${fragment}`;
  }

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

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth > 760) {
      this.closeMobileMenu();
    }
  }

  textDirection(): 'ltr' | 'rtl' {
    return this.language() === 'ar' ? 'rtl' : 'ltr';
  }

  setLanguage(language: AppLanguage): void {
    this.i18n.switchLanguage(language);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  catalogText(key: keyof ProductCatalogText): string {
    return productCatalogText[this.language()][key];
  }

  filterLabel(filter: ProductFilter): string {
    return this.productText(filter.label);
  }

  productTitle(product: ProductListItem): string {
    return this.productText(product.title);
  }

  productSummary(product: ProductListItem): string {
    return this.productText(product.summary);
  }

  productSpecLabel(spec: ProductSpec): string {
    return this.productText(spec.label);
  }

  productSpecValue(spec: ProductSpec): string {
    return this.productText(spec.value);
  }

  productTag(tag: string): string {
    return this.productText(tag);
  }

  productAlt(product: ProductListItem): string {
    return this.productTitle(product);
  }

  previousProductImageLabel(product: ProductListItem): string {
    return `${this.catalogText('previousImageFor')} ${this.productTitle(product)}`;
  }

  nextProductImageLabel(product: ProductListItem): string {
    return `${this.catalogText('nextImageFor')} ${this.productTitle(product)}`;
  }

  zoomProductImageLabel(product: ProductListItem): string {
    return `${this.catalogText('zoomImageFor')} ${this.productTitle(product)}`;
  }

  productThumbnailLabel(product: ProductListItem, imageNumber: number): string {
    const title = this.productTitle(product);

    switch (this.language()) {
      case 'zh-CN':
        return `显示 ${title} 的第 ${imageNumber} 张缩略图`;
      case 'ar':
        return `عرض الصورة المصغرة رقم ${imageNumber} لـ ${title}`;
      default:
        return `Show image ${imageNumber} for ${title}`;
    }
  }

  productThumbnailAlt(product: ProductListItem, imageNumber: number): string {
    return `${this.productTitle(product)} ${this.catalogText('thumbnail')} ${imageNumber}`;
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
          this.productTitle(product),
          product.summary,
          this.productSummary(product),
          product.category,
          this.productCategoryLabel(product.category),
          ...product.tags,
          ...product.tags.map((tag) => this.productTag(tag)),
          ...product.specs.flatMap((spec) => [
            spec.label,
            spec.value,
            this.productSpecLabel(spec),
            this.productSpecValue(spec),
          ]),
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
    const explicitImagePath = product.imagePaths?.[selectedImageNumber - 1];
    if (explicitImagePath) {
      return explicitImagePath;
    }

    if (selectedImageNumber === 1 && product.featuredImagePath) {
      return product.featuredImagePath;
    }

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

    switch (this.language()) {
      case 'zh-CN':
        return `${count} 个产品`;
      case 'ar':
        return `${count} منتج`;
      default:
        return count === 1 ? '1 product' : `${count} products`;
    }
  }

  whatsappHref(product?: ProductListItem): string {
    const message = this.whatsappMessage(product);
    return `https://wa.me/${this.primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  }

  private productCategoryLabel(category: ProductCategory): string {
    return this.productCategoryLabelForLanguage(category, this.language());
  }

  private productCategoryLabelForLanguage(
    category: ProductCategory,
    language: AppLanguage,
  ): string {
    const filter = this.filters.find((item) => item.id === category);
    return filter
      ? this.productTextForLanguage(filter.label, language)
      : category;
  }

  private productText(text?: string): string {
    return translateProductText(text, this.language());
  }

  private productTextForLanguage(
    text: string | undefined,
    language: AppLanguage,
  ): string {
    return translateProductText(text, language);
  }

  private productTitleForLanguage(
    product: ProductListItem,
    language: AppLanguage,
  ): string {
    return this.productTextForLanguage(product.title, language);
  }

  private productSummaryForLanguage(
    product: ProductListItem,
    language: AppLanguage,
  ): string {
    return this.productTextForLanguage(product.summary, language);
  }

  private whatsappMessage(product?: ProductListItem): string {
    if (product) {
      const title = this.productTitle(product);

      switch (this.language()) {
        case 'zh-CN':
          return `您好，我想询价：${title}。`;
        case 'ar':
          return `مرحبا، أود الحصول على عرض سعر لـ ${title}.`;
        default:
          return `Hello, I would like a quote for ${title}.`;
      }
    }

    switch (this.language()) {
      case 'zh-CN':
        return '您好，我想咨询你们的 5 加仑桶装水瓶盖和包装配件。';
      case 'ar':
        return 'مرحبا، أود الاستفسار عن أغطية عبوات المياه سعة 5 جالون وملحقات التعبئة.';
      default:
        return 'Hello, I would like to ask about your 5 gallon bottle caps and packaging accessories.';
    }
  }

  private productSeoContent(language: AppLanguage): {
    title: string;
    description: string;
    keywords: string;
  } {
    switch (language) {
      case 'zh-CN':
        return {
          title: '瓶盖与包装产品 | 5 加仑桶装水产品目录',
          description:
            '浏览惠州鼎元盖业塑胶有限公司的 5 加仑桶装水瓶盖、水桶、提手、包装配件、密封内衬和双色瓶盖产品。',
          keywords:
            '瓶盖产品, 5 加仑水桶, 桶装水提手, 包装配件, 5 加仑瓶盖目录, 塑料瓶盖供应商',
        };
      case 'ar':
        return {
          title: 'منتجات الأغطية والتعبئة | كتالوج مياه 5 جالون',
          description:
            'تصفح أغطية وعبوات مياه 5 جالون ومقابض الحمل وملحقات التعبئة وبطانات الإحكام وخيارات الألوان من شركة HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
          keywords:
            'منتجات الأغطية, عبوات مياه 5 جالون, مقابض حمل العبوات, ملحقات التعبئة, مورد أغطية بلاستيكية',
        };
      default:
        return {
          title: 'Bottle Cap & Packaging Products | 5 Gallon Water Catalogue',
          description:
            'Browse 5 gallon water bottle caps, bottles, carrying handles, packaging accessories, sealing liners and two-color cap options from HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
          keywords:
            'bottle cap products, 5 gallon water bottle, bottle carrying handle, bottled water packaging accessories, 5 gallon bottle cap catalogue, plastic bottle cap supplier',
        };
    }
  }

  private updateSeo(language: AppLanguage): void {
    const seo = this.productSeoContent(language);
    const title = seo.title;
    const description = seo.description;
    const canonicalUrl = this.seoLinks.apply(language, this.i18n.page());
    const inLanguage =
      language === 'zh-CN' ? 'zh-CN' : language === 'ar' ? 'ar' : 'en';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content: seo.keywords,
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
          name: this.productTitleForLanguage(product, language),
          description: this.productSummaryForLanguage(product, language),
          image: `${this.siteUrl}/${this.productImagePath(product, 1)}`,
          category: this.productCategoryLabelForLanguage(
            product.category,
            language,
          ),
          brand: {
            '@type': 'Brand',
            name: 'Bottle Cap For You',
          },
        },
      })),
    });
  }
}
