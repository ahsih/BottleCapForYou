import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Locale = 'en' | 'zh';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  language: Locale = 'en';

  readonly labels = {
    en: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      application: 'Application',
      news: 'News',
      contact: 'Contact',
      allProducts: 'All Products',
      standards: 'Standards & News',
      partners: 'Cooperator',
      links: 'Hyperlinks',
      send: 'Submit',
      switchLabel: 'Language',
      addressLabel: 'Address',
      telLabel: 'Tel',
      faxLabel: 'Fax',
      emailLabel: 'Email'
    },
    zh: {
      home: '首页',
      about: '关于我们',
      products: '产品',
      application: '应用领域',
      news: '新闻',
      contact: '联系我们',
      allProducts: '全部产品',
      standards: '标准与资讯',
      partners: '合作伙伴',
      links: '友情链接',
      send: '提交',
      switchLabel: '语言',
      addressLabel: '地址',
      telLabel: '电话',
      faxLabel: '传真',
      emailLabel: '邮箱'
    }
  };

  readonly hero = {
    en: {
      line1: 'YUYAO DEYI PLASTIC',
      line2: 'CHEMICAL CO., LTD.',
      subtitle: 'PETG, PCTG, PET, PP, PE, POM, PC and specialty polymers for packaging, household, cosmetic, infant and medical applications.',
      primary: 'Explore Products',
      secondary: 'Contact Us'
    },
    zh: {
      line1: '余姚德益塑化',
      line2: '有限公司',
      subtitle: '主营 PETG、PCTG、PET、PP、PE、POM、PC 及各类特种聚合物，服务包装、家居、化妆品、母婴与医疗应用。',
      primary: '查看产品',
      secondary: '联系我们'
    }
  };

  readonly highlights = [
    {
      value: '20+',
      en: 'Material categories',
      zh: '材料类别'
    },
    {
      value: '1-stop',
      en: 'Supply solutions',
      zh: '一站式方案'
    },
    {
      value: 'EN/CN',
      en: 'Bilingual homepage',
      zh: '双语首页'
    }
  ];

  readonly productCards = [
    {
      enTitle: 'Eastman Tritan TX1001 / TX2001 / TX1501HF',
      zhTitle: 'Eastman Tritan TX1001 / TX2001 / TX1501HF',
      enText: 'Excellent clarity, toughness, hydrolytic stability and BPA-free performance for durable transparent products.',
      zhText: '透明度高、韧性好、耐水解且不含 BPA，适用于耐用透明制品。'
    },
    {
      enTitle: 'SKYGREEN PETG / PCTG',
      zhTitle: 'SKYGREEN PETG / PCTG',
      enText: 'Injection and sheet grades widely used in cosmetic packaging, bottles, household items and transparent components.',
      zhText: '适用于化妆品包装、瓶材、家居用品及透明部件的注塑与片材等级材料。'
    },
    {
      enTitle: 'PEEK / PPSU / POM / PC',
      zhTitle: 'PEEK / PPSU / POM / PC',
      enText: 'Engineering plastics chosen for heat resistance, chemical stability, mechanical strength and demanding industrial use.',
      zhText: '面向高耐热、耐化学、机械强度及严苛工业场景的工程塑料。'
    },
    {
      enTitle: 'PP / PE / PVC / ABS / PLA',
      zhTitle: 'PP / PE / PVC / ABS / PLA',
      enText: 'General-purpose and biodegradable resin options to support cost-sensitive, high-volume production lines.',
      zhText: '覆盖通用与可降解树脂，满足成本敏感型及大批量生产需求。'
    }
  ];

  readonly about = {
    en: {
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
      ]
    },
    zh: {
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
      ]
    }
  };

  readonly standards = [
    {
      date: '2023-10-11',
      en: 'GB 4806.13-2023 National food safety standard for composite materials and products in contact with food',
      zh: 'GB 4806.13-2023 食品安全国家标准 食品接触用复合材料及制品'
    },
    {
      date: '2023-10-11',
      en: 'GB 4806.12-2022 National food safety standard for bamboo and wood materials in contact with food',
      zh: 'GB 4806.12-2022 食品安全国家标准 食品接触用竹木材料及制品'
    },
    {
      date: '2023-10-11',
      en: 'GB 4806.11-2023 National food safety standard for rubber materials and products in contact with food',
      zh: 'GB 4806.11-2023 食品安全国家标准 食品接触用橡胶材料及制品'
    },
    {
      date: '2023-10-11',
      en: 'GB 4806.10-2016 National food safety standard for coatings used in food contact',
      zh: 'GB 4806.10-2016 食品安全国家标准 食品接触用涂料及涂层'
    }
  ];

  readonly applications = [
    {
      enTitle: 'Building materials',
      zhTitle: '建筑材料',
      enText: 'Used in pipelines, roofing, doors, windows, waterproofing, insulation and reinforcement systems.',
      zhText: '广泛用于管道、屋面、门窗、防水、保温及增强系统。'
    },
    {
      enTitle: 'Household goods',
      zhTitle: '家居用品',
      enText: 'Suitable for tableware, kitchenware, bathroom products, cleaning tools and decorative goods.',
      zhText: '适用于餐具、厨具、卫浴用品、清洁工具及装饰用品。'
    },
    {
      enTitle: 'Skin care cosmetics',
      zhTitle: '护肤化妆品',
      enText: 'Crystal-clear, glossy and chemically resistant packaging materials for beauty and personal care brands.',
      zhText: '适用于美妆个护品牌的高透明、高光泽、耐化学包装材料。'
    },
    {
      enTitle: 'Infant and medical products',
      zhTitle: '母婴与医疗产品',
      enText: 'Stable-performance resin options for applications that require dependable material behavior and clean appearance.',
      zhText: '面向对材料稳定性与外观洁净度要求较高的母婴及医疗类应用。'
    }
  ];

  readonly partners = ['SK chemicals', 'EASTMAN', 'CHINA RESOURCES', 'LOTTE', 'SABIC', 'BASF'];

  readonly links = ['PETG', 'PCTG', 'PEEK', 'PPSU'];

  readonly contact = {
    phones: ['+86 188 9267 2536', '+86 0574 6253 2768'],
    fax: '0574-62532768',
    email: 'admin@dyplas.com',
    addressEn: 'Room 705, Building 3, Business Center, China Plastic City, Yuyao, Ningbo, Zhejiang, 315400',
    addressZh: '浙江省宁波市余姚中国塑料城商务中心 3 号楼 705 室，315400'
  };

  setLanguage(language: Locale): void {
    this.language = language;
  }

  t(key: keyof typeof this.labels.en): string {
    return this.labels[this.language][key];
  }

  localized(en: string, zh: string): string {
    return this.language === 'en' ? en : zh;
  }
}
