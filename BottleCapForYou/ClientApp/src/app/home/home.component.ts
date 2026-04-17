import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { I18nService } from '../core/i18n.service';
import { AppLanguage } from '../i18n/translations';

type ProductItem = {
  id: number;
  folder: string;
  imageCount: number;
  titleEn: string;
  titleZh: string;
};

type CompanyPhoto = {
  src: string;
  alt: string;
};

type PackagingSpecRow = {
  labelEn: string;
  labelZh: string;
  valueEn: string;
  valueZh: string;
};

type PackagingItem = {
  id: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  imageSrc?: string;
  imageAltEn?: string;
  imageAltZh?: string;
  specs: PackagingSpecRow[];
  noteEn?: string;
  noteZh?: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly siteUrl = 'https://www.bottlecapforyou.com';
  private readonly defaultShareImage = `${this.siteUrl}/logo.png`;

  readonly contact = {
    phones: ['+44 7597702688', '+86 18818995568'],
    email: 'jack.zhang@bottlecapforyou.com',
  };
  readonly companyPhotos: CompanyPhoto[] = [
    { src: 'company_photos/main_entrance.jpg', alt: 'Bottle cap factory entrance in Huizhou, China' },
    { src: 'company_photos/office.jpg', alt: 'Bottle cap manufacturer office' },
    { src: 'company_photos/Outside.jpg', alt: 'Bottle cap factory exterior' },
    { src: 'company_photos/factory_equipment_1.jpg', alt: 'Plastic bottle cap production equipment' },
    { src: 'company_photos/factory_equipment_2.jpg', alt: 'Bottle cap manufacturing line' },
    { src: 'company_photos/factory_equipment_3.jpg', alt: 'Bottle cap mold and production workshop' },
    { src: 'company_photos/factory_equipment_4.jpg', alt: 'Large bottle cap factory equipment' },
  ];
  readonly certificates = [
    { src: 'Certificates/ISO_19001.jpg', alt: 'ISO 19001 certificate' },
    { src: 'Certificates/ISO_22000.jpg', alt: 'ISO 22000 certificate' },
    { src: 'Certificates/Work_License.jpg', alt: 'Work license certificate' },
  ];
  readonly products: ProductItem[] = [
    { id: 1, folder: '1', imageCount: 8, titleEn: '7.3g large two-color 5 gallon water bottle cap with long lid', titleZh: '7.3克桶装水双色长盖瓶盖' },
    { id: 2, folder: '2', imageCount: 10, titleEn: '7.5g large 5 gallon water bottle cap with dual-color short lid', titleZh: '7.5克桶装水双色短盖瓶盖' },
    { id: 3, folder: '3', imageCount: 8, titleEn: '7.5g single-color bottle cap for 5 gallon bottled water', titleZh: '7.5克桶装水单色短盖' },
    { id: 4, folder: '4', imageCount: 10, titleEn: '7.6g large 5 gallon bottle cap with blue ring', titleZh: '7.6克桶装水双色瓶盖（蓝圈）' },
    { id: 5, folder: '5', imageCount: 10, titleEn: '8.2g easy-tear large water bottle cap', titleZh: '8.2克易撕边双色瓶盖' },
    { id: 6, folder: '6', imageCount: 9, titleEn: '8.5g large two-color bottle cap for barreled water', titleZh: '8.5克桶装水双色瓶盖' },
    { id: 7, folder: '7', imageCount: 7, titleEn: 'Blue two-color inner cover for water bottle caps', titleZh: '蓝色双色组合盖' },
    { id: 8, folder: '8', imageCount: 8, titleEn: 'Blue two-piece bottle cap set with sealing pad', titleZh: '蓝色两件套，配单色垫片' },
    { id: 9, folder: '9', imageCount: 6, titleEn: 'Orange two-color combination water bottle cap', titleZh: '橙色双色组合瓶盖' },
  ];
  readonly packagingSections: PackagingItem[] = [
    {
      id: 'cap-set',
      titleEn: 'Bottle Cap + Sealing Liner',
      titleZh: '瓶盖与密封垫片',
      descriptionEn: 'Single-color 2-piece set with inner plug and sealing liner.',
      descriptionZh: '单色两件套，配内塞和密封垫片。',
      imageSrc: 'Bottle_And_Cap.jpg',
      imageAltEn: 'Bottle cap and sealing liner packaging product photo',
      imageAltZh: '瓶盖和密封垫片产品图片',
      specs: [
        {
          labelEn: 'Product',
          labelZh: '产品',
          valueEn: 'Single-color 2-piece set with inner plug and sealing liner',
          valueZh: '单色两件套，配内塞和密封垫片',
        },
        {
          labelEn: 'Components',
          labelZh: '组成',
          valueEn: 'Cap body + inner plug + liner + label',
          valueZh: '盖体 + 内塞 + 垫片 + 标签',
        },
        {
          labelEn: 'Bulk packing (500 units)',
          labelZh: '散装包装（500个）',
          valueEn: '45 x 35 x 41 cm',
          valueZh: '45 x 35 x 41 厘米',
        },
        {
          labelEn: 'Bulk packing (900 units)',
          labelZh: '散装包装（900个）',
          valueEn: '57.5 x 45.5 x 44 cm',
          valueZh: '57.5 x 45.5 x 44 厘米',
        },
        {
          labelEn: 'Stacked packing',
          labelZh: '叠盖包装',
          valueEn: '46.5 x 29.5 x 46.8 cm',
          valueZh: '46.5 x 29.5 x 46.8 厘米',
        },
      ],
      noteEn: 'Carton dimensions for bulk and stacked packing.',
      noteZh: '适用于散装和叠盖包装的纸箱尺寸。',
    },
    {
      id: 'container',
      titleEn: 'Packing Details',
      titleZh: '装柜明细',
      descriptionEn: 'Reference loading capacity for bulk packing and stacked cap packing in standard export containers.',
      descriptionZh: '标准出口集装箱中散装包装和叠盖包装的参考装柜数量。',
      specs: [
        {
          labelEn: '20FT container (bulk packing)',
          labelZh: '20尺集装箱（散装包装）',
          valueEn: '230,000 units total; 500 units per carton; 460 cartons',
          valueZh: '总数230,000个；每箱500个；共460箱',
        },
        {
          labelEn: '40HQ container (bulk packing)',
          labelZh: '40尺高柜（散装包装）',
          valueEn: '540,000 units total; 900 units per carton; 600 cartons',
          valueZh: '总数540,000个；每箱900个；共600箱',
        },
        {
          labelEn: '20FT container (stacked caps)',
          labelZh: '20尺集装箱（叠盖包装）',
          valueEn: '460,000 units total; 1,000 units per carton; 460 cartons',
          valueZh: '总数460,000个；每箱1,000个；共460箱',
        },
        {
          labelEn: '40HQ container (stacked caps)',
          labelZh: '40尺高柜（叠盖包装）',
          valueEn: '1,102,000 units total; 1,000 units per carton; 1,102 cartons',
          valueZh: '总数1,102,000个；每箱1,000个；共1,102箱',
        },
      ],
      noteEn: 'Container loading quantities for export planning.',
      noteZh: '用于出口装柜规划的装箱数量参考。',
    },
  ];

  private readonly productsPerPage = 4;
  private companyPhotoIntervalId: ReturnType<typeof setInterval> | null = null;
  private lastScrollY = 0;
  productPageIndex = 0;
  companyPhotoIndex = 0;
  isMobileHeaderHidden = false;
  productImageIndexes: Record<number, number> = this.products.reduce<Record<number, number>>((accumulator, product) => {
    accumulator[product.id] = 0;
    return accumulator;
  }, {});
  activeLightboxImage: string | null = null;
  activeLightboxAlt = '';
  enquiryName = '';
  enquiryPhone = '';
  enquiryEmail = '';
  enquiryMessage = '';
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  protected readonly i18n = inject(I18nService);
  protected readonly language = this.i18n.language;
  protected readonly content = this.i18n.content;
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this.updateSeo(this.language());
    });
  }

  ngOnInit(): void {
    this.lastScrollY = this.getScrollY();
    this.updateMobileHeaderVisibility();
    this.companyPhotoIntervalId = setInterval(() => {
      this.companyPhotoIndex = (this.companyPhotoIndex + 1) % this.companyPhotos.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.companyPhotoIntervalId) {
      clearInterval(this.companyPhotoIntervalId);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateMobileHeaderVisibility();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateMobileHeaderVisibility(true);
  }

  get visibleCompanyPhotos(): CompanyPhoto[] {
    return [0, 1, 2].map((offset) => this.companyPhotos[(this.companyPhotoIndex + offset) % this.companyPhotos.length]);
  }

  get visiblePhones(): string[] {
    return this.language() === 'zh-CN'
      ? this.contact.phones
      : this.contact.phones.filter((phone) => !phone.startsWith('+86'));
  }

  setLanguage(language: AppLanguage): void {
    this.i18n.setLanguage(language);
  }

  phoneHref(phone: string): string {
    return `tel:${phone.replace(/[^+\d]/g, '')}`;
  }

  whatsappHref(phone: string): string {
    return `https://wa.me/${phone.replace(/[^\d]/g, '')}`;
  }

  emailHref(email: string): string {
    return `mailto:${email}`;
  }

  async submitEnquiry(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.enquiryName,
          phone: this.enquiryPhone,
          email: this.enquiryEmail,
          message: this.enquiryMessage,
          language: this.language(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send enquiry.');
      }

      this.enquiryName = '';
      this.enquiryPhone = '';
      this.enquiryEmail = '';
      this.enquiryMessage = '';
      this.submitStatus = 'success';
    } catch {
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }

  contactFormStatusMessage(): string {
    const content = this.content();

    switch (this.submitStatus) {
      case 'success':
        return content.ui.submitSuccess;
      case 'error':
        return content.ui.submitError;
      default:
        return '';
    }
  }

  previousProducts(): void {
    this.productPageIndex =
      this.productPageIndex === 0
        ? this.productPageCount - 1
        : this.productPageIndex - 1;
  }

  nextProducts(): void {
    this.productPageIndex =
      this.productPageIndex === this.productPageCount - 1
        ? 0
        : this.productPageIndex + 1;
  }

  previousProductImage(product: ProductItem): void {
    const currentIndex = this.productImageIndexes[product.id] ?? 0;
    this.productImageIndexes[product.id] =
      currentIndex === 0 ? product.imageCount - 1 : currentIndex - 1;
  }

  nextProductImage(product: ProductItem): void {
    const currentIndex = this.productImageIndexes[product.id] ?? 0;
    this.productImageIndexes[product.id] =
      currentIndex === product.imageCount - 1 ? 0 : currentIndex + 1;
  }

  openProductLightbox(product: ProductItem): void {
    this.activeLightboxImage = this.productImagePath(product);
    this.activeLightboxAlt = this.productAlt(product);
  }

  closeProductLightbox(): void {
    this.activeLightboxImage = null;
    this.activeLightboxAlt = '';
  }

  productImagePath(product: ProductItem): string {
    const imageNumber = (this.productImageIndexes[product.id] ?? 0) + 1;
    return `Products/${product.folder}/${imageNumber}.jpg`;
  }

  productImagePosition(product: ProductItem): string {
    return `${(this.productImageIndexes[product.id] ?? 0) + 1} / ${product.imageCount}`;
  }

  get visibleProducts(): ProductItem[] {
    const start = this.productPageIndex * this.productsPerPage;
    return this.products.slice(start, start + this.productsPerPage);
  }

  get productPageCount(): number {
    return Math.ceil(this.products.length / this.productsPerPage);
  }

  productTitle(item: ProductItem): string {
    return this.language() === 'zh-CN' ? item.titleZh : item.titleEn;
  }

  productAlt(item: ProductItem): string {
    return this.productTitle(item);
  }

  packagingTitle(item: PackagingItem): string {
    return this.language() === 'zh-CN' ? item.titleZh : item.titleEn;
  }

  packagingDescription(item: PackagingItem): string {
    return this.language() === 'zh-CN' ? item.descriptionZh : item.descriptionEn;
  }

  packagingHasImage(item: PackagingItem): boolean {
    return !!item.imageSrc;
  }

  packagingSpecs(item: PackagingItem): PackagingSpecRow[] {
    return item.specs;
  }

  packagingLabel(row: PackagingSpecRow): string {
    return this.language() === 'zh-CN' ? row.labelZh : row.labelEn;
  }

  packagingValue(row: PackagingSpecRow): string {
    return this.language() === 'zh-CN' ? row.valueZh : row.valueEn;
  }

  packagingNote(item: PackagingItem): string | undefined {
    return this.language() === 'zh-CN' ? item.noteZh : item.noteEn;
  }

  packagingAlt(item: PackagingItem): string {
    return this.language() === 'zh-CN' ? item.imageAltZh ?? '' : item.imageAltEn ?? '';
  }

  manufacturerHeading(): string {
    return this.language() === 'zh-CN'
      ? '中国大型5加仑桶装水瓶盖制造商'
      : 'Large Bottle Cap Manufacturer in China for 5 Gallon Water Bottles';
  }

  manufacturerSummary(): string {
    return this.language() === 'zh-CN'
      ? '位于广东惠州，服务于桶装水工厂、经销商、进口商和 OEM 批发客户。'
      : 'Based in Huizhou, Guangdong, supplying water factories, distributors, importers and OEM wholesale buyers.';
  }

  private updateMobileHeaderVisibility(resetLastScroll = false): void {
    if (typeof window === 'undefined') {
      return;
    }

    const currentScrollY = this.getScrollY();
    const isMobile = window.innerWidth <= 760;

    if (!isMobile) {
      this.isMobileHeaderHidden = false;
      this.lastScrollY = currentScrollY;
      return;
    }

    if (resetLastScroll) {
      this.lastScrollY = currentScrollY;
      this.isMobileHeaderHidden = false;
      return;
    }

    const scrollingDown = currentScrollY > this.lastScrollY;
    const shouldHide = currentScrollY > 120 && scrollingDown;
    this.isMobileHeaderHidden = shouldHide;
    this.lastScrollY = currentScrollY;
  }

  private getScrollY(): number {
    return typeof window !== 'undefined' ? window.scrollY || window.pageYOffset || 0 : 0;
  }

  private updateSeo(language: AppLanguage): void {
    const isChinese = language === 'zh-CN';
    const title = isChinese
      ? '中国大型5加仑瓶盖制造商 | 惠州鼎元盖业塑胶有限公司'
      : 'Large Bottle Cap Manufacturer in China | 5 Gallon Water Bottle Caps';
    const description = isChinese
      ? '惠州鼎元盖业塑胶有限公司位于中国广东，专业生产大型5加仑桶装水瓶盖、密封垫片及相关塑胶配件，支持出口、批发和 OEM 订单。'
      : 'HuiZhou DingYuan Gaiye Plastic Co., Ltd. is a large bottle cap manufacturer in China producing 5 gallon water bottle caps, sealing liners and OEM plastic closures for export and wholesale supply.';
    const keywords = isChinese
      ? '中国瓶盖制造商,大型瓶盖厂家,5加仑桶装水瓶盖,桶装水瓶盖工厂,广东塑料瓶盖厂家'
      : 'large bottle cap manufacturer in china, 5 gallon water bottle cap manufacturer, plastic bottle cap factory china, bottle cap supplier china, water bottle cap manufacturer';
    const canonicalUrl = `${this.siteUrl}/`;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: this.defaultShareImage });
    this.meta.updateTag({ property: 'og:site_name', content: 'Bottle Cap For You' });
    this.meta.updateTag({ property: 'og:locale', content: isChinese ? 'zh_CN' : 'en_GB' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: this.defaultShareImage });

    let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    let schemaScript = this.document.getElementById('manufacturer-schema');
    if (!schemaScript) {
      schemaScript = this.document.createElement('script');
      schemaScript.setAttribute('id', 'manufacturer-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Manufacturer',
          '@id': `${canonicalUrl}#manufacturer`,
          name: isChinese ? '惠州鼎元盖业塑胶有限公司' : 'HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
          url: canonicalUrl,
          logo: `${this.siteUrl}/logo.png`,
          image: [
            `${this.siteUrl}/company_photos/main_entrance.jpg`,
            `${this.siteUrl}/company_photos/factory_equipment_1.jpg`,
            `${this.siteUrl}/Bottle_And_Cap.jpg`,
          ],
          description,
          email: this.contact.email,
          telephone: this.contact.phones[1],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Building 6, Lvquan Intelligent Garden, Huangdong Village, Zhenlong Town, Huiyang District',
            addressLocality: 'Huizhou',
            addressRegion: 'Guangdong',
            addressCountry: 'CN',
          },
          areaServed: ['China', 'Europe', 'Middle East', 'Africa', 'Southeast Asia'],
          sameAs: [
            'https://www.facebook.com/share/1DpevTN1FE/',
            'https://www.tiktok.com/@dingyuangaiye?_r=1&_t=ZN-954OvEs3L8A',
            'https://youtube.com/channel/UCIp2OXI9VbGaRNFmoiV6t_A?si=TfrkMJXu4LWZQozh',
          ],
          keywords,
          makesOffer: this.products.slice(0, 4).map((product) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: isChinese ? product.titleZh : product.titleEn,
              category: isChinese ? '桶装水瓶盖' : '5 gallon water bottle cap',
            },
          })),
        },
        {
          '@type': 'WebSite',
          '@id': `${canonicalUrl}#website`,
          url: canonicalUrl,
          name: 'Bottle Cap For You',
          inLanguage: isChinese ? 'zh-CN' : 'en',
        },
      ],
    });
  }
}
