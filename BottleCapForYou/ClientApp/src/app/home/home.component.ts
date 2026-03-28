import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { AppLanguage } from '../i18n/translations';

type ProductItem = {
  image: string;
  alt: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly links = ['PETG', 'PCTG', 'PEEK', 'PPSU'];
  readonly contact = {
    phones: ['+44 7597702688', '+86 18818995568'],
    email: 'jack.zhang@bottlecapforyou.com'
  };
  readonly companyPhotos = [
    { src: 'company_photos/main_entrance.jpg', alt: 'Company main entrance' },
    { src: 'company_photos/office.jpg', alt: 'Company office' },
    { src: 'company_photos/Outside.jpg', alt: 'Company exterior' }
  ];
  readonly certificates = [
    { src: 'Certificates/ISO_19001.jpg', alt: 'ISO 19001 certificate' },
    { src: 'Certificates/ISO_22000.jpg', alt: 'ISO 22000 certificate' },
    { src: 'Certificates/Work_License.jpg', alt: 'Work license certificate' }
  ];
  readonly products: ProductItem[] = [
    {
      image: 'Products/1.jpg',
      alt: 'White two-color combination cover',
      titleEn: 'White two-color combination cover',
      titleZh: '白色双色组合盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    },
    {
      image: 'Products/2.jpg',
      alt: 'Orange two-color combination cover',
      titleEn: 'Orange two-color combination cover',
      titleZh: '橙色双色组合盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    },
    {
      image: 'Products/3.jpg',
      alt: 'Yellow two-color combination cover',
      titleEn: 'Yellow two-color combination cover',
      titleZh: '黄色双色组合盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    },
    {
      image: 'Products/4.jpg',
      alt: '7.5g barreled water with dual color short lid',
      titleEn: '7.5g barreled water dual-color short lid',
      titleZh: '7.5 克桶装水双色短盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    },
    {
      image: 'Products/5.jpg',
      alt: 'Blue two-color combination cover',
      titleEn: 'Blue two-color combination cover',
      titleZh: '蓝色双色组合盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    },
    {
      image: 'Products/6.jpg',
      alt: 'Bucket water two-color bottle cap',
      titleEn: 'Bucket water two-color bottle cap',
      titleZh: '桶装水双色瓶盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    },
    {
      image: 'Products/7.jpg',
      alt: 'Seven color combination cover',
      titleEn: 'Seven color combination cover',
      titleZh: '七彩组合盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    },
    {
      image: 'Products/8.jpg',
      alt: '8.2 gram easy to tear edge two-color bottle cap',
      titleEn: '8.2g easy-tear dual-color bottle cap',
      titleZh: '8.2 克易撕边双色瓶盖',
      descriptionEn: 'Professional manufacturer and service provider in the field of bottled water bottle caps.',
      descriptionZh: '专业从事桶装水瓶盖制造与服务，提供稳定可靠的产品供应。'
    }
  ];

  private readonly productsPerPage = 4;
  productPageIndex = 0;

  protected readonly i18n = inject(I18nService);
  protected readonly language = this.i18n.language;
  protected readonly content = this.i18n.content;

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

  previousProducts(): void {
    this.productPageIndex = this.productPageIndex === 0 ? this.productPageCount - 1 : this.productPageIndex - 1;
  }

  nextProducts(): void {
    this.productPageIndex = this.productPageIndex === this.productPageCount - 1 ? 0 : this.productPageIndex + 1;
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

  productDescription(item: ProductItem): string {
    return this.language() === 'zh-CN' ? item.descriptionZh : item.descriptionEn;
  }
}

