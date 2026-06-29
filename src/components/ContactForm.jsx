import { useState } from 'react';
import { submitContactMessage } from '../services/formSubmit.js';

const initialValues = { name: '', email: '', message: '', botField: '' };

const copy = {
  et: {
    honeypot: '\u00c4ra t\u00e4ida seda v\u00e4lja', title: 'Kirjuta meile', name: 'Nimi', email: 'E-post', message: 'S\u00f5num', submitting: 'Saadan...', submit: 'Saada s\u00f5num',
    errors: { botField: 'Botiv\u00e4li peab t\u00fchjaks j\u00e4\u00e4ma.', name: 'Sisesta nimi.', email: 'Sisesta korrektne e-post.', message: 'S\u00f5num peab olema v\u00e4hemalt 8 t\u00e4hem\u00e4rki.' },
  },
  en: {
    honeypot: 'Do not fill this field', title: 'Write to us', name: 'Name', email: 'Email', message: 'Message', submitting: 'Sending...', submit: 'Send message',
    errors: { botField: 'The bot field must stay empty.', name: 'Enter your name.', email: 'Enter a valid email address.', message: 'Message must be at least 8 characters.' },
  },
};

function validate(values, activeCopy) {
  const errors = {};
  if (values.botField) errors.botField = activeCopy.errors.botField;
  if (!values.name.trim()) errors.name = activeCopy.errors.name;
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = activeCopy.errors.email;
  if (values.message.trim().length < 8) errors.message = activeCopy.errors.message;
  return errors;
}

function ContactForm({ lang = 'et' }) {
  const activeCopy = copy[lang] || copy.et;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values, activeCopy);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitContactMessage(values, lang);
      setValues(initialValues);
      setStatus(result.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-card" name="contact" method="POST" onSubmit={handleSubmit} noValidate>
      <label className="honeypot">
        {activeCopy.honeypot}
        <input name="botField" value={values.botField} onChange={handleChange} tabIndex="-1" />
      </label>
      <h3>{activeCopy.title}</h3>
      <label>
        {activeCopy.name}
        <input name="name" autoComplete="name" value={values.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
        {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
      </label>
      <label>
        {activeCopy.email}
        <input name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
        {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
      </label>
      <label>
        {activeCopy.message}
        <textarea name="message" rows="5" value={values.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} />
        {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? activeCopy.submitting : activeCopy.submit}</button>
      {status && <p className="success-message" role="status">{status}</p>}
    </form>
  );
}

export default ContactForm;
