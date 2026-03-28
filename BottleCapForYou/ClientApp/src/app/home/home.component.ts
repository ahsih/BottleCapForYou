import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  readonly contact = {
    phones: ['+44 7597702688', '+86 18818995568'],
    email: 'jack.zhang@bottlecapforyou.com',
  };
  readonly companyPhotos: CompanyPhoto[] = [
    { src: 'company_photos/main_entrance.jpg', alt: 'Company main entrance' },
    { src: 'company_photos/office.jpg', alt: 'Company office' },
    { src: 'company_photos/Outside.jpg', alt: 'Company exterior' },
    { src: 'company_photos/factory_equipment_1.jpg', alt: 'Factory equipment photo 1' },
    { src: 'company_photos/factory_equipment_2.jpg', alt: 'Factory equipment photo 2' },
    { src: 'company_photos/factory_equipment_3.jpg', alt: 'Factory equipment photo 3' },
    { src: 'company_photos/factory_equipment_4.jpg', alt: 'Factory equipment photo 4' },
  ];
  readonly certificates = [
    { src: 'Certificates/ISO_19001.jpg', alt: 'ISO 19001 certificate' },
    { src: 'Certificates/ISO_22000.jpg', alt: 'ISO 22000 certificate' },
    { src: 'Certificates/Work_License.jpg', alt: 'Work license certificate' },
  ];
  readonly products: ProductItem[] = [
    { id: 1, folder: '1', imageCount: 8, titleEn: '7.3g bucket water two-color bottle cap long lid', titleZh: '7.3克桶装水双色瓶盖' },
    { id: 2, folder: '2', imageCount: 10, titleEn: '7.5g barreled water with dual color short lid', titleZh: '7.5克桶装水双色瓶盖' },
    { id: 3, folder: '3', imageCount: 8, titleEn: '7.5g single color bottle cap for bottled water', titleZh: '7.5克桶装水单色短盖' },
    { id: 4, folder: '4', imageCount: 10, titleEn: '7.6g barrel water two-color bottle cap (blue circle)', titleZh: '7.6克桶装水双色瓶盖（蓝圈）' },
    { id: 5, folder: '5', imageCount: 10, titleEn: '8.2 gram easy to tear edge two-color bottle cap', titleZh: '8.2克易撕边双色瓶盖' },
    { id: 6, folder: '6', imageCount: 9, titleEn: '8.5g barrel water two-color bottle cap', titleZh: '8.5克桶装水双色瓶盖' },
    { id: 7, folder: '7', imageCount: 7, titleEn: 'Blue two-color combination inner cover', titleZh: '蓝色双色组合盖' },
    { id: 8, folder: '8', imageCount: 8, titleEn: 'Blue two-piece set with monochrome pad', titleZh: '蓝色两件套，配单色垫片' },
    { id: 9, folder: '9', imageCount: 6, titleEn: 'Orange two-color combination cover', titleZh: '橙色双色组合瓶盖' },
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
          valueEn: '45 × 35 × 41 cm',
          valueZh: '45 × 35 × 41 厘米',
        },
        {
          labelEn: 'Bulk packing (900 units)',
          labelZh: '散装包装（900个）',
          valueEn: '57.5 × 45.5 × 44 cm',
          valueZh: '57.5 × 45.5 × 44 厘米',
        },
        {
          labelEn: 'Stacked packing',
          labelZh: '叠盖包装',
          valueEn: '46.5 × 29.5 × 46.8 cm',
          valueZh: '46.5 × 29.5 × 46.8 厘米',
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
}






