import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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

  private readonly productsPerPage = 4;
  private companyPhotoIntervalId: ReturnType<typeof setInterval> | null = null;
  productPageIndex = 0;
  companyPhotoIndex = 0;
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

  protected readonly i18n = inject(I18nService);
  protected readonly language = this.i18n.language;
  protected readonly content = this.i18n.content;

  ngOnInit(): void {
    this.companyPhotoIntervalId = setInterval(() => {
      this.companyPhotoIndex = (this.companyPhotoIndex + 1) % this.companyPhotos.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.companyPhotoIntervalId) {
      clearInterval(this.companyPhotoIntervalId);
    }
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

  submitEnquiry(): void {
    const content = this.content();
    const body = [
      `${content.ui.senderNameLabel}: ${this.enquiryName || '-'}`,
      `${content.ui.senderPhoneLabel}: ${this.enquiryPhone || '-'}`,
      `${content.ui.senderEmailLabel}: ${this.enquiryEmail || '-'}`,
      '',
      `${content.ui.senderMessageLabel}:`,
      this.enquiryMessage || '-',
    ].join('\n');

    const mailto = `mailto:${this.contact.email}?subject=${encodeURIComponent(content.ui.emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
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
}
