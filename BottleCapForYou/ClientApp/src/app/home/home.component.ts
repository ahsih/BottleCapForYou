import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  effect,
  inject,
} from '@angular/core';
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

type BuyerFeature = {
  titleEn: string;
  titleZh: string;
  textEn: string;
  textZh: string;
};

type FaqItem = {
  questionEn: string;
  questionZh: string;
  answerEn: string;
  answerZh: string;
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
    {
      src: 'company_photos/main_entrance.jpg',
      alt: 'Bottle cap factory entrance in Huizhou, China',
    },
    { src: 'company_photos/office.jpg', alt: 'Bottle cap manufacturer office' },
    { src: 'company_photos/Outside.jpg', alt: 'Bottle cap factory exterior' },
    {
      src: 'company_photos/factory_equipment_1.jpg',
      alt: 'Plastic bottle cap production equipment',
    },
    {
      src: 'company_photos/factory_equipment_2.jpg',
      alt: 'Bottle cap manufacturing line',
    },
    {
      src: 'company_photos/factory_equipment_3.jpg',
      alt: 'Bottle cap mold and production workshop',
    },
    {
      src: 'company_photos/factory_equipment_4.jpg',
      alt: 'Large bottle cap factory equipment',
    },
  ];
  readonly certificates = [
    { src: 'Certificates/ISO_19001.jpg', alt: 'ISO 19001 certificate' },
    { src: 'Certificates/ISO_22000.jpg', alt: 'ISO 22000 certificate' },
    { src: 'Certificates/Work_License.jpg', alt: 'Work license certificate' },
  ];
  readonly products: ProductItem[] = [
    {
      id: 1,
      folder: '1',
      imageCount: 8,
      titleEn: '8.2g large two-color 5 gallon water bottle cap (one time use)',
      titleZh: '8.2克桶装水一次性双色盖',
    },
    /*
    {
      id: 2,
      folder: '2',
      imageCount: 10,
      titleEn: '7.5g large 5 gallon water bottle cap with dual-color short lid',
      titleZh: '7.5克桶装水双色短盖瓶盖',
    },
    {
      id: 3,
      folder: '3',
      imageCount: 8,
      titleEn: '7.5g single-color bottle cap for 5 gallon bottled water',
      titleZh: '7.5克桶装水单色短盖',
    },*/
    {
      id: 4,
      folder: '4',
      imageCount: 10,
      titleEn:
        '10.2g large 5 gallon bottle cap with 2 colors and (one time use)',
      titleZh: '10.2克桶装水双色双套（蓝圈）',
    },
    /*
    {
      id: 5,
      folder: '5',
      imageCount: 10,
      titleEn: '8.2g easy-tear large water bottle cap',
      titleZh: '8.2克易撕边双色瓶盖',
    },
    {
      id: 6,
      folder: '6',
      imageCount: 9,
      titleEn: '8.5g large two-color bottle cap for barreled water',
      titleZh: '8.5克桶装水双色瓶盖',
    },
    */
    {
      id: 7,
      folder: '7',
      imageCount: 7,
      titleEn:
        '10.2g Blue two-color inner cover for water bottle caps (reusable)',
      titleZh: '10.2g 蓝色双色组合盖 (可重复使用)',
    },
    {
      id: 8,
      folder: '8',
      imageCount: 8,
      titleEn: '8g Blue two-piece bottle cap set with sealing pad (reusable)',
      titleZh: '8g 蓝色两件套，配单色垫片 (可重复使用)',
    },
    /*
    {
      id: 9,
      folder: '9',
      imageCount: 6,
      titleEn: 'Orange two-color combination water bottle cap',
      titleZh: '橙色双色组合瓶盖',
    },
    */
  ];
  readonly packagingSections: PackagingItem[] = [
    {
      id: 'cap-set',
      titleEn: 'Bottle Cap + Sealing Liner',
      titleZh: '瓶盖与密封垫片',
      descriptionEn:
        'Single-color 2-piece set with inner plug and sealing liner.',
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
      titleEn: 'Bottle Cap Packing Details',
      titleZh: '装柜明细',
      descriptionEn:
        'Reference loading capacity for bulk packing and stacked cap packing in standard export containers.',
      descriptionZh: '标准出口集装箱中散装包装和叠盖包装的参考装柜数量。',
      specs: [
        {
          labelEn: '20FT container (bulk packing)',
          labelZh: '20尺集装箱（散装包装）',
          valueEn: '276,000 units total; 600 units per carton; 460 cartons',
          valueZh: '总数276,000个；每箱600个；共460箱',
        },
        {
          labelEn: '40HQ container (bulk packing)',
          labelZh: '40尺高柜（散装包装）',
          valueEn: '600,000 units total; 1000 units per carton; 600 cartons',
          valueZh: '总数600,000个；每箱1000个；共600箱',
        },
        {
          labelEn: '20FT container (stacked caps)',
          labelZh: '20尺集装箱（叠盖包装）',
          valueEn: '540,000 units total; 1,000 units per carton; 460 cartons',
          valueZh: '总数460,000个；每箱1,000个；共460箱',
        },
        {
          labelEn: '40HQ container (stacked caps)',
          labelZh: '40尺高柜（叠盖包装）',
          valueEn:
            '1,102,000 units total; 1,000 units per carton; 1,102 cartons',
          valueZh: '总数1,102,000个；每箱1,000个；共1,102箱',
        },
      ],
      noteEn: 'Container loading quantities for export planning.',
      noteZh: '用于出口装柜规划的装箱数量参考。',
    },
  ];

  readonly packagingDetailSections: PackagingItem[] = [
    {
      id: 'one-time-use-cap',
      titleEn: 'One-Time Use Cap',
      titleZh: '一次性瓶盖',
      descriptionEn:
        'Container loading reference for one-time use bottle caps.',
      descriptionZh: '一次性瓶盖装柜参考信息。',
      specs: [
        {
          labelEn: '20ft container',
          labelZh: '20尺柜',
          valueEn:
            'Bulk carton packing: 276,000\n600 caps/carton\nStacked packing: 479,000\n1000 caps/carton',
          valueZh: '纸箱散装：27.6万\n600个/箱\n叠装：47.9万\n1000个/箱',
        },
        {
          labelEn: '40ft container',
          labelZh: '40尺柜',
          valueEn:
            'Bulk carton packing: 600,000\n1000 caps/carton\nStacked packing: 1,250,000\n1000 caps/carton',
          valueZh: '纸箱散装：60万\n1000个/箱\n叠装：125万\n1000个/箱',
        },
      ],
      noteEn: 'Container loading quantities for export planning.',
      noteZh: '用于出口装柜规划的参考数量。',
    },
    {
      id: 'reuse-cap',
      titleEn: 'Reuse Cap',
      titleZh: '可重复使用瓶盖',
      descriptionEn: 'Container loading reference for reusable bottle caps.',
      descriptionZh: '可重复使用瓶盖装柜参考信息。',
      specs: [
        {
          labelEn: '20ft container',
          labelZh: '20尺柜',
          valueEn:
            'Container quantity: 230,000\n500 caps/carton\nStacked packing: 479,000\n1000 caps/carton',
          valueZh: '装柜数量：23万\n每箱装500个\n叠装：47.9万\n1000个/箱',
        },
        {
          labelEn: '40ft container',
          labelZh: '40尺柜',
          valueEn:
            'Bulk carton packing: 540,000\n900 caps/carton\nStacked packing: 11,040,000\n1000 caps/carton',
          valueZh: '纸箱散装：54万\n900个/箱\n叠装：1104万\n1000个/箱',
        },
      ],
      noteEn: 'Container loading quantities for export planning.',
      noteZh: '用于出口装柜规划的参考数量。',
    },
  ];
  readonly buyerFeatures: BuyerFeature[] = [
    {
      titleEn: 'OEM and wholesale support',
      titleZh: '支持 OEM 与批发',
      textEn:
        'We supply bottle caps for water plants, distributors, importers and private-label buyers who need stable bulk production.',
      textZh:
        '我们为水厂、经销商、进口商和贴牌客户提供稳定的大货瓶盖生产与供货支持。',
    },
    {
      titleEn: 'Food-grade production',
      titleZh: '食品级生产',
      textEn:
        'Our bottle caps are designed for drinking water packaging with practical sealing performance for daily production and transport.',
      textZh:
        '我们的瓶盖适用于饮用水包装，兼顾日常生产、密封表现和运输使用需求。',
    },
    {
      titleEn: 'Export container planning',
      titleZh: '出口装柜支持',
      textEn:
        'We provide packing references for one-time use and reusable caps to help buyers estimate loading capacity and shipping costs.',
      textZh:
        '我们提供一次性与可重复使用瓶盖的装柜参考，方便客户评估装柜数量和运输成本。',
    },
    {
      titleEn: 'Factory-based supply',
      titleZh: '工厂直供',
      textEn:
        'Based in Huizhou, Guangdong, we support long-term sourcing with responsive communication and dependable lead times.',
      textZh:
        '公司位于广东惠州，支持长期采购合作，并提供及时沟通和稳定交期。',
    },
  ];
  readonly seoFaqs: FaqItem[] = [
    {
      questionEn: 'Are you a bottle cap manufacturer or trading company?',
      questionZh: '你们是瓶盖生产厂家还是贸易公司？',
      answerEn:
        'We are a bottle cap manufacturer in Huizhou, Guangdong, China, focused on large 5 gallon water bottle caps, sealing liners and related plastic closures.',
      answerZh:
        '我们是位于中国广东惠州的瓶盖生产厂家，专注于大型 5 加仑桶装水瓶盖、密封垫片及相关塑胶配件。',
    },
    {
      questionEn: 'Do you supply OEM and wholesale bottle cap orders?',
      questionZh: '你们支持 OEM 和批发瓶盖订单吗？',
      answerEn:
        'Yes. We support OEM, wholesale and export orders for water plants, distributors, importers and private-label buyers.',
      answerZh:
        '支持。我们承接 OEM、批发和出口订单，服务于水厂、经销商、进口商和贴牌采购客户。',
    },
    {
      questionEn: 'What bottle cap products do you supply?',
      questionZh: '你们主要供应哪些瓶盖产品？',
      answerEn:
        'Our main products include one-time use 5 gallon water bottle caps, reusable bottle caps, sealing liners and matching plastic closure components.',
      answerZh:
        '我们的主要产品包括一次性 5 加仑桶装水瓶盖、可重复使用瓶盖、密封垫片及配套塑胶配件。',
    },
    {
      questionEn: 'Can you share packing and container loading details?',
      questionZh: '你们可以提供包装和装柜明细吗？',
      answerEn:
        'Yes. We provide bulk packing, stacked packing and container loading references so buyers can estimate shipment quantities and plan export orders.',
      answerZh:
        '可以。我们可提供散装、叠装和集装箱装柜参考，方便客户估算发货数量并规划出口订单。',
    },
  ];

  private readonly productsPerPage = 4;
  private companyPhotoIntervalId: ReturnType<typeof setInterval> | null = null;
  private lastScrollY = 0;
  productPageIndex = 0;
  companyPhotoIndex = 0;
  isMobileHeaderHidden = false;
  productImageIndexes: Record<number, number> = this.products.reduce<
    Record<number, number>
  >((accumulator, product) => {
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
      this.companyPhotoIndex =
        (this.companyPhotoIndex + 1) % this.companyPhotos.length;
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
    return [0, 1, 2].map(
      (offset) =>
        this.companyPhotos[
          (this.companyPhotoIndex + offset) % this.companyPhotos.length
        ],
    );
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

  get packagingDisplaySections(): PackagingItem[] {
    const [packagingOverview] = this.packagingSections;
    return packagingOverview
      ? [packagingOverview, ...this.packagingDetailSections]
      : this.packagingDetailSections;
  }

  buyerFeatureTitle(item: BuyerFeature): string {
    return this.language() === 'zh-CN' ? item.titleZh : item.titleEn;
  }

  buyerFeatureText(item: BuyerFeature): string {
    return this.language() === 'zh-CN' ? item.textZh : item.textEn;
  }

  faqQuestion(item: FaqItem): string {
    return this.language() === 'zh-CN' ? item.questionZh : item.questionEn;
  }

  faqAnswer(item: FaqItem): string {
    return this.language() === 'zh-CN' ? item.answerZh : item.answerEn;
  }

  productTitle(item: ProductItem): string {
    return this.language() === 'zh-CN' ? item.titleZh : item.titleEn;
  }

  productTitleBase(item: ProductItem): string {
    const title = this.productTitle(item);
    const highlight = this.productTitleHighlight(item);
    return highlight ? title.slice(0, -highlight.length).trimEnd() : title;
  }

  productTitleHighlight(item: ProductItem): string {
    const title = this.productTitle(item);
    const suffixes = [
      '(one time use)',
      '(reusable)',
      '（一次性）',
      '（可重复使用）',
      '(一次性)',
      '(可重复使用)',
    ];

    return suffixes.find((suffix) => title.endsWith(suffix)) ?? '';
  }

  productAlt(item: ProductItem): string {
    return this.productTitle(item);
  }

  packagingTitle(item: PackagingItem): string {
    return this.language() === 'zh-CN' ? item.titleZh : item.titleEn;
  }

  packagingDescription(item: PackagingItem): string {
    return this.language() === 'zh-CN'
      ? item.descriptionZh
      : item.descriptionEn;
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
    return this.language() === 'zh-CN'
      ? (item.imageAltZh ?? '')
      : (item.imageAltEn ?? '');
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
    return typeof window !== 'undefined'
      ? window.scrollY || window.pageYOffset || 0
      : 0;
  }

  private updateSeo(language: AppLanguage): void {
    const isChinese = language === 'zh-CN';
    const title = isChinese
      ? '中国大型5加仑瓶盖制造商 | 惠州鼎元盖业塑胶有限公司'
      : 'Bottle Cap Manufacturer in China | OEM Plastic Bottle Cap Supplier';
    const description = isChinese
      ? '惠州鼎元盖业塑胶有限公司位于中国广东，专业生产大型5加仑桶装水瓶盖、密封垫片及相关塑胶配件，支持出口、批发和 OEM 订单。'
      : 'HuiZhou DingYuan Gaiye Plastic Co., Ltd. is a bottle cap manufacturer in China supplying 5 gallon water bottle caps, reusable bottle caps, one-time use caps, sealing liners and OEM plastic closures for wholesale and export orders.';
    const keywords = isChinese
      ? '中国瓶盖制造商,大型瓶盖厂家,5加仑桶装水瓶盖,桶装水瓶盖工厂,广东塑料瓶盖厂家'
      : 'bottle cap manufacturer china, bottle cap producer, plastic bottle cap supplier, oem bottle cap manufacturer, 5 gallon water bottle cap manufacturer, reusable bottle cap supplier, one time use bottle cap supplier';
    const canonicalUrl = `${this.siteUrl}/`;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
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
      content: this.defaultShareImage,
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Bottle Cap For You',
    });
    this.meta.updateTag({
      property: 'og:locale',
      content: isChinese ? 'zh_CN' : 'en_GB',
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({
      name: 'twitter:image',
      content: this.defaultShareImage,
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
          name: isChinese
            ? '惠州鼎元盖业塑胶有限公司'
            : 'HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
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
          foundingDate: '2015',
          address: {
            '@type': 'PostalAddress',
            streetAddress:
              'Building 6, Lvquan Intelligent Garden, Huangdong Village, Zhenlong Town, Huiyang District',
            addressLocality: 'Huizhou',
            addressRegion: 'Guangdong',
            addressCountry: 'CN',
          },
          areaServed: [
            'China',
            'Europe',
            'Middle East',
            'Africa',
            'Southeast Asia',
          ],
          sameAs: [
            'https://www.facebook.com/share/1DpevTN1FE/',
            'https://www.tiktok.com/@dingyuangaiye?_r=1&_t=ZN-954OvEs3L8A',
            'https://youtube.com/channel/UCIp2OXI9VbGaRNFmoiV6t_A?si=TfrkMJXu4LWZQozh',
          ],
          keywords,
          knowsAbout: [
            'Bottle cap manufacturing',
            '5 gallon water bottle caps',
            'Reusable bottle caps',
            'One-time use bottle caps',
            'Sealing liners',
            'OEM plastic closures',
          ],
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
        {
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: this.seoFaqs.map((faq) => ({
            '@type': 'Question',
            name: isChinese ? faq.questionZh : faq.questionEn,
            acceptedAnswer: {
              '@type': 'Answer',
              text: isChinese ? faq.answerZh : faq.answerEn,
            },
          })),
        },
      ],
    });
  }
}
