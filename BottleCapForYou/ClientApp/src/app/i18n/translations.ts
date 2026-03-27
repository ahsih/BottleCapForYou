export type AppLanguage = 'en' | 'zh-CN';

export interface SiteTranslations {
  nav: {
    home: string;
    about: string;
    products: string;
    application: string;
    news: string;
    contact: string;
  };
  ui: {
    allProducts: string;
    standards: string;
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
    contactInformation: string;
    yourName: string;
    emailAddress: string;
    message: string;
  };
  brand: {
    company: string;
  };
  hero: {
    tag: string;
    line1: string;
    line2: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  highlights: Array<{
    value: string;
    label: string;
  }>;
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
  standards: Array<{
    date: string;
    title: string;
  }>;
  applications: Array<{
    title: string;
    text: string;
  }>;
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
      application: 'Application',
      news: 'News',
      contact: 'Contact'
    },
    ui: {
      allProducts: 'All Products',
      standards: 'Standards & News',
      partners: 'Partners',
      links: 'Hyperlinks',
      send: 'Submit',
      switchLabel: 'Language',
      languageChinese: 'Switch to Chinese',
      languageEnglish: 'Switch to English',
      homepageLabel: 'Deyi Plastic Chemical homepage',
      addressLabel: 'Address',
      telLabel: 'Tel',
      faxLabel: 'Fax',
      emailLabel: 'Email',
      supplyScope: 'Main Supply Scope',
      videoPlaceholder: 'Video area placeholder inspired by the original homepage.',
      contactInformation: 'Contact information',
      yourName: 'Your name',
      emailAddress: 'Email address',
      message: 'Message'
    },
    brand: {
      company: 'YUYAO DEYI PLASTIC CHEMICAL CO., LTD.'
    },
    hero: {
      tag: 'HIGH-QUALITY SUPPLIER OF PLASTIC RAW MATERIALS',
      line1: 'YUYAO DEYI PLASTIC',
      line2: 'CHEMICAL CO., LTD.',
      subtitle: 'PETG, PCTG, PET, PP, PE, POM, PC and specialty polymers for packaging, household, cosmetic, infant and medical applications.',
      primary: 'Explore Products',
      secondary: 'Contact Us'
    },
    highlights: [
      { value: '20+', label: 'Material categories' },
      { value: '1-stop', label: 'Supply solutions' },
      { value: 'EN/CN', label: 'Bilingual homepage' }
    ],
    heroPanel: [
      'PETG / PCTG',
      'PEEK / PPSU',
      'PP / PE / ABS / PVC',
      'Plastic products and packaging'
    ],
    products: [
      {
        title: 'Eastman Tritan TX1001 / TX2001 / TX1501HF',
        text: 'Excellent clarity, toughness, hydrolytic stability and BPA-free performance for durable transparent products.'
      },
      {
        title: 'SKYGREEN PETG / PCTG',
        text: 'Injection and sheet grades widely used in cosmetic packaging, bottles, household items and transparent components.'
      },
      {
        title: 'PEEK / PPSU / POM / PC',
        text: 'Engineering plastics chosen for heat resistance, chemical stability, mechanical strength and demanding industrial use.'
      },
      {
        title: 'PP / PE / PVC / ABS / PLA',
        text: 'General-purpose and biodegradable resin options to support cost-sensitive, high-volume production lines.'
      }
    ],
    about: {
      title: 'About us',
      paragraphs: [
        'Yuyao Deyi Plastic Chemical Co., Ltd. is a high-quality supplier specializing in plastic raw materials, plastic products and chemicals.',
        'Based on the principle of integrity, we provide customers with one-stop solutions for plastic raw materials, plastic products and chemical related products.'
      ],
      groups: [
        'Engineering plastics: PCTG, PETG, PEEK, PPSU, POM, PC, PET, Nylon PA.',
        'Standard plastics: PVC, ABS, PS, PP, PE.',
        'Biodegradable polymers: PBAT, PBS, PBSA, PBST, PLA.',
        'Plastic products: tube, film, packaging products and related processing support.'
      ],
      asideLabel: 'One-stop solution',
      asideText: 'Engineering plastics, standard plastics, biodegradable polymers and packaging support.'
    },
    standards: [
      {
        date: '2023-10-11',
        title: 'GB 4806.13-2023 National food safety standard for composite materials and products in contact with food'
      },
      {
        date: '2023-10-11',
        title: 'GB 4806.12-2022 National food safety standard for bamboo and wood materials in contact with food'
      },
      {
        date: '2023-10-11',
        title: 'GB 4806.11-2023 National food safety standard for rubber materials and products in contact with food'
      },
      {
        date: '2023-10-11',
        title: 'GB 4806.10-2016 National food safety standard for coatings used in food contact'
      }
    ],
    applications: [
      {
        title: 'Building materials',
        text: 'Used in pipelines, roofing, doors, windows, waterproofing, insulation and reinforcement systems.'
      },
      {
        title: 'Household goods',
        text: 'Suitable for tableware, kitchenware, bathroom products, cleaning tools and decorative goods.'
      },
      {
        title: 'Skin care cosmetics',
        text: 'Crystal-clear, glossy and chemically resistant packaging materials for beauty and personal care brands.'
      },
      {
        title: 'Infant and medical products',
        text: 'Stable-performance resin options for applications that require dependable material behavior and clean appearance.'
      }
    ],
    footer: {
      address: 'Room 705, Building 3, Business Center, China Plastic City, Yuyao, Ningbo, Zhejiang, 315400'
    }
  },
  'zh-CN': {
    nav: {
      home: '首页',
      about: '关于我们',
      products: '产品',
      application: '应用领域',
      news: '新闻',
      contact: '联系我们'
    },
    ui: {
      allProducts: '全部产品',
      standards: '标准与资讯',
      partners: '合作伙伴',
      links: '友情链接',
      send: '提交',
      switchLabel: '语言',
      languageChinese: '切换到中文',
      languageEnglish: '切换到英文',
      homepageLabel: '德益塑化首页',
      addressLabel: '地址',
      telLabel: '电话',
      faxLabel: '传真',
      emailLabel: '邮箱',
      supplyScope: '主要供应范围',
      videoPlaceholder: '参考原网站视频区域的展示占位。',
      contactInformation: '联系方式',
      yourName: '您的姓名',
      emailAddress: '邮箱地址',
      message: '留言内容'
    },
    brand: {
      company: '余姚德益塑化有限公司'
    },
    hero: {
      tag: '高品质塑料原料供应商',
      line1: '余姚德益塑化',
      line2: '有限公司',
      subtitle: '主营 PETG、PCTG、PET、PP、PE、POM、PC 及各类特种聚合物，服务包装、家居、化妆品、母婴与医疗应用。',
      primary: '查看产品',
      secondary: '联系我们'
    },
    highlights: [
      { value: '20+', label: '材料类别' },
      { value: '1-stop', label: '一站式方案' },
      { value: 'EN/CN', label: '双语首页' }
    ],
    heroPanel: [
      'PETG / PCTG',
      'PEEK / PPSU',
      'PP / PE / ABS / PVC',
      '塑料制品与包装'
    ],
    products: [
      {
        title: 'Eastman Tritan TX1001 / TX2001 / TX1501HF',
        text: '透明度高、韧性好、耐水解且不含 BPA，适用于耐用透明制品。'
      },
      {
        title: 'SKYGREEN PETG / PCTG',
        text: '适用于化妆品包装、瓶材、家居用品及透明部件的注塑与片材等级材料。'
      },
      {
        title: 'PEEK / PPSU / POM / PC',
        text: '面向高耐热、耐化学、机械强度及严苛工业场景的工程塑料。'
      },
      {
        title: 'PP / PE / PVC / ABS / PLA',
        text: '覆盖通用与可降解树脂，满足成本敏感型及大批量生产需求。'
      }
    ],
    about: {
      title: '关于我们',
      paragraphs: [
        '余姚德益塑化有限公司是一家专注于塑料原料、塑料制品及化工产品的优质供应商。',
        '公司秉承诚信原则，为客户提供塑料原料、塑料制品及相关化工产品的一站式解决方案。'
      ],
      groups: [
        '工程塑料：PCTG、PETG、PEEK、PPSU、POM、PC、PET、尼龙 PA。',
        '通用塑料：PVC、ABS、PS、PP、PE。',
        '可降解材料：PBAT、PBS、PBSA、PBST、PLA。',
        '塑料制品：管材、薄膜、包装制品及相关加工支持。'
      ],
      asideLabel: '一站式服务',
      asideText: '工程塑料、通用塑料、可降解材料及包装支持。'
    },
    standards: [
      {
        date: '2023-10-11',
        title: 'GB 4806.13-2023 食品安全国家标准 食品接触用复合材料及制品'
      },
      {
        date: '2023-10-11',
        title: 'GB 4806.12-2022 食品安全国家标准 食品接触用竹木材料及制品'
      },
      {
        date: '2023-10-11',
        title: 'GB 4806.11-2023 食品安全国家标准 食品接触用橡胶材料及制品'
      },
      {
        date: '2023-10-11',
        title: 'GB 4806.10-2016 食品安全国家标准 食品接触用涂料及涂层'
      }
    ],
    applications: [
      {
        title: '建筑材料',
        text: '广泛用于管道、屋面、门窗、防水、保温及增强系统。'
      },
      {
        title: '家居用品',
        text: '适用于餐具、厨具、卫浴用品、清洁工具及装饰用品。'
      },
      {
        title: '护肤化妆品',
        text: '适用于美妆个护品牌的高透明、高光泽、耐化学包装材料。'
      },
      {
        title: '母婴与医疗产品',
        text: '面向对材料稳定性与外观洁净度要求较高的母婴及医疗类应用。'
      }
    ],
    footer: {
      address: '浙江省宁波市余姚中国塑料城商务中心 3 号楼 705 室，315400'
    }
  }
};
