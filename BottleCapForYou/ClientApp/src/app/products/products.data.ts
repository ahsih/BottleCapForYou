import { AppLanguage } from '../i18n/translations';

/**
 * Catalogue data shared by the product list, the per-product pages, the
 * prerender route list and the sitemap generator, so all four stay in step.
 */

export type ProductCategory =
  | 'all'
  | 'one-time'
  | 'reusable'
  | 'liner'
  | 'two-color'
  | 'accessories';

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductListItem = {
  id: number;
  /** Permanent URL segment. Never change once a page is indexed. */
  slug: string;
  folder: string;
  order: number;
  imageCount: number;
  imageExtension: 'jpg' | 'webp';
  featuredImagePath?: string;
  imagePaths?: string[];
  title: string;
  summary: string;
  category: Exclude<ProductCategory, 'all'>;
  tags: string[];
  specs: ProductSpec[];
};

const productTextTranslations: Partial<
  Record<Exclude<AppLanguage, 'en'>, Record<string, string>>
> = {
  'zh-CN': {
    'All products': '全部产品',
    'Bottles & accessories': '水桶与配件',
    'All bottle caps': '全部瓶盖',
    'One-time use': '一次性使用',
    Reusable: '可重复使用',
    'With liner': '带内衬',
    'Two-color': '双色',
    Liner: '内衬',
    Premium: '高端款',
    'Single-color': '单色',
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
    'Product range': '产品范围',
    '5 gallon bottles, carrying handles & related accessories':
      '5 加仑水桶、提手及相关配件',
    Options: '可选项',
    'Multiple sizes & colors': '多种尺寸与颜色',
    Service: '服务',
    'OEM customization': 'OEM 定制',
    Supply: '供应方式',
    'Wholesale & export supply': '批发与出口供应',
    Weight: '重量',
    Height: '高度',
    'Cap wall height': '盖壁高度',
    'Cap body height': '盖身高度',
    'Pull tab': '尾巴',
    Use: '用途',
    Bottle: '水桶',
    'One-time': '一次性',
    '5 gallon': '5 加仑',
    '8 g': '8 克',
    '8.2 g': '8.2 克',
    '8.2 g ± 0.2 g': '8.2 克 ± 0.2 克',
    '10.2 g': '10.2 克',
    '11.8–12 g': '11.8–12 克',
    '35.5 mm': '35.5 毫米',
    '36.2 mm': '36.2 毫米',
    '37.5 mm': '37.5 毫米',
    '40 mm': '40 毫米',
    '17 mm': '17 毫米',
    '1.5 mm': '1.5 毫米',
    '8.2g blue two-piece bottle cap set with liner sealing pad':
      '8.2 克蓝色两件式瓶盖套装，带内衬密封垫',
    'Premium single-color cap with inner plug and sealing liner':
      '高端单色加塞加垫盖',
    'High-end single-color non-spill cap fitted with an inner plug and sealing liner for 5 gallon water bottles.':
      '高端单色不漏水瓶盖，配内塞和密封垫片，适用于 5 加仑桶装水。',
    '8.2g blue single-color cap with sealing liner and pull tab':
      '8.2 克蓝色单色带垫片拉环盖',
    'Blue single-color cap with a pull tab and sealing liner for 5 gallon water bottles.':
      '蓝色单色瓶盖，配 17 毫米拉环和密封垫片，适用于 5 加仑桶装水。',
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
    '5 Gallon Water Bottles, Carrying Handles & Packaging Accessories':
      '5 加仑水桶、提手及桶装水包装配件',
    '5 gallon water bottles, carrying handles, and related accessories for bottled-water packaging.':
      '适用于桶装水包装的 5 加仑水桶、提手及相关配件。',
    'One-Piece Carrying Handle for 5 Gallon Water Bottles':
      '一体式 5 加仑桶装水提手',
    'Simple ring-fit carrying handle for easier lifting and handling of standard 5 gallon water bottles.':
      '一体式套环提手，便于提起和搬运标准 5 加仑水桶。',
    Compatibility: '适配范围',
    'Standard 5 gallon bottles': '标准 5 加仑水桶',
    Material: '材质',
    'Moulded plastic': '注塑塑料',
    'Multiple color combinations': '多种配色',
    'One-piece design': '一体式设计',
    'Ring-fit neck mount': '桶口套环安装',
    'Multiple colors & OEM': '多种颜色与 OEM 定制',
    'Handheld Water Bottles in Multiple & Custom Sizes':
      '多尺寸与定制规格手提水桶',
    'Handheld water bottles with integrated side grips, available in a variety of sizes. Custom size requests are welcome for wholesale and OEM orders.':
      '手提水桶配有一体式侧提手，提供多种尺寸。批发与 OEM 订单可按需申请定制尺寸。',
    'Integrated handle': '一体式提手',
    'Multiple sizes': '多种尺寸',
    'Custom sizes available': '可定制尺寸',
    'Product type': '产品类型',
    'Handheld water bottle': '手提水桶',
    'Size options': '尺寸选项',
    'Variety of sizes available': '多种尺寸可选',
    'Custom request': '定制需求',
    'Requested sizes welcome': '可按需申请尺寸',
    'Wholesale & OEM supply': '批发与 OEM 供货',
    'PET Bottle Preforms with Custom Colours': '可定制颜色 PET 瓶坯',
    'PET preforms are the moulded starting form used before stretch blow moulding into finished bottles. Multiple sizes are available, and colours can be customized on request.':
      'PET 瓶坯是拉伸吹塑成成品瓶之前使用的注塑初始坯体。提供多种规格，颜色可按需定制。',
    'Before bottle forming': '成瓶前瓶坯',
    'Multiple preform sizes': '多种瓶坯规格',
    'Custom colours': '颜色可定制',
    Stage: '生产阶段',
    'Preform before bottle blowing': '吹瓶前瓶坯',
    'Colour options': '颜色选项',
    'Custom colours on request': '颜色可按需定制',
    'Custom Plastic Screw Caps for 200ml, 500ml & 1 Litre Bottles':
      '适用于 200 毫升、500 毫升和 1 升瓶的定制塑料旋盖',
    'Custom-size plastic screw caps with a choice of colours and adjustable cap heights, available in bulk for 200ml, 500ml and 1 litre bottles.':
      '定制尺寸塑料旋盖，可选颜色和可调盖高，适用于 200 毫升、500 毫升和 1 升瓶，支持批量供应。',
    'Custom size': '定制尺寸',
    'Adjustable cap height': '可调盖高',
    'Bulk supply': '批量供应',
    'Bottle sizes': '瓶子容量',
    '200ml / 500ml / 1 litre': '200 毫升 / 500 毫升 / 1 升',
    'Cap size': '瓶盖尺寸',
    Colours: '颜色',
    'Cap height': '瓶盖高度',
    Adjustable: '可调',
    '3025 Bottle Cap': '3025 瓶盖',
    '3025 bottle cap supplied in cases of 5,000. The cap must be used with a 30/25 (3025) bottle neck; other neck sizes may result in a loose fit or slippage.':
      '3025 瓶盖，每箱 5,000 个。此瓶盖必须配合 30/25（3025）瓶口使用；其他瓶口规格可能导致瓶盖松动或打滑。',
    Packing: '包装',
    '5,000/case': '5,000 个/箱',
    '30/25 (3025) bottle neck only': '仅适用于 30/25（3025）瓶口',
  },
  ar: {
    'All products': 'كل المنتجات',
    'Bottles & accessories': 'العبوات والملحقات',
    'All bottle caps': 'كل أغطية الزجاجات',
    'One-time use': 'استخدام مرة واحدة',
    Reusable: 'قابل لإعادة الاستخدام',
    'With liner': 'مع بطانة',
    'Two-color': 'لونان',
    Liner: 'بطانة',
    Premium: 'فاخر',
    'Single-color': 'لون واحد',
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
    'Product range': 'نطاق المنتجات',
    '5 gallon bottles, carrying handles & related accessories':
      'عبوات 5 جالون ومقابض حمل وملحقات ذات صلة',
    Options: 'الخيارات',
    'Multiple sizes & colors': 'مقاسات وألوان متعددة',
    Service: 'الخدمة',
    'OEM customization': 'تخصيص OEM',
    Supply: 'التوريد',
    'Wholesale & export supply': 'توريد بالجملة وللتصدير',
    Weight: 'الوزن',
    Height: 'الارتفاع',
    'Cap wall height': 'ارتفاع جدار الغطاء',
    'Cap body height': 'ارتفاع جسم الغطاء',
    'Pull tab': 'لسان السحب',
    Use: 'الاستخدام',
    Bottle: 'الزجاجة',
    'One-time': 'مرة واحدة',
    '5 gallon': '5 جالون',
    '8 g': '8 جم',
    '8.2 g': '8.2 جم',
    '8.2 g ± 0.2 g': '8.2 جم ± 0.2 جم',
    '10.2 g': '10.2 جم',
    '11.8–12 g': '11.8–12 جم',
    '35.5 mm': '35.5 مم',
    '36.2 mm': '36.2 مم',
    '37.5 mm': '37.5 مم',
    '40 mm': '40 مم',
    '17 mm': '17 مم',
    '1.5 mm': '1.5 مم',
    '8.2g blue two-piece bottle cap set with liner sealing pad':
      'مجموعة غطاء زجاجة زرقاء من قطعتين وزن 8.2 جم مع بطانة إحكام',
    'Premium single-color cap with inner plug and sealing liner':
      'غطاء فاخر أحادي اللون مع سدادة داخلية وبطانة إحكام',
    'High-end single-color non-spill cap fitted with an inner plug and sealing liner for 5 gallon water bottles.':
      'غطاء فاخر مانع للانسكاب أحادي اللون، مزود بسدادة داخلية وبطانة إحكام لعبوات المياه سعة 5 جالون.',
    '8.2g blue single-color cap with sealing liner and pull tab':
      'غطاء أزرق أحادي اللون وزن 8.2 جم مع بطانة إحكام ولسان سحب',
    'Blue single-color cap with a pull tab and sealing liner for 5 gallon water bottles.':
      'غطاء أزرق أحادي اللون مزود بلسان سحب وبطانة إحكام لعبوات المياه سعة 5 جالون.',
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
    '5 Gallon Water Bottles, Carrying Handles & Packaging Accessories':
      'عبوات مياه 5 جالون ومقابض حمل وملحقات التعبئة',
    '5 gallon water bottles, carrying handles, and related accessories for bottled-water packaging.':
      'عبوات مياه سعة 5 جالون ومقابض حمل وملحقات ذات صلة لتعبئة المياه المعبأة.',
    'One-Piece Carrying Handle for 5 Gallon Water Bottles':
      'مقبض حمل من قطعة واحدة لعبوات المياه سعة 5 جالون',
    'Simple ring-fit carrying handle for easier lifting and handling of standard 5 gallon water bottles.':
      'مقبض حمل بسيط بحلقة تثبيت لتسهيل رفع ومناولة عبوات المياه القياسية سعة 5 جالون.',
    Compatibility: 'التوافق',
    'Standard 5 gallon bottles': 'عبوات 5 جالون القياسية',
    Material: 'المادة',
    'Moulded plastic': 'بلاستيك مصبوب',
    'Multiple color combinations': 'تركيبات ألوان متعددة',
    'One-piece design': 'تصميم من قطعة واحدة',
    'Ring-fit neck mount': 'حلقة تثبيت حول العنق',
    'Multiple colors & OEM': 'ألوان متعددة وتخصيص OEM',
    'Handheld Water Bottles in Multiple & Custom Sizes':
      'عبوات مياه محمولة بمقاسات متعددة ومخصصة',
    'Handheld water bottles with integrated side grips, available in a variety of sizes. Custom size requests are welcome for wholesale and OEM orders.':
      'عبوات مياه محمولة بمقابض جانبية مدمجة، متوفرة بمجموعة متنوعة من المقاسات. نرحب بطلبات المقاسات المخصصة لطلبات الجملة وOEM.',
    'Integrated handle': 'مقبض مدمج',
    'Multiple sizes': 'مقاسات متعددة',
    'Custom sizes available': 'مقاسات مخصصة متاحة',
    'Product type': 'نوع المنتج',
    'Handheld water bottle': 'عبوة مياه محمولة',
    'Size options': 'خيارات المقاس',
    'Variety of sizes available': 'مجموعة متنوعة من المقاسات',
    'Custom request': 'طلب مخصص',
    'Requested sizes welcome': 'نرحب بالمقاسات المطلوبة',
    'Wholesale & OEM supply': 'توريد بالجملة وOEM',
    'PET Bottle Preforms with Custom Colours':
      'قوالب أولية لعبوات PET بألوان مخصصة',
    'PET preforms are the moulded starting form used before stretch blow moulding into finished bottles. Multiple sizes are available, and colours can be customized on request.':
      'قوالب PET الأولية هي الشكل المصبوب المستخدم قبل النفخ والتمدد لتكوين العبوات النهائية. تتوفر مقاسات متعددة، ويمكن تخصيص الألوان حسب الطلب.',
    'Before bottle forming': 'قبل تشكيل العبوة',
    'Multiple preform sizes': 'مقاسات متعددة للقوالب الأولية',
    'Custom colours': 'ألوان مخصصة',
    Stage: 'مرحلة الإنتاج',
    'Preform before bottle blowing': 'قالب أولي قبل نفخ العبوة',
    'Colour options': 'خيارات الألوان',
    'Custom colours on request': 'ألوان مخصصة حسب الطلب',
    'Custom Plastic Screw Caps for 200ml, 500ml & 1 Litre Bottles':
      'أغطية لولبية بلاستيكية مخصصة لعبوات 200 مل و500 مل و1 لتر',
    'Custom-size plastic screw caps with a choice of colours and adjustable cap heights, available in bulk for 200ml, 500ml and 1 litre bottles.':
      'أغطية لولبية بلاستيكية بمقاسات مخصصة، مع خيارات ألوان وارتفاعات قابلة للتعديل، متوفرة بالجملة لعبوات 200 مل و500 مل و1 لتر.',
    'Custom size': 'مقاس مخصص',
    'Adjustable cap height': 'ارتفاع غطاء قابل للتعديل',
    'Bulk supply': 'توريد بالجملة',
    'Bottle sizes': 'سعات العبوات',
    '200ml / 500ml / 1 litre': '200 مل / 500 مل / 1 لتر',
    'Cap size': 'مقاس الغطاء',
    Colours: 'الألوان',
    'Cap height': 'ارتفاع الغطاء',
    Adjustable: 'قابل للتعديل',
    '3025 Bottle Cap': 'غطاء زجاجة 3025',
    '3025 bottle cap supplied in cases of 5,000. The cap must be used with a 30/25 (3025) bottle neck; other neck sizes may result in a loose fit or slippage.':
      'غطاء زجاجة 3025، يُورّد في عبوات تحتوي على 5,000 قطعة. يجب استخدام الغطاء مع عنق زجاجة 30/25 (3025)؛ فقد يؤدي استخدام مقاس عنق آخر إلى ارتخاء الغطاء أو انزلاقه.',
    Packing: 'التعبئة',
    '5,000/case': '5,000/عبوة',
    '30/25 (3025) bottle neck only': 'عنق زجاجة 30/25 (3025) فقط',
  },
};

export const PRODUCTS: ProductListItem[] = [
  {
    id: 22,
    slug: '3025-bottle-cap',
    order: 0.25,
    folder: '22',
    imageCount: 5,
    imageExtension: 'webp',
    imagePaths: [
      'Products/22/1.webp',
      'Products/22/5.webp',
      'Products/22/2.webp',
      'Products/22/3.webp',
      'Products/22/4.webp',
    ],
    title: '3025 Bottle Cap',
    summary:
      '3025 bottle cap supplied in cases of 5,000. The cap must be used with a 30/25 (3025) bottle neck; other neck sizes may result in a loose fit or slippage.',
    category: 'one-time',
    tags: ['Bulk'],
    specs: [
      { label: 'Packing', value: '5,000/case' },
      { label: 'Compatibility', value: '30/25 (3025) bottle neck only' },
    ],
  },
  {
    id: 20,
    slug: 'premium-cap-inner-plug-liner',
    order: 0.5,
    folder: '20',
    imageCount: 4,
    imageExtension: 'webp',
    featuredImagePath: 'Products/20/1.webp',
    title: 'Premium single-color cap with inner plug and sealing liner',
    summary:
      'High-end single-color non-spill cap fitted with an inner plug and sealing liner for 5 gallon water bottles.',
    category: 'liner',
    tags: ['Premium', 'Single-color', 'Inner plug', 'Liner'],
    specs: [
      { label: 'Weight', value: '11.8–12 g' },
      { label: 'Cap wall height', value: '40 mm' },
      { label: 'Pull tab', value: '17 mm' },
    ],
  },
  {
    id: 21,
    slug: '8-2g-blue-cap-liner-pull-tab',
    order: 0.75,
    folder: '21',
    imageCount: 3,
    imageExtension: 'webp',
    featuredImagePath: 'Products/21/1.webp',
    title: '8.2g blue single-color cap with sealing liner and pull tab',
    summary:
      'Blue single-color cap with a pull tab and sealing liner for 5 gallon water bottles.',
    category: 'liner',
    tags: ['8.2g', 'Single-color', 'Liner', 'Pull detail'],
    specs: [
      { label: 'Weight', value: '8.2 g ± 0.2 g' },
      { label: 'Cap body height', value: '36.2 mm' },
      { label: 'Pull tab', value: '17 mm' },
    ],
  },
  {
    id: 11,
    slug: '8-2g-blue-two-piece-cap-liner',
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
    id: 16,
    slug: 'carrying-handle-5-gallon-bottle',
    order: 2,
    folder: '16',
    imageCount: 3,
    imageExtension: 'webp',
    featuredImagePath: 'Products/16/carry-handle-studio.jpg',
    imagePaths: [
      'Products/16/carry-handle-studio.jpg',
      'Products/16/carry-handle-installed.jpg',
      'Products/16/carry-handle-in-use.jpg',
    ],
    title: 'One-Piece Carrying Handle for 5 Gallon Water Bottles',
    summary:
      'Simple ring-fit carrying handle for easier lifting and handling of standard 5 gallon water bottles.',
    category: 'accessories',
    tags: ['One-piece design', 'Ring-fit neck mount', 'Multiple colors & OEM'],
    specs: [
      { label: 'Compatibility', value: 'Standard 5 gallon bottles' },
      { label: 'Material', value: 'Moulded plastic' },
      { label: 'Options', value: 'Multiple color combinations' },
      { label: 'Supply', value: 'Wholesale & export supply' },
    ],
  },
  {
    id: 19,
    slug: 'custom-screw-caps-200ml-500ml-1l',
    order: 1.5,
    folder: '19',
    imageCount: 6,
    imageExtension: 'webp',
    title: 'Custom Plastic Screw Caps for 200ml, 500ml & 1 Litre Bottles',
    summary:
      'Custom-size plastic screw caps with a choice of colours and adjustable cap heights, available in bulk for 200ml, 500ml and 1 litre bottles.',
    category: 'one-time',
    tags: [
      'Custom size',
      'Custom colours',
      'Adjustable cap height',
      'Bulk supply',
    ],
    specs: [
      { label: 'Bottle sizes', value: '200ml / 500ml / 1 litre' },
      { label: 'Cap size', value: 'Custom size' },
      { label: 'Colours', value: 'Custom colours' },
      { label: 'Cap height', value: 'Adjustable' },
      { label: 'Supply', value: 'Bulk supply' },
    ],
  },
  {
    id: 17,
    slug: 'handheld-water-bottles-custom-sizes',
    order: 2.5,
    folder: '17',
    imageCount: 3,
    imageExtension: 'jpg',
    featuredImagePath: 'Products/17/handheld-bottle-upright.jpg',
    imagePaths: [
      'Products/17/handheld-bottle-upright.jpg',
      'Products/17/handheld-bottle-side.jpg',
      'Products/17/handheld-bottle-sizes.jpg',
    ],
    title: 'Handheld Water Bottles in Multiple & Custom Sizes',
    summary:
      'Handheld water bottles with integrated side grips, available in a variety of sizes. Custom size requests are welcome for wholesale and OEM orders.',
    category: 'accessories',
    tags: ['Integrated handle', 'Multiple sizes', 'Custom sizes available'],
    specs: [
      { label: 'Product type', value: 'Handheld water bottle' },
      { label: 'Size options', value: 'Variety of sizes available' },
      { label: 'Custom request', value: 'Requested sizes welcome' },
      { label: 'Supply', value: 'Wholesale & OEM supply' },
    ],
  },
  {
    id: 18,
    slug: 'pet-bottle-preforms-custom-colours',
    order: 2.75,
    folder: '18',
    imageCount: 3,
    imageExtension: 'jpg',
    featuredImagePath: 'Products/18/pet-preforms-blue.jpg',
    imagePaths: [
      'Products/18/pet-preforms-blue.jpg',
      'Products/18/pet-preforms-sizes.jpg',
      'Products/18/pet-preforms-colours.jpg',
    ],
    title: 'PET Bottle Preforms with Custom Colours',
    summary:
      'PET preforms are the moulded starting form used before stretch blow moulding into finished bottles. Multiple sizes are available, and colours can be customized on request.',
    category: 'accessories',
    tags: [
      'Before bottle forming',
      'Multiple preform sizes',
      'Custom colours',
    ],
    specs: [
      { label: 'Stage', value: 'Preform before bottle blowing' },
      { label: 'Material', value: 'PET' },
      { label: 'Size options', value: 'Multiple preform sizes' },
      { label: 'Colour options', value: 'Custom colours on request' },
    ],
  },
  {
    id: 13,
    slug: '10-2g-two-color-5-gallon-cap',
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
    slug: '8g-blue-reusable-cap-sealing-pad',
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
    slug: '10-2g-blue-two-color-reusable-cap',
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
    slug: '10-2g-one-time-use-5-gallon-cap',
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
    slug: 'one-time-use-5-gallon-cap-assortment',
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
    slug: 'one-time-use-bottle-cap',
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
    slug: 'one-time-use-5-gallon-cap-pull-tab',
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
    slug: 'blue-reusable-water-bottle-cap',
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
    slug: 'reusable-5-gallon-cap-color-options',
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
    slug: 'orange-leak-proof-bottle-cap',
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
    slug: 'custom-5-gallon-cap-colours',
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


/**
 * Human-readable category names. These match the catalogue filter labels, so
 * they already have translations in productTextTranslations.
 */
export const CATEGORY_LABEL: Record<Exclude<ProductCategory, 'all'>, string> = {
  'one-time': 'One-time use',
  reusable: 'Reusable',
  liner: 'With liner',
  'two-color': 'Two-color',
  accessories: 'Bottles & accessories'
};

/** Translates a catalogue string, falling back to the English source text. */
export function translateProductText(text: string | undefined, language: AppLanguage): string {
  if (!text) {
    return '';
  }

  if (language === 'en') {
    return text;
  }

  return productTextTranslations[language]?.[text] ?? text;
}

/** Looks up a product by its URL slug. */
export function productBySlug(slug: string): ProductListItem | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
