import { loadEditableContent } from '../data/contentStore.js';

const storageKeys = {
  quiz: 'raimRuudusQuizRegistrations',
  contact: 'raimRuudusContactMessages',
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

function saveToMockStorage(type, payload) {
  const key = storageKeys[type];
  const current = JSON.parse(localStorage.getItem(key) || '[]');
  const entry = {
    ...payload,
    submittedAt: new Date().toISOString(),
  };

  localStorage.setItem(key, JSON.stringify([...current, entry]));
  return entry;
}

function encodeFormData(data) {
  return new URLSearchParams(data).toString();
}

async function submitNetlifyForm(formName, payload) {
  const sanitizedPayload = sanitizePayload(payload);

  if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    throw new Error('Netlify Forms works after deployment.');
  }

  await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeFormData({
      'form-name': formName,
      ...sanitizedPayload,
    }),
  });

  return sanitizedPayload;
}

function openMailClient({ subject, body }) {
  const { siteConfig } = loadEditableContent();
  const mailtoUrl = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
}

export async function submitQuizRegistration(values, quiz) {
  const { siteConfig } = loadEditableContent();
  const payload = {
    ...values,
    eventTitle: quiz.title,
    eventDate: quiz.date,
  };
  const sanitizedPayload = sanitizePayload(payload);
  const entry = saveToMockStorage('quiz', sanitizedPayload);

  try {
    await submitNetlifyForm(siteConfig.forms.quizFormName, sanitizedPayload);
  } catch {
    openMailClient({
      subject: `Viktoriini registreering: ${sanitizedPayload.teamName}`,
      body: [
        `Viktoriin: ${quiz.title}`,
        `Kuupäev: ${quiz.date}`,
        '',
        `Meeskonna nimi: ${sanitizedPayload.teamName}`,
        `Kontaktisik: ${sanitizedPayload.contactName}`,
        `E-post: ${sanitizedPayload.email}`,
        `Telefon: ${sanitizedPayload.phone}`,
        `Osalejate arv: ${sanitizedPayload.participants}`,
        `Lisainfo: ${sanitizedPayload.notes || '-'}`,
        '',
        `Kohalik salvestuse aeg: ${entry.submittedAt}`,
      ].join('\n'),
    });
  }

  return entry;
}

export async function submitContactMessage(values) {
  const { siteConfig } = loadEditableContent();
  const sanitizedPayload = sanitizePayload(values);
  const entry = saveToMockStorage('contact', sanitizedPayload);

  try {
    await submitNetlifyForm(siteConfig.forms.contactFormName, sanitizedPayload);
  } catch {
    openMailClient({
      subject: `Kontaktivorm: ${sanitizedPayload.name}`,
      body: [
        `Nimi: ${sanitizedPayload.name}`,
        `E-post: ${sanitizedPayload.email}`,
        '',
        sanitizedPayload.message,
        '',
        `Kohalik salvestuse aeg: ${entry.submittedAt}`,
      ].join('\n'),
    });
  }

  return entry;
}
