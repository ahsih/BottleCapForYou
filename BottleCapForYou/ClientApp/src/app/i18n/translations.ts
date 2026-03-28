export type AppLanguage = 'en' | 'zh-CN';

export interface SiteTranslations {
  nav: {
    home: string;
    about: string;
    products: string;
    certifications: string;
    contact: string;
  };
  ui: {
    allProducts: string;
    partners: string;
    links: string;
    send: string;
    switchLabel: string;
    languageChinese: string;
    languageEnglish: string;
    homepageLabel: string;
    addressLabel: string;
    telLabel: string;
    faxLabel: string;
    emailLabel: string;
    supplyScope: string;
    videoPlaceholder: string;
    yourName: string;
    phoneNumber: string;
    emailAddress: string;
    message: string;
    productHint: string;
    productSubtitle: string;
    emailSubject: string;
    senderNameLabel: string;
    senderPhoneLabel: string;
    senderEmailLabel: string;
    senderMessageLabel: string;
    mapsLabel: string;
    amapLabel: string;
    googleMapsLabel: string;
  };
  brand: {
    company: string;
    strapline: string;
  };
  hero: {
    tag: string;
    subtitle: string;
    body: string;
    primary: string;
    secondary: string;
  };
  heroPanel: string[];
  products: Array<{
    title: string;
    text: string;
  }>;
  about: {
    title: string;
    paragraphs: string[];
    groups: string[];
    asideLabel: string;
    asideText: string;
  };
  certifications: {
    title: string;
    eyebrow: string;
    description: string;
  };
  footer: {
    address: string;
  };
}

export const translations: Record<AppLanguage, SiteTranslations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      certifications: 'Certifications',
      contact: 'Contact',
    },
    ui: {
      allProducts: 'All Products',
      partners: 'Partners',
      links: 'Hyperlinks',
      send: 'Submit',
      switchLabel: 'Language',
      languageChinese: 'Switch to Chinese',
      languageEnglish: 'Switch to English',
      homepageLabel: 'DingYuan bottle cap homepage',
      addressLabel: 'Address',
      telLabel: 'Tel',
      faxLabel: 'Fax',
      emailLabel: 'Email',
      supplyScope: 'Main Supply Scope',
      videoPlaceholder: 'End-to-end bottle cap production overview.',
      yourName: 'Your name',
      phoneNumber: 'Phone number',
      emailAddress: 'Email address',
      message: 'Message',
      productHint:
        'Please let us know if there are any other plastic products you would like to make. We can help with those as well.',
      productSubtitle:
        'This 5 gallon water bottle cap is designed for drinking water factories and water production lines. Made of food grade material, safe and non-toxic for drinking water use. Features good sealing, leak-proof and non-spill performance. Fits standard 5 gallon PC water bottles. Suitable for bottled water plants, water production lines and wholesale distributors.',
      emailSubject: 'Bottle Cap Website Enquiry',
      senderNameLabel: 'Name',
      senderPhoneLabel: 'Phone',
      senderEmailLabel: 'Email',
      senderMessageLabel: 'Message',
      mapsLabel: 'Maps',
      amapLabel: 'AMap',
      googleMapsLabel: 'Google Maps',
    },
    brand: {
      company: 'HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
      strapline: 'Your Trusted Bottle Cap Manufacturer',
    },
    hero: {
      tag: 'High Quality Plastic Bottle Cap Manufacturer',
      subtitle: 'Pursuing excellent quality and building high-quality brands.',
      body: 'Dingyuan Gaiye Plastic Co., Ltd. was founded in April 2015, initially focusing on the rubber and plastic products industry. Through years of experience accumulation, the company gradually identified the market demand for bottle caps and plastic products. During this period, the company continuously tried new technologies to improve production efficiency and gradually developed into a comprehensive enterprise integrating plastic product factories and mold production workshops. Customer first: we always prioritize our customers needs, respond quickly, and deliver dependable bottle cap solutions for water factories and bulk buyers.',
      primary: 'Explore Products',
      secondary: 'Contact Us',
    },
    heroPanel: [
      'Food grade material',
      'Leak-proof and non-spill',
      'Fits standard 5 gallon bottles',
      'Suitable for water factories',
      'Durable and safe',
      'Wholesale and bulk supply',
    ],
    products: [
      {
        title: 'Food-Grade Bottle Caps',
        text: 'Manufactured with reliable materials for drinking water packaging and daily high-volume use.',
      },
      {
        title: 'Leak-Proof Cap Design',
        text: 'Designed for secure sealing performance and dependable handling during transport and storage.',
      },
      {
        title: 'Factory Supply Support',
        text: 'Stable production capacity for water plants, distributors and OEM wholesale requirements.',
      },
      {
        title: 'Custom Packaging Solutions',
        text: 'Flexible support for product specifications, packing methods and commercial supply needs.',
      },
    ],
    about: {
      title: 'About us',
      paragraphs: [
        'HuiZhou DingYuan Gaiye Plastic Co., Ltd. focuses on bottle cap manufacturing, product quality and dependable supply support for our customers.',
        'We are committed to stable production, practical service and long-term cooperation, helping clients source bottle cap products with confidence.',
      ],
      groups: [
        'Bottle caps for water packaging and related applications.',
        'Reliable manufacturing process and stable bulk supply.',
        'Support for factories, distributors and wholesale orders.',
        'Practical service focused on quality, speed and consistency.',
      ],
      asideLabel: 'One-stop support',
      asideText:
        'From production to delivery, we support customers with reliable bottle cap manufacturing and wholesale supply.',
    },
    certifications: {
      title: 'ISO certifications',
      eyebrow: 'Certified Quality',
      description:
        'Our company operates with a strong focus on quality control and compliance. We are ISO certified, reflecting our commitment to consistent manufacturing standards, food-safety awareness and professional operating procedures.',
    },
    footer: {
      address:
        'Building 6, Lvquan Intelligent Garden, Huangdong Village, Zhenlong Town, Huiyang District, Huizhou City, Guangdong Province, China.',
    },
  },
  'zh-CN': {
    nav: {
      home: '首页',
      about: '关于我们',
      products: '产品',
      certifications: '资质证书',
      contact: '联系我们',
    },
    ui: {
      allProducts: '查看全部产品',
      partners: '合作伙伴',
      links: '相关链接',
      send: '提交',
      switchLabel: '语言切换',
      languageChinese: '切换到中文',
      languageEnglish: '切换到英文',
      homepageLabel: '鼎源盖业首页',
      addressLabel: '地址',
      telLabel: '电话',
      faxLabel: '传真',
      emailLabel: '邮箱',
      supplyScope: '主要供应范围',
      videoPlaceholder: '瓶盖生产流程展示视频。',
      yourName: '您的姓名',
      phoneNumber: '电话号码',
      emailAddress: '邮箱地址',
      message: '留言内容',
      productHint:
        '如果您还有其他想要定制的塑料产品，请告诉我们，我们也可以提供相关帮助。',
      productSubtitle:
        '这款 5 加仑水瓶盖专为饮用水工厂和桶装水生产线设计。采用食品级材料制成，安全无毒，适用于饮用水使用。具有良好的密封性，防漏防溢。适配标准 5 加仑 PC 水桶。适用于桶装水工厂、饮用水生产线及批发经销商。',
      emailSubject: '瓶盖网站咨询',
      senderNameLabel: '姓名',
      senderPhoneLabel: '电话',
      senderEmailLabel: '邮箱',
      senderMessageLabel: '留言',
      mapsLabel: '地图导航',
      amapLabel: '高德地图',
      googleMapsLabel: '谷歌地图',
    },
    brand: {
      company: '惠州鼎源盖业塑胶有限公司',
      strapline: '值得信赖的瓶盖制造商',
    },
    hero: {
      tag: '高品质塑料瓶盖制造商',
      subtitle: '追求卓越品质，打造高质量品牌。',
      body: '惠州鼎源盖业塑胶有限公司成立于2015年4月，初期专注于橡胶和塑料产品行业。通过多年的经验积累，公司逐渐识别出瓶盖和塑料产品市场的潜在需求。在此期间，公司不断尝试新技术以提高生产效率，并逐步发展成为一家集塑料产品工厂和模具生产车间于一体的综合性企业。客户至上：我们始终把客户需求放在首位，快速响应客户要求，为水厂和批量采购客户提供可靠的瓶盖解决方案。',
      primary: '查看产品',
      secondary: '联系我们',
    },
    heroPanel: [
      '食品级材料',
      '防漏防溢设计',
      '适配标准 5 加仑水桶',
      '适用于各类水厂',
      '耐用安全',
      '支持批发与大货供应',
    ],
    products: [
      {
        title: '食品级瓶盖产品',
        text: '采用可靠材料制造，适用于饮用水包装及日常大批量使用场景。',
      },
      {
        title: '防漏密封结构',
        text: '注重密封表现，在运输、储存和使用过程中更稳定可靠。',
      },
      {
        title: '工厂供货支持',
        text: '为水厂、经销商及 OEM 批发客户提供稳定产能和供应支持。',
      },
      {
        title: '定制包装方案',
        text: '可根据产品规格、包装方式及商业需求提供灵活配套服务。',
      },
    ],
    about: {
      title: '关于我们',
      paragraphs: [
        '惠州鼎源盖业塑胶有限公司专注于瓶盖制造、产品质量控制以及为客户提供稳定可靠的供应服务。',
        '我们坚持稳定生产、务实服务和长期合作，帮助客户更安心地采购瓶盖产品。',
      ],
      groups: [
        '适用于饮用水包装及相关场景的瓶盖产品。',
        '稳定的生产流程与批量供货能力。',
        '支持工厂、经销商及批发订单需求。',
        '以品质、效率与稳定性为核心的服务理念。',
      ],
      asideLabel: '一站式支持',
      asideText: '从生产到交付，我们为客户提供可靠的瓶盖制造与批发供应支持。',
    },
    certifications: {
      title: 'ISO 资质认证',
      eyebrow: '认证与品质',
      description:
        '公司高度重视质量管理与规范化运营，已获得 ISO 相关认证，体现了我们在制造标准、食品安全意识以及专业管理流程方面的持续承诺。',
    },
    footer: {
      address: '惠州市惠阳区镇隆镇黄洞村绿全智造园6栋',
    },
  },
};
