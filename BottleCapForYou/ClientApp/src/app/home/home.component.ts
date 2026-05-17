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
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { AppLanguage } from '../i18n/translations';

type ProductItem = {
  id: number;
  folder: string;
  imageCount: number;
  titleEn: string;
  titleZh: string;
  titleAr: string;
};

type CompanyPhoto = {
  src: string;
  alt: string;
};

type PackagingSpecRow = {
  labelEn: string;
  labelZh: string;
  labelAr: string;
  valueEn: string;
  valueZh: string;
  valueAr: string;
};

type PackagingItem = {
  id: string;
  titleEn: string;
  titleZh: string;
  titleAr: string;
  descriptionEn: string;
  descriptionZh: string;
  descriptionAr: string;
  imageSrc?: string;
  imageAltEn?: string;
  imageAltZh?: string;
  imageAltAr?: string;
  specs: PackagingSpecRow[];
  noteEn?: string;
  noteZh?: string;
  noteAr?: string;
};

type BuyerFeature = {
  titleEn: string;
  titleZh: string;
  titleAr: string;
  textEn: string;
  textZh: string;
  textAr: string;
};

type FaqItem = {
  questionEn: string;
  questionZh: string;
  questionAr: string;
  answerEn: string;
  answerZh: string;
  answerAr: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
      titleAr: 'غطاء عبوة مياه كبير ثنائي اللون 8.2 جم سعة 5 جالون (استخدام مرة واحدة)',
    },
    {
      id: 4,
      folder: '4',
      imageCount: 10,
      titleEn:
        '10.2g large 5 gallon bottle cap with 2 colors and (one time use)',
      titleZh: '10.2克桶装水双色双套（蓝圈）',
      titleAr: 'غطاء عبوة كبير 10.2 جم سعة 5 جالون بلونين (استخدام مرة واحدة)',
    },
    {
      id: 7,
      folder: '7',
      imageCount: 7,
      titleEn:
        '10.2g Blue two-color inner cover for water bottle caps (reusable)',
      titleZh: '10.2g 蓝色双色组合盖（可重复使用）',
      titleAr: 'غطاء داخلي أزرق ثنائي اللون 10.2 جم لأغطية عبوات المياه (قابل لإعادة الاستخدام)',
    },
    {
      id: 8,
      folder: '8',
      imageCount: 8,
      titleEn: '8g Blue two-piece bottle cap set with sealing pad (reusable)',
      titleZh: '8g 蓝色两件套，配单色垫片（可重复使用）',
      titleAr: 'طقم غطاء أزرق من قطعتين 8 جم مع بطانة إحكام (قابل لإعادة الاستخدام)',
    },
  ];
  readonly packagingSections: PackagingItem[] = [
    {
      id: 'cap-set',
      titleEn: 'Bottle Cap + Sealing Liner',
      titleZh: '瓶盖与密封垫片',
      titleAr: 'غطاء الزجاجة + بطانة الإحكام',
      descriptionEn:
        'Single-color 2-piece set with inner plug and sealing liner.',
      descriptionZh: '单色两件套，配内塞和密封垫片。',
      descriptionAr: 'طقم أحادي اللون من قطعتين مع سدادة داخلية وبطانة إحكام.',
      imageSrc: 'Bottle_And_Cap.jpg',
      imageAltEn: 'Bottle cap and sealing liner packaging product photo',
      imageAltZh: '瓶盖和密封垫片产品图片',
      imageAltAr: 'صورة منتج لغطاء الزجاجة وبطانة الإحكام',
      specs: [
        {
          labelEn: 'Product',
          labelZh: '产品',
          labelAr: 'المنتج',
          valueEn: 'Single-color 2-piece set with inner plug and sealing liner',
          valueZh: '单色两件套，配内塞和密封垫片',
          valueAr: 'طقم أحادي اللون من قطعتين مع سدادة داخلية وبطانة إحكام',
        },
        {
          labelEn: 'Components',
          labelZh: '组成',
          labelAr: 'المكونات',
          valueEn: 'Cap body + inner plug + liner + label',
          valueZh: '盖体 + 内塞 + 垫片 + 标签',
          valueAr: 'جسم الغطاء + السدادة الداخلية + البطانة + الملصق',
        },
        {
          labelEn: 'Bulk packing (500 units)',
          labelZh: '散装包装（500个）',
          labelAr: 'تعبئة سائبة (500 قطعة)',
          valueEn: '45 x 35 x 41 cm',
          valueZh: '45 x 35 x 41 厘米',
          valueAr: '45 × 35 × 41 سم',
        },
        {
          labelEn: 'Bulk packing (900 units)',
          labelZh: '散装包装（900个）',
          labelAr: 'تعبئة سائبة (900 قطعة)',
          valueEn: '57.5 x 45.5 x 44 cm',
          valueZh: '57.5 x 45.5 x 44 厘米',
          valueAr: '57.5 × 45.5 × 44 سم',
        },
        {
          labelEn: 'Stacked packing',
          labelZh: '叠盖包装',
          labelAr: 'تعبئة مكدسة',
          valueEn: '46.5 x 29.5 x 46.8 cm',
          valueZh: '46.5 x 29.5 x 46.8 厘米',
          valueAr: '46.5 × 29.5 × 46.8 سم',
        },
      ],
      noteEn: 'Carton dimensions for bulk and stacked packing.',
      noteZh: '适用于散装和叠盖包装的纸箱尺寸。',
      noteAr: 'أبعاد الكراتين للتعبئة السائبة والتعبئة المكدسة.',
    },
    {
      id: 'container',
      titleEn: 'Bottle Cap Packing Details',
      titleZh: '装柜明细',
      titleAr: 'تفاصيل تعبئة الحاويات',
      descriptionEn:
        'Reference loading capacity for bulk packing and stacked cap packing in standard export containers.',
      descriptionZh: '标准出口集装箱中散装包装和叠盖包装的装柜数量参考。',
      descriptionAr: 'مرجع لسعات التحميل الخاصة بالتعبئة السائبة والتعبئة المكدسة داخل حاويات التصدير القياسية.',
      specs: [
        {
          labelEn: '20FT container (bulk packing)',
          labelZh: '20尺集装箱（散装包装）',
          labelAr: 'حاوية 20 قدم (تعبئة سائبة)',
          valueEn: '276,000 units total; 600 units per carton; 460 cartons',
          valueZh: '总数276,000个；每箱600个；共460箱',
          valueAr: 'الإجمالي 276,000 قطعة؛ 600 قطعة لكل كرتون؛ 460 كرتون',
        },
        {
          labelEn: '40HQ container (bulk packing)',
          labelZh: '40尺高柜（散装包装）',
          labelAr: 'حاوية 40 قدم عالية (تعبئة سائبة)',
          valueEn: '600,000 units total; 1000 units per carton; 600 cartons',
          valueZh: '总数600,000个；每箱1000个；共600箱',
          valueAr: 'الإجمالي 600,000 قطعة؛ 1000 قطعة لكل كرتون؛ 600 كرتون',
        },
        {
          labelEn: '20FT container (stacked caps)',
          labelZh: '20尺集装箱（叠盖包装）',
          labelAr: 'حاوية 20 قدم (تعبئة أغطية مكدسة)',
          valueEn: '540,000 units total; 1,000 units per carton; 460 cartons',
          valueZh: '总数540,000个；每箱1,000个；共460箱',
          valueAr: 'الإجمالي 540,000 قطعة؛ 1,000 قطعة لكل كرتون؛ 460 كرتون',
        },
        {
          labelEn: '40HQ container (stacked caps)',
          labelZh: '40尺高柜（叠盖包装）',
          labelAr: 'حاوية 40 قدم عالية (تعبئة أغطية مكدسة)',
          valueEn:
            '1,102,000 units total; 1,000 units per carton; 1,102 cartons',
          valueZh: '总数1,102,000个；每箱1,000个；共1,102箱',
          valueAr: 'الإجمالي 1,102,000 قطعة؛ 1,000 قطعة لكل كرتون؛ 1,102 كرتون',
        },
      ],
      noteEn: 'Container loading quantities for export planning.',
      noteZh: '用于出口装柜规划的装箱数量参考。',
      noteAr: 'مرجع لكميات التحميل داخل الحاويات لتخطيط التصدير.',
    },
  ];

  readonly packagingDetailSections: PackagingItem[] = [
    {
      id: 'one-time-use-cap',
      titleEn: 'One-Time Use Cap',
      titleZh: '一次性瓶盖',
      titleAr: 'غطاء للاستخدام مرة واحدة',
      descriptionEn:
        'Container loading reference for one-time use bottle caps.',
      descriptionZh: '一次性瓶盖装柜参考信息。',
      descriptionAr: 'معلومات مرجعية لتحميل حاويات أغطية الزجاجات ذات الاستخدام الواحد.',
      specs: [
        {
          labelEn: '20ft container',
          labelZh: '20尺柜',
          labelAr: 'حاوية 20 قدم',
          valueEn:
            'Bulk carton packing: 276,000\n600 caps/carton\nStacked packing: 479,000\n1000 caps/carton',
          valueZh: '纸箱散装：27.6万\n600个/箱\n叠装：47.9万\n1000个/箱',
          valueAr: 'تعبئة كرتونية سائبة: 276,000\n600 غطاء/كرتون\nتعبئة مكدسة: 479,000\n1000 غطاء/كرتون',
        },
        {
          labelEn: '40ft container',
          labelZh: '40尺柜',
          labelAr: 'حاوية 40 قدم',
          valueEn:
            'Bulk carton packing: 600,000\n1000 caps/carton\nStacked packing: 1,250,000\n1000 caps/carton',
          valueZh: '纸箱散装：60万\n1000个/箱\n叠装：125万\n1000个/箱',
          valueAr: 'تعبئة كرتونية سائبة: 600,000\n1000 غطاء/كرتون\nتعبئة مكدسة: 1,250,000\n1000 غطاء/كرتون',
        },
      ],
      noteEn: 'Container loading quantities for export planning.',
      noteZh: '用于出口装柜规划的参考数量。',
      noteAr: 'كميات مرجعية لتحميل الحاويات من أجل تخطيط التصدير.',
    },
    {
      id: 'reuse-cap',
      titleEn: 'Reuse Cap',
      titleZh: '可重复使用瓶盖',
      titleAr: 'غطاء قابل لإعادة الاستخدام',
      descriptionEn: 'Container loading reference for reusable bottle caps.',
      descriptionZh: '可重复使用瓶盖装柜参考信息。',
      descriptionAr: 'معلومات مرجعية لتحميل حاويات أغطية الزجاجات القابلة لإعادة الاستخدام.',
      specs: [
        {
          labelEn: '20ft container',
          labelZh: '20尺柜',
          labelAr: 'حاوية 20 قدم',
          valueEn:
            'Container quantity: 230,000\n500 caps/carton\nStacked packing: 479,000\n1000 caps/carton',
          valueZh: '装柜数量：23万\n每箱装500个\n叠装：47.9万\n1000个/箱',
          valueAr: 'كمية الحاوية: 230,000\n500 غطاء/كرتون\nتعبئة مكدسة: 479,000\n1000 غطاء/كرتون',
        },
        {
          labelEn: '40ft container',
          labelZh: '40尺柜',
          labelAr: 'حاوية 40 قدم',
          valueEn:
            'Bulk carton packing: 540,000\n900 caps/carton\nStacked packing: 11,040,000\n1000 caps/carton',
          valueZh: '纸箱散装：54万\n900个/箱\n叠装：1104万\n1000个/箱',
          valueAr: 'تعبئة كرتونية سائبة: 540,000\n900 غطاء/كرتون\nتعبئة مكدسة: 11,040,000\n1000 غطاء/كرتون',
        },
      ],
      noteEn: 'Container loading quantities for export planning.',
      noteZh: '用于出口装柜规划的参考数量。',
      noteAr: 'كميات مرجعية لتحميل الحاويات من أجل تخطيط التصدير.',
    },
  ];
  readonly buyerFeatures: BuyerFeature[] = [
    {
      titleEn: 'OEM and wholesale support',
      titleZh: '支持 OEM 与批发',
      titleAr: 'دعم OEM والجملة',
      textEn:
        'We supply bottle caps for water plants, distributors, importers and private-label buyers who need stable bulk production.',
      textZh:
        '我们为水厂、经销商、进口商和贴牌客户提供稳定的大货瓶盖生产与供货支持。',
      textAr:
        'نحن نوفر أغطية الزجاجات لمحطات المياه والموزعين والمستوردين ومشتري العلامات الخاصة الذين يحتاجون إلى إنتاج مستقر بكميات كبيرة.',
    },
    {
      titleEn: 'Food-grade production',
      titleZh: '食品级生产',
      titleAr: 'إنتاج بدرجة غذائية',
      textEn:
        'Our bottle caps are designed for drinking water packaging with practical sealing performance for daily production and transport.',
      textZh:
        '我们的瓶盖适用于饮用水包装，兼顾日常生产、密封表现和运输使用需求。',
      textAr:
        'أغطية الزجاجات لدينا مصممة لتعبئة مياه الشرب مع أداء إحكام عملي للإنتاج اليومي والنقل.',
    },
    {
      titleEn: 'Export container planning',
      titleZh: '出口装柜支持',
      titleAr: 'دعم تخطيط حاويات التصدير',
      textEn:
        'We provide packing references for one-time use and reusable caps to help buyers estimate loading capacity and shipping costs.',
      textZh:
        '我们提供一次性与可重复使用瓶盖的装柜参考，方便客户评估装柜数量和运输成本。',
      textAr:
        'نوفر مراجع تعبئة للأغطية ذات الاستخدام الواحد والقابلة لإعادة الاستخدام لمساعدة المشترين على تقدير سعة التحميل وتكاليف الشحن.',
    },
    {
      titleEn: 'Factory-based supply',
      titleZh: '工厂直供',
      titleAr: 'توريد مباشر من المصنع',
      textEn:
        'Based in Huizhou, Guangdong, we support long-term sourcing with responsive communication and dependable lead times.',
      textZh:
        '公司位于广东惠州，支持长期采购合作，并提供及时沟通和稳定交期。',
      textAr:
        'نحن موجودون في هويتشو بمقاطعة غوانغدونغ، وندعم التوريد طويل الأجل مع تواصل سريع ومواعيد تسليم موثوقة.',
    },
  ];
  readonly seoFaqs: FaqItem[] = [
    {
      questionEn: 'Are you a bottle cap manufacturer or trading company?',
      questionZh: '你们是瓶盖生产厂家还是贸易公司？',
      questionAr: 'هل أنتم مصنع أغطية زجاجات أم شركة تجارية؟',
      answerEn:
        'We are a bottle cap manufacturer in Huizhou, Guangdong, China, focused on large 5 gallon water bottle caps, sealing liners and related plastic closures.',
      answerZh:
        '我们是位于中国广东惠州的瓶盖生产厂家，专注于大型 5 加仑桶装水瓶盖、密封垫片及相关塑胶配件。',
      answerAr:
        'نحن مصنع أغطية زجاجات في هويتشو، غوانغدونغ، الصين، نركز على أغطية عبوات المياه الكبيرة سعة 5 جالون وبطانات الإحكام والإغلاقات البلاستيكية ذات الصلة.',
    },
    {
      questionEn: 'Do you supply OEM and wholesale bottle cap orders?',
      questionZh: '你们支持 OEM 和批发瓶盖订单吗？',
      questionAr: 'هل توفرون طلبات أغطية زجاجات OEM والجملة؟',
      answerEn:
        'Yes. We support OEM, wholesale and export orders for water plants, distributors, importers and private-label buyers.',
      answerZh:
        '支持。我们承接 OEM、批发和出口订单，服务于水厂、经销商、进口商和贴牌采购客户。',
      answerAr:
        'نعم. نحن ندعم طلبات OEM والجملة والتصدير لمحطات المياه والموزعين والمستوردين ومشتري العلامات الخاصة.',
    },
    {
      questionEn: 'What bottle cap products do you supply?',
      questionZh: '你们主要供应哪些瓶盖产品？',
      questionAr: 'ما منتجات أغطية الزجاجات التي توفرونها؟',
      answerEn:
        'Our main products include one-time use 5 gallon water bottle caps, reusable bottle caps, sealing liners and matching plastic closure components.',
      answerZh:
        '我们的主要产品包括一次性 5 加仑桶装水瓶盖、可重复使用瓶盖、密封垫片及配套塑胶组件。',
      answerAr:
        'تشمل منتجاتنا الرئيسية أغطية عبوات مياه 5 جالون ذات الاستخدام الواحد، والأغطية القابلة لإعادة الاستخدام، وبطانات الإحكام، ومكونات الإغلاق البلاستيكية المطابقة.',
    },
    {
      questionEn: 'Can you share packing and container loading details?',
      questionZh: '你们可以提供包装和装柜明细吗？',
      questionAr: 'هل يمكنكم مشاركة تفاصيل التعبئة وتحميل الحاويات؟',
      answerEn:
        'Yes. We provide bulk packing, stacked packing and container loading references so buyers can estimate shipment quantities and plan export orders.',
      answerZh:
        '可以。我们可提供散装、叠装和集装箱装柜参考，方便客户估算发货数量并规划出口订单。',
      answerAr:
        'نعم. نحن نوفر مراجع للتعبئة السائبة والتعبئة المكدسة وتحميل الحاويات حتى يتمكن المشترون من تقدير كميات الشحن والتخطيط لطلبات التصدير.',
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

  textDirection(): 'ltr' | 'rtl' {
    return this.language() === 'ar' ? 'rtl' : 'ltr';
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
    switch (this.language()) {
      case 'zh-CN':
        return item.titleZh;
      case 'ar':
        return item.titleAr;
      default:
        return item.titleEn;
    }
  }

  buyerFeatureText(item: BuyerFeature): string {
    switch (this.language()) {
      case 'zh-CN':
        return item.textZh;
      case 'ar':
        return item.textAr;
      default:
        return item.textEn;
    }
  }

  faqQuestion(item: FaqItem): string {
    switch (this.language()) {
      case 'zh-CN':
        return item.questionZh;
      case 'ar':
        return item.questionAr;
      default:
        return item.questionEn;
    }
  }

  faqAnswer(item: FaqItem): string {
    switch (this.language()) {
      case 'zh-CN':
        return item.answerZh;
      case 'ar':
        return item.answerAr;
      default:
        return item.answerEn;
    }
  }

  productTitle(item: ProductItem): string {
    switch (this.language()) {
      case 'zh-CN':
        return item.titleZh;
      case 'ar':
        return item.titleAr;
      default:
        return item.titleEn;
    }
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
      '(استخدام مرة واحدة)',
      '(قابل لإعادة الاستخدام)',
    ];

    return suffixes.find((suffix) => title.endsWith(suffix)) ?? '';
  }

  productAlt(item: ProductItem): string {
    return this.productTitle(item);
  }

  packagingTitle(item: PackagingItem): string {
    switch (this.language()) {
      case 'zh-CN':
        return item.titleZh;
      case 'ar':
        return item.titleAr;
      default:
        return item.titleEn;
    }
  }

  packagingDescription(item: PackagingItem): string {
    switch (this.language()) {
      case 'zh-CN':
        return item.descriptionZh;
      case 'ar':
        return item.descriptionAr;
      default:
        return item.descriptionEn;
    }
  }

  packagingHasImage(item: PackagingItem): boolean {
    return !!item.imageSrc;
  }

  packagingSpecs(item: PackagingItem): PackagingSpecRow[] {
    return item.specs;
  }

  packagingLabel(row: PackagingSpecRow): string {
    switch (this.language()) {
      case 'zh-CN':
        return row.labelZh;
      case 'ar':
        return row.labelAr;
      default:
        return row.labelEn;
    }
  }

  packagingValue(row: PackagingSpecRow): string {
    switch (this.language()) {
      case 'zh-CN':
        return row.valueZh;
      case 'ar':
        return row.valueAr;
      default:
        return row.valueEn;
    }
  }

  packagingNote(item: PackagingItem): string | undefined {
    switch (this.language()) {
      case 'zh-CN':
        return item.noteZh;
      case 'ar':
        return item.noteAr;
      default:
        return item.noteEn;
    }
  }

  packagingAlt(item: PackagingItem): string {
    switch (this.language()) {
      case 'zh-CN':
        return item.imageAltZh ?? '';
      case 'ar':
        return item.imageAltAr ?? '';
      default:
        return item.imageAltEn ?? '';
    }
  }

  manufacturerHeading(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '中国大型5加仑桶装水瓶盖制造商';
      case 'ar':
        return 'مصنع صيني كبير لأغطية عبوات المياه سعة 5 جالون';
      default:
        return 'Large Bottle Cap Manufacturer in China for 5 Gallon Water Bottles';
    }
  }

  manufacturerSummary(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '位于广东惠州，服务于桶装水工厂、经销商、进口商和 OEM 批发客户。';
      case 'ar':
        return 'نحن في هويتشو، غوانغدونغ، ونخدم مصانع المياه والموزعين والمستوردين ومشتري OEM بالجملة.';
      default:
        return 'Based in Huizhou, Guangdong, supplying water factories, distributors, importers and OEM wholesale buyers.';
    }
  }

  buyerIntentEyebrow(): string {
    switch (this.language()) {
      case 'zh-CN':
        return 'B2B 供应';
      case 'ar':
        return 'توريد B2B';
      default:
        return 'B2B Supply';
    }
  }

  buyerIntentHeading(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '面向批发与 OEM 客户的瓶盖制造支持';
      case 'ar':
        return 'دعم تصنيع أغطية الزجاجات لمشتري الجملة وOEM';
      default:
        return 'Bottle Cap Manufacturing Support for Wholesale and OEM Buyers';
    }
  }

  buyerIntentIntro(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '如果您正在寻找瓶盖制造商、瓶盖供应商或中国塑胶瓶盖工厂，这里是我们为商业买家提供的核心支持。';
      case 'ar':
        return 'إذا كنت تبحث عن مصنع أغطية زجاجات أو مورد أغطية أو مصنع أغطية بلاستيكية في الصين، فهذه هي أهم نقاط الدعم التي نقدمها للمشترين التجاريين.';
      default:
        return 'If you are searching for a bottle cap manufacturer, bottle cap supplier or plastic bottle cap factory in China, these are the core points we offer business buyers.';
    }
  }

  previousLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '上一页';
      case 'ar':
        return 'السابق';
      default:
        return 'Prev';
    }
  }

  nextLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '下一页';
      case 'ar':
        return 'التالي';
      default:
        return 'Next';
    }
  }

  enlargeProductImageLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '放大产品图片';
      case 'ar':
        return 'تكبير صورة المنتج';
      default:
        return 'Enlarge product image';
    }
  }

  previousProductImageLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '上一张产品图片';
      case 'ar':
        return 'صورة المنتج السابقة';
      default:
        return 'Previous product image';
    }
  }

  nextProductImageLabel(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '下一张产品图片';
      case 'ar':
        return 'صورة المنتج التالية';
      default:
        return 'Next product image';
    }
  }

  packagingEyebrow(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '包装';
      case 'ar':
        return 'التعبئة';
      default:
        return 'Packaging';
    }
  }

  packagingHeading(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '包装方案';
      case 'ar':
        return 'حلول التعبئة';
      default:
        return 'Packaging Solutions';
    }
  }

  packagingIntro(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '展示出口发货、散装包装以及集装箱装柜效果的包装方案信息。';
      case 'ar':
        return 'معلومات التعبئة الخاصة بشحنات التصدير والتعبئة السائبة وعرض التحميل داخل الحاويات.';
      default:
        return 'Packaging and loading information for export shipments, bulk packing, and container presentation.';
    }
  }

  aboutIntro(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '专注大型 5 加仑桶装水瓶盖生产，面向中国及海外市场提供稳定的工厂供货。';
      case 'ar':
        return 'نركز على تصنيع أغطية عبوات المياه الكبيرة سعة 5 جالون مع توريد مصنع مستقر للسوقين المحلي والتصديري.';
      default:
        return 'Focused on large 5 gallon water bottle cap manufacturing with stable factory supply for China and export markets.';
    }
  }

  faqEyebrow(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '常见问题';
      case 'ar':
        return 'الأسئلة الشائعة';
      default:
        return 'FAQ';
    }
  }

  faqHeading(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '瓶盖制造商采购常见问题';
      case 'ar':
        return 'الأسئلة الشائعة لمشتري أغطية الزجاجات';
      default:
        return 'Frequently Asked Questions for Bottle Cap Buyers';
    }
  }

  faqIntro(): string {
    switch (this.language()) {
      case 'zh-CN':
        return '这些常见问题有助于 Google 和采购客户更快理解我们的产品、供货方式和出口支持能力。';
      case 'ar':
        return 'تساعد هذه الأسئلة الشائعة Google والمشترين التجاريين على فهم منتجاتنا وطريقة التوريد ودعم التصدير بشكل أوضح.';
      default:
        return 'These questions help both Google and business buyers understand our products, supply model and export support more clearly.';
    }
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
    let title = 'Bottle Cap Manufacturer in China | OEM Plastic Bottle Cap Supplier';
    let description =
      'HuiZhou DingYuan Gaiye Plastic Co., Ltd. is a bottle cap manufacturer in China supplying 5 gallon water bottle caps, reusable bottle caps, one-time use caps, sealing liners and OEM plastic closures for wholesale and export orders.';
    let keywords =
      'bottle cap manufacturer china, bottle cap producer, plastic bottle cap supplier, oem bottle cap manufacturer, 5 gallon water bottle cap manufacturer, reusable bottle cap supplier, one time use bottle cap supplier';
    let locale = 'en_GB';
    let manufacturerName = 'HuiZhou DingYuan Gaiye Plastic Co., Ltd.';
    let productCategory = '5 gallon water bottle cap';
    let inLanguage = 'en';

    if (language === 'zh-CN') {
      title = '中国大型5加仑桶装水瓶盖制造商 | 惠州鼎元盖业塑胶有限公司';
      description =
        '惠州鼎元盖业塑胶有限公司位于中国广东，专业生产大型 5 加仑桶装水瓶盖、密封垫片及相关塑胶配件，支持出口、批发和 OEM 订单。';
      keywords =
        '中国瓶盖制造商,大型瓶盖厂家,5加仑桶装水瓶盖,桶装水瓶盖工厂,广东塑料瓶盖厂家';
      locale = 'zh_CN';
      manufacturerName = '惠州鼎元盖业塑胶有限公司';
      productCategory = '桶装水瓶盖';
      inLanguage = 'zh-CN';
    } else if (language === 'ar') {
      title = 'مصنع أغطية زجاجات في الصين | مورد أغطية بلاستيكية OEM';
      description =
        'شركة هويتشو دينغ يوان غاييه للبلاستيك المحدودة هي مصنع أغطية زجاجات في الصين يورّد أغطية عبوات مياه 5 جالون، وأغطية قابلة لإعادة الاستخدام، وأغطية للاستخدام الواحد، وبطانات إحكام، وإغلاقات بلاستيكية OEM لطلبات الجملة والتصدير.';
      keywords =
        'مصنع أغطية زجاجات في الصين, مورد أغطية بلاستيكية, مصنع أغطية OEM, أغطية عبوات 5 جالون, مورد أغطية قابلة لإعادة الاستخدام';
      locale = 'ar';
      manufacturerName = 'شركة هويتشو دينغ يوان غاييه للبلاستيك المحدودة';
      productCategory = 'غطاء عبوة مياه سعة 5 جالون';
      inLanguage = 'ar';
    }

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
      content: locale,
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
          name: manufacturerName,
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
              '@type': 'Thing',
              name: this.productNameForLanguage(product, language),
              category: productCategory,
            },
          })),
        },
        {
          '@type': 'WebSite',
          '@id': `${canonicalUrl}#website`,
          url: canonicalUrl,
          name: 'Bottle Cap For You',
          inLanguage,
        },
        {
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: this.seoFaqs.map((faq) => ({
            '@type': 'Question',
            name: this.faqQuestionForLanguage(faq, language),
            acceptedAnswer: {
              '@type': 'Answer',
              text: this.faqAnswerForLanguage(faq, language),
            },
          })),
        },
      ],
    });
  }

  private productNameForLanguage(
    product: ProductItem,
    language: AppLanguage,
  ): string {
    switch (language) {
      case 'zh-CN':
        return product.titleZh;
      case 'ar':
        return product.titleAr;
      default:
        return product.titleEn;
    }
  }

  private faqQuestionForLanguage(faq: FaqItem, language: AppLanguage): string {
    switch (language) {
      case 'zh-CN':
        return faq.questionZh;
      case 'ar':
        return faq.questionAr;
      default:
        return faq.questionEn;
    }
  }

  private faqAnswerForLanguage(faq: FaqItem, language: AppLanguage): string {
    switch (language) {
      case 'zh-CN':
        return faq.answerZh;
      case 'ar':
        return faq.answerAr;
      default:
        return faq.answerEn;
    }
  }
}
