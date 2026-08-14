import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, OnInit, effect, inject } from '@angular/core';
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
  featuredImagePath?: string;
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
    heroTitle: '5 Gallon Bottle cap and water bottle',
    heroDescription:
      'Browse bottle cap styles for drinking water factories, distributors, importers, and OEM wholesale buyers.',
    whatsappQuote: 'WhatsApp Quote',
    contactUs: 'Contact Us',
    featuredImagesLabel: 'Featured bottle cap photos',
    featuredImageAltLiner: 'Blue two-piece bottle cap with liner',
    featuredImageAltTwoColor: 'Two-color 5 gallon bottle cap',
    featuredImageAltReusable: 'Reusable bottle cap with sealing pad',
    searchLabel: 'Search products',
    searchPlaceholder: 'Search cap, liner, reusable...',
    filterLabel: 'Filter bottle caps',
    clearFilters: 'Clear filters',
    productFeaturesLabel: 'Product features',
    whatsapp: 'WhatsApp',
    emptyTitle: 'No bottle caps found',
    emptyText: 'Try clearing the filter or searching for another cap type.',
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
    heroTitle: '5 加仑瓶盖和水桶',
    heroDescription:
      '浏览适用于饮用水工厂、经销商、进口商和 OEM 批发买家的瓶盖款式。',
    whatsappQuote: 'WhatsApp 报价',
    contactUs: '联系我们',
    featuredImagesLabel: '精选瓶盖图片',
    featuredImageAltLiner: '带内衬的蓝色两件式瓶盖',
    featuredImageAltTwoColor: '双色 5 加仑瓶盖',
    featuredImageAltReusable: '带密封垫的可重复使用瓶盖',
    searchLabel: '搜索产品',
    searchPlaceholder: '搜索瓶盖、内衬、可重复使用...',
    filterLabel: '筛选瓶盖',
    clearFilters: '清除筛选',
    productFeaturesLabel: '产品特点',
    whatsapp: 'WhatsApp',
    emptyTitle: '未找到瓶盖产品',
    emptyText: '请清除筛选条件，或搜索其他瓶盖类型。',
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
    heroTitle: 'غطاء زجاجة 5 جالون وزجاجة ماء',
    heroDescription:
      'تصفح أنماط أغطية الزجاجات لمصانع مياه الشرب والموزعين والمستوردين ومشتري الجملة OEM.',
    whatsappQuote: 'عرض سعر واتساب',
    contactUs: 'اتصل بنا',
    featuredImagesLabel: 'صور مميزة لأغطية الزجاجات',
    featuredImageAltLiner: 'غطاء زجاجة أزرق من قطعتين مع بطانة',
    featuredImageAltTwoColor: 'غطاء زجاجة 5 جالون بلونين',
    featuredImageAltReusable: 'غطاء قابل لإعادة الاستخدام مع وسادة إحكام',
    searchLabel: 'البحث عن المنتجات',
    searchPlaceholder: 'ابحث عن غطاء أو بطانة أو قابل لإعادة الاستخدام...',
    filterLabel: 'تصفية أغطية الزجاجات',
    clearFilters: 'مسح التصفية',
    productFeaturesLabel: 'مميزات المنتج',
    whatsapp: 'واتساب',
    emptyTitle: 'لم يتم العثور على أغطية زجاجات',
    emptyText: 'حاول مسح التصفية أو البحث عن نوع آخر من الأغطية.',
    showAllProducts: 'عرض كل المنتجات',
    askForProductQuote: 'اطلب عرض سعر للمنتج',
    previousImageFor: 'عرض الصورة السابقة لـ',
    nextImageFor: 'عرض الصورة التالية لـ',
    zoomImageFor: 'تكبير صورة',
    showImage: 'عرض الصورة',
    thumbnail: 'صورة مصغرة',
  },
};

const productTextTranslations: Partial<
  Record<Exclude<AppLanguage, 'en'>, Record<string, string>>
> = {
  'zh-CN': {
    'All bottle caps': '全部瓶盖',
    'One-time use': '一次性使用',
    Reusable: '可重复使用',
    'With liner': '带内衬',
    'Two-color': '双色',
    Liner: '内衬',
    '8.2g': '8.2 克',
    '10.2g': '10.2 克',
    '8g': '8 克',
    'Inner plug': '内塞',
    'Pull detail': '拉环设计',
    Bulk: '批量供应',
    Blue: '蓝色',
    Distributor: '经销商',
    'Private label': '贴牌',
    OEM: 'OEM',
    Component: '组件',
    Custom: '定制',
    Weight: '重量',
    Height: '高度',
    Use: '用途',
    Bottle: '水桶',
    'One-time': '一次性',
    '5 gallon': '5 加仑',
    '8 g': '8 克',
    '8.2 g': '8.2 克',
    '10.2 g': '10.2 克',
    '35.5 mm': '35.5 毫米',
    '36.2 mm': '36.2 毫米',
    '37.5 mm': '37.5 毫米',
    '1.5 mm': '1.5 毫米',
    '8.2g blue two-piece bottle cap set with liner sealing pad':
      '8.2 克蓝色两件式瓶盖套装，带内衬密封垫',
    'Detailed one-time use cap set with waterproof liner options for export orders.':
      '适合出口订单的一次性瓶盖套装，可选防水内衬。',
    '10.2g large two-color 5 gallon bottle cap':
      '10.2 克大号双色 5 加仑瓶盖',
    'Two-color one-time use cap for buyers needing a heavier 5 gallon bottle cap style.':
      '适合需要较重 5 加仑瓶盖款式买家的一次性双色瓶盖。',
    '8g blue two-piece reusable cap set with sealing pad':
      '8 克蓝色两件式可重复使用瓶盖套装，带密封垫',
    'Reusable two-piece cap set with sealing pad for water bottle supply programmes.':
      '适用于桶装水供应项目的两件式可重复使用瓶盖套装，配有密封垫。',
    '10.2g blue two-color reusable inner cover cap':
      '10.2 克蓝色双色可重复使用内盖瓶盖',
    'Reusable two-color inner cover option with inner plug for 5 gallon water bottles.':
      '适用于 5 加仑水桶的可重复使用双色内盖，带内塞。',
    '10.2g one time use 5 gallon water bottle cap':
      '10.2 克一次性 5 加仑桶装水瓶盖',
    'A one-time use cap option for standard 5 gallon water bottles and factory supply.':
      '适用于标准 5 加仑水桶和工厂供应的一次性瓶盖选项。',
    'one time use 5 gallon water bottle cap assortment':
      '一次性 5 加仑桶装水瓶盖系列',
    'Color options for wholesale buyers who need visible cap branding or line separation.':
      '为需要明显瓶盖品牌识别或生产线区分的批发买家提供多种颜色选择。',
    'One-time use bottle cap': '一次性瓶盖',
    'One time use cap with a slide to open': '带滑动开启设计的一次性瓶盖',
    'One-time use 5 gallon bottle cap with pull detail':
      '带拉环的一次性 5 加仑瓶盖',
    'Reusable cap format for customers who need repeat handling and stable bulk supply.':
      '适合需要稳定批量供应和日常处理的一次性瓶盖款式。',
    'Blue reusable water bottle cap option': '蓝色可重复使用水瓶盖',
    'Blue cap style for standard water bottle applications and distributor supply.':
      '适用于标准桶装水和经销商供应的蓝色瓶盖款式。',
    'Reusable blue 5 gallon cap color options':
      '可重复使用蓝色 5 加仑瓶盖颜色选项',
    'Reusable bottle cap with white liner for leak proof':
      '带白色内衬的可重复使用防漏瓶盖',
    'Orange bottle cap sealing leak proof': '橙色防漏密封瓶盖',
    'Reusable orange cap with sealing liner for leak proof and water bottle supply.':
      '带密封内衬的可重复使用橙色瓶盖，适合防漏和桶装水供应。',
    'Custom 5 gallon water bottle cap colour':
      '定制颜色 5 加仑桶装水瓶盖',
    'Contact us for the colour you wish to order':
      '如需订购指定颜色，请联系我们。',
  },
  ar: {
    'All bottle caps': 'كل أغطية الزجاجات',
    'One-time use': 'استخدام مرة واحدة',
    Reusable: 'قابل لإعادة الاستخدام',
    'With liner': 'مع بطانة',
    'Two-color': 'لونان',
    Liner: 'بطانة',
    '8.2g': '8.2 جم',
    '10.2g': '10.2 جم',
    '8g': '8 جم',
    'Inner plug': 'سدادة داخلية',
    'Pull detail': 'تفصيل سحب',
    Bulk: 'توريد بالجملة',
    Blue: 'أزرق',
    Distributor: 'موزع',
    'Private label': 'علامة خاصة',
    OEM: 'OEM',
    Component: 'مكون',
    Custom: 'مخصص',
    Weight: 'الوزن',
    Height: 'الارتفاع',
    Use: 'الاستخدام',
    Bottle: 'الزجاجة',
    'One-time': 'مرة واحدة',
    '5 gallon': '5 جالون',
    '8 g': '8 جم',
    '8.2 g': '8.2 جم',
    '10.2 g': '10.2 جم',
    '35.5 mm': '35.5 مم',
    '36.2 mm': '36.2 مم',
    '37.5 mm': '37.5 مم',
    '1.5 mm': '1.5 مم',
    '8.2g blue two-piece bottle cap set with liner sealing pad':
      'مجموعة غطاء زجاجة زرقاء من قطعتين وزن 8.2 جم مع بطانة إحكام',
    'Detailed one-time use cap set with waterproof liner options for export orders.':
      'مجموعة غطاء للاستخدام مرة واحدة مع خيارات بطانة مقاومة للماء لطلبات التصدير.',
    '10.2g large two-color 5 gallon bottle cap':
      'غطاء زجاجة 5 جالون كبير بلونين وزن 10.2 جم',
    'Two-color one-time use cap for buyers needing a heavier 5 gallon bottle cap style.':
      'غطاء بلونين للاستخدام مرة واحدة للمشترين الذين يحتاجون إلى غطاء 5 جالون أثقل.',
    '8g blue two-piece reusable cap set with sealing pad':
      'مجموعة غطاء زرقاء قابلة لإعادة الاستخدام من قطعتين وزن 8 جم مع وسادة إحكام',
    'Reusable two-piece cap set with sealing pad for water bottle supply programmes.':
      'مجموعة غطاء قابلة لإعادة الاستخدام من قطعتين مع وسادة إحكام لبرامج توريد زجاجات المياه.',
    '10.2g blue two-color reusable inner cover cap':
      'غطاء داخلي أزرق بلونين قابل لإعادة الاستخدام وزن 10.2 جم',
    'Reusable two-color inner cover option with inner plug for 5 gallon water bottles.':
      'خيار غطاء داخلي بلونين قابل لإعادة الاستخدام مع سدادة داخلية لزجاجات ماء 5 جالون.',
    '10.2g one time use 5 gallon water bottle cap':
      'غطاء زجاجة ماء 5 جالون للاستخدام مرة واحدة وزن 10.2 جم',
    'A one-time use cap option for standard 5 gallon water bottles and factory supply.':
      'خيار غطاء للاستخدام مرة واحدة لزجاجات ماء 5 جالون القياسية وتوريد المصانع.',
    'one time use 5 gallon water bottle cap assortment':
      'تشكيلة أغطية زجاجات ماء 5 جالون للاستخدام مرة واحدة',
    'Color options for wholesale buyers who need visible cap branding or line separation.':
      'خيارات ألوان لمشتري الجملة الذين يحتاجون إلى تمييز واضح للغطاء أو فصل خطوط الإنتاج.',
    'One-time use bottle cap': 'غطاء زجاجة للاستخدام مرة واحدة',
    'One time use cap with a slide to open':
      'غطاء للاستخدام مرة واحدة مع فتحة منزلقة',
    'One-time use 5 gallon bottle cap with pull detail':
      'غطاء 5 جالون للاستخدام مرة واحدة مع تفصيل سحب',
    'Reusable cap format for customers who need repeat handling and stable bulk supply.':
      'نمط غطاء للاستخدام مرة واحدة للعملاء الذين يحتاجون إلى توريد مستقر بالجملة.',
    'Blue reusable water bottle cap option':
      'خيار غطاء زجاجة ماء أزرق قابل لإعادة الاستخدام',
    'Blue cap style for standard water bottle applications and distributor supply.':
      'نمط غطاء أزرق لاستخدامات زجاجات المياه القياسية وتوريد الموزعين.',
    'Reusable blue 5 gallon cap color options':
      'خيارات غطاء 5 جالون أزرق قابل لإعادة الاستخدام',
    'Reusable bottle cap with white liner for leak proof':
      'غطاء زجاجة قابل لإعادة الاستخدام مع بطانة بيضاء لمنع التسرب',
    'Orange bottle cap sealing leak proof':
      'غطاء زجاجة برتقالي محكم مانع للتسرب',
    'Reusable orange cap with sealing liner for leak proof and water bottle supply.':
      'غطاء برتقالي قابل لإعادة الاستخدام مع بطانة إحكام لمنع التسرب وتوريد زجاجات المياه.',
    'Custom 5 gallon water bottle cap colour':
      'لون مخصص لغطاء زجاجة ماء 5 جالون',
    'Contact us for the colour you wish to order':
      'اتصل بنا للون الذي ترغب في طلبه.',
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
  private readonly siteUrl = 'https://www.bottlecapforyou.com';
  private readonly primaryPhone = '+86 15816427686';

  readonly products: ProductListItem[] = [
    {
      id: 11,
      order: 1,
      folder: '12',
      imageCount: 2,
      imageExtension: 'webp',
      featuredImagePath: 'Products/featured/12.webp',
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
      featuredImagePath: 'Products/featured/13.webp',
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
      featuredImagePath: 'Products/featured/14.webp',
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
      featuredImagePath: 'Products/featured/15.webp',
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
  isMobileMenuOpen = false;
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
    this.i18n.setLanguage(language);
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
        return `${count} 个瓶盖产品`;
      case 'ar':
        return `${count} منتج من أغطية الزجاجات`;
      default:
        return count === 1 ? '1 bottle cap' : `${count} bottle caps`;
    }
  }

  whatsappHref(product?: ProductListItem): string {
    const message = this.whatsappMessage(product);
    return `https://wa.me/${this.primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  }

  private productCategoryLabel(category: ProductCategory): string {
    const filter = this.filters.find((item) => item.id === category);
    return filter ? this.filterLabel(filter) : category;
  }

  private productText(text?: string): string {
    return this.productTextForLanguage(text, this.language());
  }

  private productTextForLanguage(
    text: string | undefined,
    language: AppLanguage,
  ): string {
    if (!text || language === 'en') {
      return text ?? '';
    }

    return productTextTranslations[language]?.[text] ?? text;
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
        return '您好，我想咨询你们的 5 加仑桶装水瓶盖。';
      case 'ar':
        return 'مرحبا، أود الاستفسار عن أغطية زجاجات الماء 5 جالون.';
      default:
        return 'Hello, I would like to ask about your 5 gallon bottle caps.';
    }
  }

  private productSeoContent(language: AppLanguage): {
    title: string;
    description: string;
    keywords: string;
    productCategory: string;
  } {
    switch (language) {
      case 'zh-CN':
        return {
          title: '瓶盖产品 | 5 加仑桶装水瓶盖目录',
          description:
            '浏览惠州鼎元盖业塑胶有限公司的 5 加仑桶装水瓶盖、可重复使用瓶盖、一次性瓶盖、密封内衬和双色瓶盖产品。',
          keywords:
            '瓶盖产品, 5 加仑瓶盖目录, 可重复使用瓶盖, 一次性瓶盖, 密封内衬瓶盖, 塑料瓶盖供应商',
          productCategory: '5 加仑桶装水瓶盖',
        };
      case 'ar':
        return {
          title: 'منتجات أغطية الزجاجات | كتالوج أغطية مياه 5 جالون',
          description:
            'تصفح أغطية زجاجات المياه 5 جالون والأغطية القابلة لإعادة الاستخدام والأغطية للاستخدام مرة واحدة وبطانات الإحكام وخيارات الألوان من شركة HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
          keywords:
            'منتجات أغطية الزجاجات, كتالوج أغطية 5 جالون, غطاء قابل لإعادة الاستخدام, غطاء للاستخدام مرة واحدة, غطاء ببطانة إحكام, مورد أغطية بلاستيكية',
          productCategory: 'غطاء زجاجة ماء 5 جالون',
        };
      default:
        return {
          title: 'Bottle Cap Products | 5 Gallon Water Bottle Cap Catalogue',
          description:
            'Browse 5 gallon water bottle caps, reusable caps, one-time use caps, sealing liners and two-color cap options from HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
          keywords:
            'bottle cap products, 5 gallon bottle cap catalogue, reusable bottle cap, one-time use bottle cap, sealing liner bottle cap, plastic bottle cap supplier',
          productCategory: '5 gallon water bottle cap',
        };
    }
  }

  private updateSeo(language: AppLanguage): void {
    const seo = this.productSeoContent(language);
    const title = seo.title;
    const description = seo.description;
    const canonicalUrl = `${this.siteUrl}/products`;
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
          name: this.productTitleForLanguage(product, language),
          description: this.productSummaryForLanguage(product, language),
          image: `${this.siteUrl}/${this.productImagePath(product, 1)}`,
          category: seo.productCategory,
          brand: {
            '@type': 'Brand',
            name: 'Bottle Cap For You',
          },
        },
      })),
    });
  }
}
