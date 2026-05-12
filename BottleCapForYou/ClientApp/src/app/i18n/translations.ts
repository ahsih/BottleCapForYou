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
    sending: string;
    submitSuccess: string;
    submitError: string;
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
      yourName: 'Your name',
      phoneNumber: 'Phone number',
      emailAddress: 'Email address',
      message: 'Message',
      productHint:
        'Tell us your bottle cap size, quantity and packing requirements. We support OEM production, wholesale supply and export orders.',
      productSubtitle:
        'We manufacture 5 gallon water bottle caps for drinking water factories, distributors and OEM buyers. Our bottle caps use food-grade material and are designed for leak-resistant sealing, daily factory use and export supply. Suitable for standard 5 gallon PC water bottles and bulk commercial purchasing.',
      emailSubject: 'Bottle Cap Website Enquiry',
      senderNameLabel: 'Name',
      senderPhoneLabel: 'Phone',
      senderEmailLabel: 'Email',
      senderMessageLabel: 'Message',
      sending: 'Sending...',
      submitSuccess: 'Thanks, your message has been sent successfully.',
      submitError:
        'Sorry, we could not send your message right now. Please try again shortly.',
      mapsLabel: 'Maps',
      amapLabel: 'AMap',
      googleMapsLabel: 'Google Maps',
    },
    brand: {
      company: 'HuiZhou DingYuan Gaiye Plastic Co., Ltd.',
      strapline: 'Large 5 Gallon Bottle Cap Manufacturer in China',
    },
    hero: {
      tag: 'China Bottle Cap Manufacturer for B2B Buyers',
      subtitle: 'Bottle cap factory in China for water plants, distributors, importers and OEM wholesale buyers.',
      body: 'HuiZhou DingYuan Gaiye Plastic Co., Ltd. is a plastic bottle cap manufacturer in Guangdong, China specializing in 5 gallon water bottle caps, reusable caps, one-time use caps, sealing liners and related plastic closures. Since 2015, we have supported bottled water factories and wholesale buyers with stable production, practical packing options and export-ready supply.',
      primary: 'Explore Products',
      secondary: 'Contact Us',
    },
      heroPanel: [
        'Food grade material',
        'Leak-proof and non-spill',
        'Fits standard 5 gallon bottles',
        'Suitable for water factories',
        'OEM and private-label support',
        'Wholesale and export supply',
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
        'HuiZhou DingYuan Gaiye Plastic Co., Ltd. is a plastic bottle cap manufacturer in China focused on production quality, stable lead times and dependable export supply.',
        'We support bottled water factories, distributors and private-label buyers looking for a reliable supplier of large bottle caps, 5 gallon water bottle caps and matching sealing components.',
      ],
      groups: [
        'Large bottle caps for 5 gallon water bottles and related water packaging applications.',
        'Reliable manufacturing process, food-grade materials and stable bulk supply.',
        'Support for factories, distributors, importers and wholesale OEM orders.',
        'Practical service focused on quality, response speed and consistency.',
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
      homepageLabel: '鼎元盖业首页',
      addressLabel: '地址',
      telLabel: '电话',
      faxLabel: '传真',
      emailLabel: '邮箱',
      supplyScope: '主要供应范围',
      yourName: '您的姓名',
      phoneNumber: '电话号码',
      emailAddress: '邮箱地址',
      message: '留言内容',
      productHint:
        '请告诉我们您需要的瓶盖尺寸、数量和包装要求，我们支持 OEM 生产、批发供货和出口订单。',
      productSubtitle:
        '我们为饮用水工厂、经销商和 OEM 客户生产 5 加仑桶装水瓶盖。产品采用食品级材料，注重密封、防漏和日常生产使用表现，适配标准 5 加仑 PC 水桶，适合批量采购与出口供货。',
      emailSubject: '瓶盖网站咨询',
      senderNameLabel: '姓名',
      senderPhoneLabel: '电话',
      senderEmailLabel: '邮箱',
      senderMessageLabel: '留言',
      sending: '发送中...',
      submitSuccess: '感谢您的留言，消息已成功发送。',
      submitError: '抱歉，暂时无法发送您的留言，请稍后再试。',
      mapsLabel: '地图导航',
      amapLabel: '高德地图',
      googleMapsLabel: '谷歌地图',
    },
    brand: {
      company: '惠州鼎元盖业塑胶有限公司',
      strapline: '中国大型5加仑瓶盖制造商',
    },
    hero: {
      tag: '面向 B2B 客户的中国瓶盖制造商',
      subtitle: '服务于水厂、经销商、进口商和 OEM 客户的瓶盖工厂。',
      body: '惠州鼎元盖业塑胶有限公司位于中国广东，专注于 5 加仑桶装水瓶盖、可重复使用瓶盖、一次性瓶盖、密封垫片及相关塑胶配件的生产。自 2015 年以来，我们持续为桶装水工厂、批发采购商和出口客户提供稳定产能、实用包装方案和可靠供货支持。',
      primary: '查看产品',
      secondary: '联系我们',
    },
      heroPanel: [
        '食品级材料',
        '防漏防溢设计',
        '适配标准 5 加仑水桶',
        '适用于各类水厂',
        '支持 OEM 与贴牌',
        '支持批发与出口供货',
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
        '惠州鼎元盖业塑胶有限公司是一家专注于塑料瓶盖生产的中国制造商，重视产品质量、交期稳定和出口供货能力。',
        '我们服务于桶装水工厂、经销商和贴牌采购客户，提供大型瓶盖、5加仑桶装水瓶盖以及配套密封组件的稳定供应。',
      ],
      groups: [
        '适用于 5 加仑桶装水及相关饮用水包装场景的大型瓶盖产品。',
        '食品级材料、稳定生产流程与批量供货能力。',
        '支持工厂、经销商、进口商及 OEM 批发订单需求。',
        '以品质、响应速度与稳定交付为核心的服务理念。',
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
