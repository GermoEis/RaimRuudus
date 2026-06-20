import { useState } from 'react';
import { submitQuizRegistration } from '../services/formSubmit.js';

const initialValues = {
  teamName: '',
  contactName: '',
  email: '',
  phone: '',
  participants: '2',
  notes: '',
};

function validate(values) {
  const errors = {};

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

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('');
      return;
    }

    submitQuizRegistration(values, quiz);
    setValues(initialValues);
    setStatus('Registreering saadetud!');
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h3>Registreeri meeskond</h3>
      <div className="form-grid">
        <label>
          Meeskonna nimi
          <input name="teamName" value={values.teamName} onChange={handleChange} />
          {errors.teamName && <span className="field-error">{errors.teamName}</span>}
        </label>
        <label>
          Kontaktisiku nimi
          <input name="contactName" value={values.contactName} onChange={handleChange} />
          {errors.contactName && <span className="field-error">{errors.contactName}</span>}
        </label>
        <label>
          E-post
          <input name="email" type="email" value={values.email} onChange={handleChange} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <label>
          Telefon
          <input name="phone" type="tel" value={values.phone} onChange={handleChange} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>
        <label>
          Osalejate arv
          <input
            name="participants"
            type="number"
            min="2"
            max="6"
            value={values.participants}
            onChange={handleChange}
          />
          {errors.participants && <span className="field-error">{errors.participants}</span>}
        </label>
        <label className="full-span">
          Lisainfo / kommentaar
          <textarea name="notes" rows="4" value={values.notes} onChange={handleChange} />
        </label>
      </div>
      <button className="button button-primary" type="submit">
        Saada registreering
      </button>
      {status && <p className="success-message">{status}</p>}
      <p className="form-note">
        Saatmisel avaneb e-kirja rakendus ning registreering salvestatakse ka brauseri
        mock-andmetesse.
      </p>
    </form>
  );
}

export default QuizRegistrationForm;
