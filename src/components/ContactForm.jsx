import { useState } from 'react';
import { submitContactMessage } from '../services/formSubmit.js';

const initialValues = {
  name: '',
  email: '',
  message: '',
  botField: '',
};

function validate(values) {
  const errors = {};

  if (values.botField) errors.botField = 'Botiväli peab tühjaks jääma.';
  if (!values.name.trim()) errors.name = 'Sisesta nimi.';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Sisesta korrektne e-post.';
  if (values.message.trim().length < 8) {
    errors.message = 'Sõnum peab olema vähemalt 8 tähemärki.';
  }

  return errors;
}

function ContactForm() {
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
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitContactMessage(values);
      setValues(initialValues);
      setStatus(result.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-card" name="contact" method="POST" onSubmit={handleSubmit} noValidate>
      <label className="honeypot">
        Ära täida seda välja
        <input name="botField" value={values.botField} onChange={handleChange} tabIndex="-1" />
      </label>
      <h3>Kirjuta meile</h3>
      <label>
        Nimi
        <input name="name" autoComplete="name" value={values.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
        {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
      </label>
      <label>
        E-post
        <input name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
        {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
      </label>
      <label>
        Sõnum
        <textarea name="message" rows="5" value={values.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} />
        {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saadan...' : 'Saada sõnum'}
      </button>
      {status && <p className="success-message" role="status">{status}</p>}
    </form>
  );
}

export default ContactForm;
