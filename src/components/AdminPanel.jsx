import { useEffect, useMemo, useState } from 'react';
import {
  clearEditableContent,
  defaultContent,
  loadEditableContent,
  saveEditableContent,
} from '../data/contentStore.js';
import logo from '../assets/raim-ruudus-logo-transparent.png';

// TODO: Replace this client-side gate with server-side or hosting-level authentication before public use.
const adminPassword = 'raimruudus';

const tabs = [
  { id: 'overview', label: 'Üldinfo' },
  { id: 'events', label: 'Sündmused' },
  { id: 'drinks', label: 'Joogid' },
  { id: 'gallery', label: 'Galerii' },
  { id: 'faq', label: 'KKK' },
];

const emptyEvent = {
  title: 'Uus sündmus',
  date: '',
  machineDate: '',
  time: '',
  description: '',
  action: 'Küsi lisainfot',
  href: '#kontakt',
  type: 'Sündmus',
};

const emptyDrink = {
  title: 'Uus kategooria',
  price: '',
  tags: [],
  description: '',
  items: [],
};

const emptyGalleryItem = {
  title: 'Uus foto',
  description: '',
  image: '',
};

const emptyFaq = {
  question: 'Uus küsimus',
  answer: '',
};

function TextField({ label, value, onChange, multiline = false, placeholder = '' }) {
  return (
    <label>
      {label}
      {multiline ? (
        <textarea rows="4" value={value || ''} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value || ''} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function FieldGrid({ children }) {
  return <div className="admin-field-grid">{children}</div>;
}

function updateArrayItem(items, index, nextItem) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

function removeArrayItem(items, index) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (password === adminPassword) {
      window.sessionStorage.setItem('raimRuudusAdminSession', 'true');
      onLogin();
      return;
    }
    setError('Vale parool.');
  }

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img src={logo} alt="Räim Ruudus" />
        <h1>Admin paneel</h1>
        <p>Sisesta haldusparool, et muuta sündmusi, menüüd, galeriid, lahtiolekut ja KKK-d.</p>
        <label>
          Parool
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button className="button button-primary" type="submit">
          Logi sisse
        </button>
        {error && <p className="field-error">{error}</p>}
        <p className="form-note">Admin on praegu arendusrežiimis. Päris avalikus veebis tuleb ligipääs kaitsta serveripoolse autentimisega.</p>
      </form>
    </main>
  );
}

function OverviewEditor({ content, setContent }) {
  const siteConfig = content.siteConfig;

  function updateSiteConfig(nextPartial) {
    setContent((current) => ({
      ...current,
      siteConfig: {
        ...current.siteConfig,
        ...nextPartial,
      },
    }));
  }

  function updateNested(group, nextPartial) {
    setContent((current) => ({
      ...current,
      siteConfig: {
        ...current.siteConfig,
        [group]: {
          ...current.siteConfig[group],
          ...nextPartial,
        },
      },
    }));
  }

  return (
    <section className="admin-panel-card">
      <h2>Üldinfo ja lahtiolekuajad</h2>
      <FieldGrid>
        <TextField label="Nimi" value={siteConfig.name} onChange={(value) => updateSiteConfig({ name: value })} />
        <TextField label="Tunnuslause" value={siteConfig.tagline} onChange={(value) => updateSiteConfig({ tagline: value })} />
        <TextField label="E-post" value={siteConfig.contactEmail} onChange={(value) => updateSiteConfig({ contactEmail: value })} />
        <TextField label="Telefon" value={siteConfig.phone} onChange={(value) => updateSiteConfig({ phone: value })} />
        <TextField label="Lahtioleku pealkiri" value={siteConfig.openingInfo.title} onChange={(value) => updateNested('openingInfo', { title: value })} />
        <TextField label="Näitus" value={siteConfig.openingInfo.exhibition} onChange={(value) => updateNested('openingInfo', { exhibition: value })} />
        <TextField label="Kokkuleppel külastus" value={siteConfig.openingInfo.appointment} onChange={(value) => updateNested('openingInfo', { appointment: value })} />
        <TextField label="Laeva info link" value={siteConfig.travel.url} onChange={(value) => updateNested('travel', { url: value })} />
        <TextField label="Tulemise tekst" value={siteConfig.travel.text} multiline onChange={(value) => updateNested('travel', { text: value })} />
        <TextField label="Facebook" value={siteConfig.social.facebook} onChange={(value) => updateNested('social', { facebook: value })} />
        <TextField label="Instagram" value={siteConfig.social.instagram} onChange={(value) => updateNested('social', { instagram: value })} />
      </FieldGrid>
    </section>
  );
}

function EventsEditor({ content, setContent }) {
  function updateEvent(index, nextEvent) {
    setContent((current) => ({
      ...current,
      upcomingEvents: updateArrayItem(current.upcomingEvents, index, nextEvent),
    }));
  }

  function updateNextQuiz(nextPartial) {
    setContent((current) => ({
      ...current,
      nextQuiz: {
        ...current.nextQuiz,
        ...nextPartial,
      },
    }));
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-card-heading">
        <div>
          <h2>Sündmused</h2>
          <p>Kalendrikaardid ja eraldi registreerimisega viktoriin.</p>
        </div>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => setContent((current) => ({ ...current, upcomingEvents: [...current.upcomingEvents, emptyEvent] }))}
        >
          Lisa sündmus
        </button>
      </div>

      <div className="admin-subsection">
        <h3>Järgmine registreerimisega sündmus</h3>
        <FieldGrid>
          <TextField label="Pealkiri" value={content.nextQuiz.title} onChange={(value) => updateNextQuiz({ title: value })} />
          <TextField label="Kuupäev" value={content.nextQuiz.date} onChange={(value) => updateNextQuiz({ date: value })} />
          <TextField label="Masinkuupäev" value={content.nextQuiz.machineDate} placeholder="2026-07-12" onChange={(value) => updateNextQuiz({ machineDate: value })} />
          <TextField label="Kellaaeg" value={content.nextQuiz.time} onChange={(value) => updateNextQuiz({ time: value })} />
          <TextField label="Asukoht" value={content.nextQuiz.location} onChange={(value) => updateNextQuiz({ location: value })} />
          <TextField label="Meeskonna suurus" value={content.nextQuiz.teamSize} onChange={(value) => updateNextQuiz({ teamSize: value })} />
          <TextField label="Kirjeldus" value={content.nextQuiz.description} multiline onChange={(value) => updateNextQuiz({ description: value })} />
        </FieldGrid>
      </div>

      <div className="admin-list">
        {content.upcomingEvents.map((event, index) => (
          <article className="admin-edit-card" key={`${event.title}-${index}`}>
            <div className="admin-edit-card-heading">
              <h3>{event.title || 'Sündmus'}</h3>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setContent((current) => ({ ...current, upcomingEvents: removeArrayItem(current.upcomingEvents, index) }))}
              >
                Kustuta
              </button>
            </div>
            <FieldGrid>
              <TextField label="Pealkiri" value={event.title} onChange={(value) => updateEvent(index, { ...event, title: value })} />
              <TextField label="Tüüp" value={event.type} onChange={(value) => updateEvent(index, { ...event, type: value })} />
              <TextField label="Kuupäev" value={event.date} onChange={(value) => updateEvent(index, { ...event, date: value })} />
              <TextField label="Masinkuupäev" value={event.machineDate} placeholder="2026-07-12" onChange={(value) => updateEvent(index, { ...event, machineDate: value })} />
              <TextField label="Kellaaeg" value={event.time} onChange={(value) => updateEvent(index, { ...event, time: value })} />
              <TextField label="Nupu tekst" value={event.action} onChange={(value) => updateEvent(index, { ...event, action: value })} />
              <TextField label="Nupu link" value={event.href} onChange={(value) => updateEvent(index, { ...event, href: value })} />
              <TextField label="Kirjeldus" value={event.description} multiline onChange={(value) => updateEvent(index, { ...event, description: value })} />
            </FieldGrid>
          </article>
        ))}
      </div>
    </section>
  );
}

function DrinksEditor({ content, setContent }) {
  function updateDrink(index, nextDrink) {
    setContent((current) => ({
      ...current,
      drinkCategories: updateArrayItem(current.drinkCategories, index, nextDrink),
    }));
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-card-heading">
        <div>
          <h2>Joogimenüü</h2>
          <p>Sildid eralda komaga, joogid kirjuta igaüks eraldi reale.</p>
        </div>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => setContent((current) => ({ ...current, drinkCategories: [...current.drinkCategories, emptyDrink] }))}
        >
          Lisa kategooria
        </button>
      </div>
      <div className="admin-list">
        {content.drinkCategories.map((drink, index) => (
          <article className="admin-edit-card" key={`${drink.title}-${index}`}>
            <div className="admin-edit-card-heading">
              <h3>{drink.title || 'Joogikategooria'}</h3>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setContent((current) => ({ ...current, drinkCategories: removeArrayItem(current.drinkCategories, index) }))}
              >
                Kustuta
              </button>
            </div>
            <FieldGrid>
              <TextField label="Kategooria" value={drink.title} onChange={(value) => updateDrink(index, { ...drink, title: value })} />
              <TextField label="Hind" value={drink.price} onChange={(value) => updateDrink(index, { ...drink, price: value })} />
              <TextField label="Sildid" value={(drink.tags || []).join(', ')} onChange={(value) => updateDrink(index, { ...drink, tags: value.split(',').map((tag) => tag.trim()).filter(Boolean) })} />
              <TextField label="Kirjeldus" value={drink.description} multiline onChange={(value) => updateDrink(index, { ...drink, description: value })} />
              <TextField label="Joogid" value={(drink.items || []).join('\n')} multiline onChange={(value) => updateDrink(index, { ...drink, items: value.split('\n').map((item) => item.trim()).filter(Boolean) })} />
            </FieldGrid>
          </article>
        ))}
      </div>
    </section>
  );
}

function GalleryEditor({ content, setContent }) {
  function updateGalleryItem(index, nextItem) {
    setContent((current) => ({
      ...current,
      galleryItems: updateArrayItem(current.galleryItems, index, nextItem),
    }));
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-card-heading">
        <div>
          <h2>Galerii</h2>
          <p>Pildi URL võib olla tühi. Kui URL on olemas, kasutatakse seda taustapildina.</p>
        </div>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => setContent((current) => ({ ...current, galleryItems: [...current.galleryItems, emptyGalleryItem] }))}
        >
          Lisa pilt
        </button>
      </div>
      <div className="admin-list">
        {content.galleryItems.map((item, index) => (
          <article className="admin-edit-card" key={`${item.title}-${index}`}>
            <div className="admin-edit-card-heading">
              <h3>{item.title || 'Galerii pilt'}</h3>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setContent((current) => ({ ...current, galleryItems: removeArrayItem(current.galleryItems, index) }))}
              >
                Kustuta
              </button>
            </div>
            <FieldGrid>
              <TextField label="Pealkiri" value={item.title} onChange={(value) => updateGalleryItem(index, { ...item, title: value })} />
              <TextField label="Pildi URL" value={item.image} onChange={(value) => updateGalleryItem(index, { ...item, image: value })} />
              <TextField label="Kirjeldus" value={item.description} multiline onChange={(value) => updateGalleryItem(index, { ...item, description: value })} />
            </FieldGrid>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqEditor({ content, setContent }) {
  function updateFaq(index, nextFaq) {
    setContent((current) => ({
      ...current,
      faqItems: updateArrayItem(current.faqItems, index, nextFaq),
    }));
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-card-heading">
        <div>
          <h2>KKK</h2>
          <p>Praktilised küsimused enne Naissaarele tulekut.</p>
        </div>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => setContent((current) => ({ ...current, faqItems: [...current.faqItems, emptyFaq] }))}
        >
          Lisa küsimus
        </button>
      </div>
      <div className="admin-list">
        {content.faqItems.map((item, index) => (
          <article className="admin-edit-card" key={`${item.question}-${index}`}>
            <div className="admin-edit-card-heading">
              <h3>{item.question || 'Küsimus'}</h3>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setContent((current) => ({ ...current, faqItems: removeArrayItem(current.faqItems, index) }))}
              >
                Kustuta
              </button>
            </div>
            <FieldGrid>
              <TextField label="Küsimus" value={item.question} onChange={(value) => updateFaq(index, { ...item, question: value })} />
              <TextField label="Vastus" value={item.answer} multiline onChange={(value) => updateFaq(index, { ...item, answer: value })} />
            </FieldGrid>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminPanel() {
  useEffect(() => {
    const previousTitle = document.title;
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsMeta?.getAttribute('content');

    document.title = 'Admin | Räim Ruudus';
    robotsMeta?.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.title = previousTitle;
      if (robotsMeta && previousRobots) {
        robotsMeta.setAttribute('content', previousRobots);
      }
    };
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.sessionStorage.getItem('raimRuudusAdminSession') === 'true');
  const [activeTab, setActiveTab] = useState('overview');
  const [content, setContent] = useState(() => loadEditableContent());
  const [status, setStatus] = useState('');

  const activeEditor = useMemo(() => {
    const props = { content, setContent };
    if (activeTab === 'events') return <EventsEditor {...props} />;
    if (activeTab === 'drinks') return <DrinksEditor {...props} />;
    if (activeTab === 'gallery') return <GalleryEditor {...props} />;
    if (activeTab === 'faq') return <FaqEditor {...props} />;
    return <OverviewEditor {...props} />;
  }, [activeTab, content]);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  function handleSave() {
    saveEditableContent(content);
    setStatus('Muudatused salvestatud. Avalik leht kasutab neid pärast värskendamist.');
  }

  function handleReset() {
    clearEditableContent();
    setContent(defaultContent);
    setStatus('Vaikimisi sisu taastatud.');
  }

  function handleLogout() {
    window.sessionStorage.removeItem('raimRuudusAdminSession');
    setIsLoggedIn(false);
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <img src={logo} alt="Räim Ruudus" />
          <div>
            <p>Räim Ruudus</p>
            <h1>Admin paneel</h1>
          </div>
        </div>
        <nav aria-label="Admin lingid">
          <a href="/">Vaata lehte</a>
          <button type="button" onClick={handleLogout}>
            Logi välja
          </button>
        </nav>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          {tabs.map((tab) => (
            <button
              className={activeTab === tab.id ? 'is-active' : ''}
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        <div className="admin-workspace">
          <div className="admin-actions">
            <button className="button button-primary" type="button" onClick={handleSave}>
              Salvesta muudatused
            </button>
            <button className="button button-secondary" type="button" onClick={handleReset}>
              Taasta vaikimisi sisu
            </button>
            {status && <p className="success-message">{status}</p>}
          </div>
          {activeEditor}
        </div>
      </div>
    </main>
  );
}

export default AdminPanel;
