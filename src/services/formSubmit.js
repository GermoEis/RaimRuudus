import { loadEditableContent } from '../data/contentStore.js';

const storageKeys = {
  quiz: 'raimRuudusQuizRegistrationsDebug',
  contact: 'raimRuudusContactMessagesDebug',
};

function sanitizeText(value) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .trim();
}

function sanitizePayload(payload) {
  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, sanitizeText(value)]),
  );
}

function shouldStoreDebug(formsConfig) {
  return Boolean(import.meta.env.DEV && formsConfig?.debugLocalStorage);
}

function saveDebugEntry(type, payload, formsConfig) {
  if (!shouldStoreDebug(formsConfig)) return null;

  const key = storageKeys[type];
  const current = JSON.parse(window.localStorage.getItem(key) || '[]');
  const entry = {
    ...payload,
    submittedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(key, JSON.stringify([...current, entry]));
  return entry;
}

async function submitFormspree(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Formspree request failed.');
  }
}

function openMailClient({ to, subject, body }) {
  const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

async function submitConfiguredForm({ type, subject, payload, bodyLines }) {
  const { siteConfig } = loadEditableContent();
  const formsConfig = siteConfig.forms || {};
  const provider = String(formsConfig.provider || 'mailto').toLowerCase();
  const formspreeEndpoint = String(formsConfig.formspreeEndpoint || '').trim();
  const sanitizedPayload = sanitizePayload(payload);

  if (provider === 'formspree' && formspreeEndpoint) {
    await submitFormspree(formspreeEndpoint, {
      formType: type,
      subject,
      ...sanitizedPayload,
    });
    saveDebugEntry(type, sanitizedPayload, formsConfig);
    return {
      method: 'formspree',
      message: 'Aitäh! Vorm saadeti ära ja võtame sinuga ühendust.',
    };
  }

  openMailClient({
    to: siteConfig.contactEmail,
    subject,
    body: bodyLines.join('\n'),
  });
  saveDebugEntry(type, sanitizedPayload, formsConfig);

  return {
    method: 'mailto',
    message: 'Avasime sinu e-posti kliendi. Palun vajuta seal saatmise nuppu, et kiri jõuaks Räim Ruuduseni.',
  };
}

export async function submitQuizRegistration(values, quiz) {
  const payload = {
    ...values,
    eventTitle: quiz.title,
    eventDate: quiz.date,
  };
  const sanitizedPayload = sanitizePayload(payload);

  return submitConfiguredForm({
    type: 'quiz',
    subject: `Viktoriini registreering: ${sanitizedPayload.teamName}`,
    payload: sanitizedPayload,
    bodyLines: [
      `Viktoriin: ${quiz.title}`,
      `Kuupäev: ${quiz.date}`,
      '',
      `Meeskonna nimi: ${sanitizedPayload.teamName}`,
      `Kontaktisik: ${sanitizedPayload.contactName}`,
      `E-post: ${sanitizedPayload.email}`,
      `Telefon: ${sanitizedPayload.phone}`,
      `Osalejate arv: ${sanitizedPayload.participants}`,
      `Lisainfo: ${sanitizedPayload.notes || '-'}`,
    ],
  });
}

export async function submitContactMessage(values) {
  const sanitizedPayload = sanitizePayload(values);

  return submitConfiguredForm({
    type: 'contact',
    subject: `Kontaktivorm: ${sanitizedPayload.name}`,
    payload: sanitizedPayload,
    bodyLines: [
      `Nimi: ${sanitizedPayload.name}`,
      `E-post: ${sanitizedPayload.email}`,
      '',
      sanitizedPayload.message,
    ],
  });
}
