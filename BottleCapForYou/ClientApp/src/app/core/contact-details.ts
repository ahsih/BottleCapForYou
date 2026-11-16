import { AppLanguage } from '../i18n/translations';

/** The factory's WhatsApp number. Also the number shown and dialled on the site. */
export const CONTACT_PHONE = '+86 15816427686';
export const CONTACT_EMAIL = 'jack.zhang@bottlecapforyou.com';

/**
 * The opening line a buyer sends.
 *
 * A bare wa.me link drops the visitor into an empty chat with an unknown
 * +86 number and nothing to say, which is where most of them give up. Arriving
 * with the message already written turns the tap into a sent enquiry.
 */
const OPENING_MESSAGE: Record<AppLanguage, string> = {
  en: 'Hello, I would like to ask about your 5 gallon bottle caps and packaging accessories.',
  'zh-CN': '您好，我想咨询你们的 5 加仑桶装水瓶盖和包装配件。',
  ar: 'مرحبا، أود الاستفسار عن أغطية عبوات المياه سعة 5 جالون وملحقات التعبئة.',
};

/** Builds a wa.me link that opens with the enquiry already typed out. */
export function whatsappUrl(
  phone: string = CONTACT_PHONE,
  language: AppLanguage = 'en',
  message?: string,
): string {
  const number = phone.replace(/\D/g, '');
  const text = message ?? OPENING_MESSAGE[language];

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** The opening line on its own, for callers that want to extend it. */
export function whatsappOpeningMessage(language: AppLanguage): string {
  return OPENING_MESSAGE[language];
}
