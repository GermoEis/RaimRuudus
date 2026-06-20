import { useState } from 'react';
import { submitContactMessage } from '../services/formSubmit.js';

const initialValues = {
  name: '',
  email: '',
  message: '',
};

function validate(values) {
  const errors = {};

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

    submitContactMessage(values);
    setValues(initialValues);
    setStatus('Sõnum saadetud!');
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h3>Kirjuta meile</h3>
      <label>
        Nimi
        <input name="name" value={values.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>
      <label>
        E-post
        <input name="email" type="email" value={values.email} onChange={handleChange} />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>
      <label>
        Sõnum
        <textarea name="message" rows="5" value={values.message} onChange={handleChange} />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </label>
      <button className="button button-primary" type="submit">
        Saada sõnum
      </button>
      {status && <p className="success-message">{status}</p>}
    </form>
  );
}

export default ContactForm;
