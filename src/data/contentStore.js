import { drinkCategories } from './drinks.js';
import { nextQuiz, upcomingEvents } from './events.js';
import { faqItems } from './faq.js';
import { galleryItems } from './gallery.js';
import { siteConfig } from './siteConfig.js';

export const contentStorageKey = 'raimRuudusEditableContent';

export const defaultContent = {
  siteConfig,
  nextQuiz,
  upcomingEvents,
  drinkCategories,
  faqItems,
  galleryItems,
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function containsCorruptedText(value) {
  if (typeof value === 'string') {
    return /R\?|men\?\?|s\?nd|n\?itus|v\?ike|\?\?res|protot\?\?p/.test(value);
  }

  if (Array.isArray(value)) {
    return value.some(containsCorruptedText);
  }

  if (value && typeof value === 'object') {
    return Object.values(value).some(containsCorruptedText);
  }

  return false;
}

export function mergeContent(savedContent = {}) {
  return {
    ...defaultContent,
    ...savedContent,
    siteConfig: {
      ...defaultContent.siteConfig,
      ...(savedContent.siteConfig || {}),
      openingInfo: {
        ...defaultContent.siteConfig.openingInfo,
        ...(savedContent.siteConfig?.openingInfo || {}),
      },
      travel: {
        ...defaultContent.siteConfig.travel,
        ...(savedContent.siteConfig?.travel || {}),
      },
      forms: {
        ...defaultContent.siteConfig.forms,
        ...(savedContent.siteConfig?.forms || {}),
      },
      social: {
        ...defaultContent.siteConfig.social,
        ...(savedContent.siteConfig?.social || {}),
      },
    },
  };
}

export function loadEditableContent() {
  if (!canUseStorage()) return defaultContent;

  try {
    const saved = window.localStorage.getItem(contentStorageKey);
    if (!saved) return defaultContent;

    const parsed = JSON.parse(saved);
    if (containsCorruptedText(parsed)) {
      window.localStorage.removeItem(contentStorageKey);
      return defaultContent;
    }

    return mergeContent(parsed);
  } catch {
    return defaultContent;
  }
}

export function saveEditableContent(content) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(contentStorageKey, JSON.stringify(content));
}

export function clearEditableContent() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(contentStorageKey);
}
