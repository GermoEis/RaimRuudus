export const supportedLanguages = ['et', 'en'];

export const languageLabels = {
  et: 'EE',
  en: 'ENG',
};

export function normalizeLanguage(value) {
  return value === 'en' ? 'en' : 'et';
}

export const englishSiteCopy = {
  tagline: 'A small bar by the open sea',
  openingInfo: {
    title: 'Open seasonally and during events',
    exhibition: 'The "Meri t\u00f5i" exhibition is open during bar opening hours and is free.',
    appointment: 'Visits can be arranged by phone if needed.',
  },
  travel: {
    title: 'How to get to Naissaar',
    text: 'Naissaar is reached by boat. Check departure times and ticket information before you travel, because island life follows the weather and seasonal schedules.',
  },
};

export const englishFaqItems = [
  { question: 'Can I pay by card?', answer: 'Yes, card payment is available. When visiting a small island, it is still worth bringing a little cash just in case.' },
  { question: 'Are children welcome?', answer: 'Yes, children are welcome. The "Meri t\u00f5i" exhibition is free for visitors.' },
  { question: 'Can I come with a dog?', answer: 'Yes, calm four-legged companions are welcome. Please be considerate of other guests and the island environment.' },
  { question: 'Should groups book in advance?', answer: 'Smaller groups can come without prior notice. For a larger group or special request, please write ahead so we can prepare better.' },
  { question: 'When is the exhibition open?', answer: 'The "Meri t\u00f5i" exhibition is open during bar opening hours. Visits can also be arranged by phone or email if needed.' },
  { question: 'How do I get to Naissaar?', answer: 'Naissaar is reached by boat. Check the timetable and tickets before travelling, because the schedule is seasonal and depends on sea conditions.' },
];

export function localizeContent(content, lang) {
  if (normalizeLanguage(lang) !== 'en') return content;

  return {
    ...content,
    siteConfig: {
      ...content.siteConfig,
      tagline: englishSiteCopy.tagline,
      openingInfo: englishSiteCopy.openingInfo,
      travel: {
        ...content.siteConfig.travel,
        ...englishSiteCopy.travel,
      },
    },
    faqItems: englishFaqItems,
  };
}
