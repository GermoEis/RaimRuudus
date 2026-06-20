import { siteConfig } from '../data/siteConfig.js';

const storageKeys = {
  quiz: 'raimRuudusQuizRegistrations',
  contact: 'raimRuudusContactMessages',
};

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

function openMailClient({ subject, body }) {
  const mailtoUrl = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
}

export function submitQuizRegistration(values, quiz) {
  const entry = saveToMockStorage('quiz', values);

  openMailClient({
    subject: `Viktoriini registreering: ${values.teamName}`,
    body: [
      `Viktoriin: ${quiz.title}`,
      `Kuupäev: ${quiz.date}`,
      '',
      `Meeskonna nimi: ${values.teamName}`,
      `Kontaktisik: ${values.contactName}`,
      `E-post: ${values.email}`,
      `Telefon: ${values.phone}`,
      `Osalejate arv: ${values.participants}`,
      `Lisainfo: ${values.notes || '-'}`,
      '',
      `Mock-salvestuse aeg: ${entry.submittedAt}`,
    ].join('\n'),
  });

  return entry;
}

export function submitContactMessage(values) {
  const entry = saveToMockStorage('contact', values);

  openMailClient({
    subject: `Kontaktivorm: ${values.name}`,
    body: [
      `Nimi: ${values.name}`,
      `E-post: ${values.email}`,
      '',
      values.message,
      '',
      `Mock-salvestuse aeg: ${entry.submittedAt}`,
    ].join('\n'),
  });

  return entry;
}
