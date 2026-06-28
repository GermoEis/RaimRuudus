import { useState } from 'react';
import { submitQuizRegistration } from '../services/formSubmit.js';

const initialValues = {
  teamName: '',
  contactName: '',
  email: '',
  phone: '',
  participants: '2',
  notes: '',
  botField: '',
};

function validate(values) {
  const errors = {};

  if (values.botField) errors.botField = 'Botiväli peab tühjaks jääma.';
  if (!values.teamName.trim()) errors.teamName = 'Sisesta meeskonna nimi.';
  if (!values.contactName.trim()) errors.contactName = 'Sisesta kontaktisiku nimi.';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Sisesta korrektne e-post.';
  if (!values.phone.trim()) errors.phone = 'Sisesta telefoninumber.';

  const participants = Number(values.participants);
  if (!Number.isInteger(participants) || participants < 2 || participants > 6) {
    errors.participants = 'Osalejaid peab olema 2 kuni 6.';
  }

  return errors;
}

function QuizRegistrationForm({ quiz }) {
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
      const result = await submitQuizRegistration(values, quiz);
      setValues(initialValues);
      setStatus(result.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-card" name="quiz-registration" method="POST" onSubmit={handleSubmit} noValidate>
      <label className="honeypot">
        Ära täida seda välja
        <input name="botField" value={values.botField} onChange={handleChange} tabIndex="-1" />
      </label>
      <h3>Registreeri meeskond</h3>
      <p className="form-intro">Jäta kontakt ja kinnitame osalemise esimesel võimalusel.</p>
      <div className="form-grid">
        <label>
          Meeskonna nimi
          <input name="teamName" autoComplete="organization" value={values.teamName} onChange={handleChange} aria-invalid={Boolean(errors.teamName)} />
          {errors.teamName && <span className="field-error" role="alert">{errors.teamName}</span>}
        </label>
        <label>
          Kontaktisiku nimi
          <input name="contactName" autoComplete="name" value={values.contactName} onChange={handleChange} aria-invalid={Boolean(errors.contactName)} />
          {errors.contactName && <span className="field-error" role="alert">{errors.contactName}</span>}
        </label>
        <label>
          E-post
          <input name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
        </label>
        <label>
          Telefon
          <input name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={handleChange} aria-invalid={Boolean(errors.phone)} />
          {errors.phone && <span className="field-error" role="alert">{errors.phone}</span>}
        </label>
        <label>
          Osalejate arv
          <input
            name="participants"
            type="number"
            inputMode="numeric"
            min="2"
            max="6"
            value={values.participants}
            onChange={handleChange}
            aria-invalid={Boolean(errors.participants)}
          />
          {errors.participants && <span className="field-error" role="alert">{errors.participants}</span>}
        </label>
        <label className="full-span">
          Lisainfo / kommentaar
          <textarea name="notes" rows="4" value={values.notes} onChange={handleChange} />
        </label>
      </div>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saadan...' : 'Saada registreering'}
      </button>
      {status && <p className="success-message" role="status">{status}</p>}
      <p className="form-note">
        Kui vormiteenus pole seadistatud, avame e-kirja sinu meiliprogrammis. Formspree endpointi lisamisel saadetakse vorm otse.
      </p>
    </form>
  );
}

export default QuizRegistrationForm;
