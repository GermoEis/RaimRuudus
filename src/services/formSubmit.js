import { loadEditableContent } from '../data/contentStore.js';
import { normalizeLanguage } from '../data/language.js';

const storageKeys = { quiz: 'raimRuudusQuizRegistrationsDebug', contact: 'raimRuudusContactMessagesDebug' };

const messages = {
  et: {
    sent: 'Ait\u00e4h! Vorm saadeti \u00e4ra ja v\u00f5tame sinuga \u00fchendust.',
    mailto: 'Avasime sinu e-posti kliendi. Palun vajuta seal saatmise nuppu, et kiri j\u00f5uaks R\u00e4im Ruuduseni.',
    contactSubject: 'Kontaktivorm', quizSubject: 'Viktoriini registreering',
    fields: { name: 'Nimi', email: 'E-post', quiz: 'Viktoriin', date: 'Kuup\u00e4ev', teamName: 'Meeskonna nimi', contactName: 'Kontaktisik', phone: 'Telefon', participants: 'Osalejate arv', notes: 'Lisainfo' },
  },
  en: {
    sent: 'Thank you. The form was sent and we will get back to you.',
    mailto: 'We opened your email client. Please press send there so the message reaches R\u00e4im Ruudus.',
    contactSubject: 'Contact form', quizSubject: 'Quiz registration',
    fields: { name: 'Name', email: 'Email', quiz: 'Quiz', date: 'Date', teamName: 'Team name', contactName: 'Contact person', phone: 'Phone', participants: 'Participants', notes: 'Additional info' },
  },
};

function sanitizeText(value) { return String(value || '').replace(/[<>]/g, '').trim(); }
function sanitizePayload(payload) { return Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, sanitizeText(value)])); }
function shouldStoreDebug(formsConfig) { return Boolean(import.meta.env.DEV && formsConfig?.debugLocalStorage); }
function saveDebugEntry(type, payload, formsConfig) {
  if (!shouldStoreDebug(formsConfig)) return null;
  const key = storageKeys[type];
  const current = JSON.parse(window.localStorage.getItem(key) || '[]');
  const entry = { ...payload, submittedAt: new Date().toISOString() };
  window.localStorage.setItem(key, JSON.stringify([...current, entry]));
  return entry;
}

async function submitFormspree(endpoint, payload) {
  const response = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error('Formspree request failed.');
}

function openMailClient({ to, subject, body }) {
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function submitConfiguredForm({ type, subject, payload, bodyLines, lang = 'et' }) {
  const { siteConfig } = loadEditableContent();
  const formsConfig = siteConfig.forms || {};
  const provider = String(formsConfig.provider || 'mailto').toLowerCase();
  const formspreeEndpoint = String(formsConfig.formspreeEndpoint || '').trim();
  const sanitizedPayload = sanitizePayload(payload);
  const copy = messages[normalizeLanguage(lang)];

  if (provider === 'formspree' && formspreeEndpoint) {
    await submitFormspree(formspreeEndpoint, { formType: type, subject, ...sanitizedPayload });
    saveDebugEntry(type, sanitizedPayload, formsConfig);
    return { method: 'formspree', message: copy.sent };
  }

  openMailClient({ to: siteConfig.contactEmail, subject, body: bodyLines.join('\n') });
  saveDebugEntry(type, sanitizedPayload, formsConfig);
  return { method: 'mailto', message: copy.mailto };
}

export async function submitQuizRegistration(values, quiz, lang = 'et') {
  const copy = messages[normalizeLanguage(lang)];
  const sanitizedPayload = sanitizePayload({ ...values, eventTitle: quiz.title, eventDate: quiz.date });
  return submitConfiguredForm({
    type: 'quiz', lang, subject: `${copy.quizSubject}: ${sanitizedPayload.teamName}`, payload: sanitizedPayload,
    bodyLines: [`${copy.fields.quiz}: ${quiz.title}`, `${copy.fields.date}: ${quiz.date}`, '', `${copy.fields.teamName}: ${sanitizedPayload.teamName}`, `${copy.fields.contactName}: ${sanitizedPayload.contactName}`, `${copy.fields.email}: ${sanitizedPayload.email}`, `${copy.fields.phone}: ${sanitizedPayload.phone}`, `${copy.fields.participants}: ${sanitizedPayload.participants}`, `${copy.fields.notes}: ${sanitizedPayload.notes || '-'}`],
  });
}

export async function submitContactMessage(values, lang = 'et') {
  const copy = messages[normalizeLanguage(lang)];
  const sanitizedPayload = sanitizePayload(values);
  return submitConfiguredForm({
    type: 'contact', lang, subject: `${copy.contactSubject}: ${sanitizedPayload.name}`, payload: sanitizedPayload,
    bodyLines: [`${copy.fields.name}: ${sanitizedPayload.name}`, `${copy.fields.email}: ${sanitizedPayload.email}`, '', sanitizedPayload.message],
  });
}
