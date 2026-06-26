import ContactForm from './ContactForm.jsx';
import QuizRegistrationForm from './QuizRegistrationForm.jsx';
import { drinkCategories } from '../data/drinks.js';
import { nextQuiz, upcomingEvents } from '../data/events.js';
import { faqItems } from '../data/faq.js';
import { siteConfig } from '../data/siteConfig.js';
import logo from '../assets/raim-ruudus-logo-transparent.png';
import fish from '../assets/raim-ruudus-fish.png';
import { defaultContent } from '../data/contentStore.js';

const designLinks = [
  { label: 'Kaart (põhi)', href: '/' },
  { label: 'Plakat', href: '/?design=poster' },
  { label: 'Klassikaline', href: '/?design=classic' },
  { label: 'Admin', href: '/?admin=1' },
];

export function DesignNav({ tone = 'light' }) {
  return (
    <nav className={`design-nav design-nav-${tone}`} aria-label="Disainivariandid">
      {designLinks.map((link) => (
        <a href={link.href} key={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

function LogoBlock({ className = '' }) {
  return (
    <a className={`alt-logo ${className}`} href="/" aria-label="Räim Ruudus avaleht">
      <img src={logo} alt="Räim Ruudus" />
    </a>
  );
}

export function PosterDesign({ content = defaultContent }) {
  const { siteConfig, nextQuiz, upcomingEvents, drinkCategories } = content;

  return (
    <div className="poster-design">
      <DesignNav tone="dark" />
      <header className="poster-hero" id="top">
        <div className="poster-brand">
          <LogoBlock />
          <p>Naissaar · baar · näitus · viktoriinid</p>
        </div>
        <div className="poster-title">
          <span>Looduslokaal Naissaarel</span>
          <h1>Väike baar suure mere ääres.</h1>
        </div>
        <aside className="poster-info-card">
          <strong>{siteConfig.openingInfo.title}</strong>
          <p>{siteConfig.openingInfo.exhibition}</p>
          <a href="#poster-contact">Võta ühendust</a>
        </aside>
      </header>

      <main>
        <section className="poster-intro">
          <p>
            Räim Ruudus on rahulik saarepeatus külma joogi, meretuule ja lihtsa olemise
            jaoks. Siia sobivad saarekülalised, pered, sõbrad ja neljajalgsed kaaslased.
          </p>
          <div className="poster-actions">
            <a href="#poster-events">Vaata sündmusi</a>
            <a href={siteConfig.travel.url} target="_blank" rel="noreferrer">
              Laeva info
            </a>
          </div>
        </section>

        <section className="poster-menu" id="poster-menu">
          <div className="poster-section-title">
            <span>Baar</span>
            <h2>Joogitahvel</h2>
          </div>
          <div className="poster-menu-list">
            {drinkCategories.map((category) => (
              <article key={category.title}>
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
                <strong>{category.price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="poster-exhibition">
          <div>
            <span>Meri kannab</span>
            <h2>Leitud esemed ja nende lood.</h2>
            <p>
              Väike näitus mere poolt Naissaarele kantud esemetest. Pilet 2 €, külastus
              baari lahtioleku aegadel või kokkuleppel.
            </p>
          </div>
          <div className="poster-object-grid">
            <span>Klaas</span>
            <span>Köis</span>
            <span>Puit</span>
          </div>
        </section>

        <section className="poster-events" id="poster-events">
          <div className="poster-section-title">
            <span>Tulekul</span>
            <h2>Sündmused</h2>
          </div>
          <div className="poster-timeline">
            {upcomingEvents.map((event) => (
              <article key={`${event.date}-${event.title}`}>
                <time>{event.date}</time>
                <div>
                  <h3>{event.title}</h3>
                  <p>
                    {event.time} · {event.description}
                  </p>
                </div>
                <a href={event.href}>{event.action}</a>
              </article>
            ))}
          </div>
        </section>

        <section className="poster-forms" id="poster-contact">
          <div>
            <h2>Registreeri või kirjuta</h2>
            <p>
              Vormid kasutavad sama valideerimist, kinnitusteadet, Netlify Forms
              valmisolekut ja kohalikku varulahendust.
            </p>
          </div>
          <QuizRegistrationForm quiz={nextQuiz} />
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

export function IslandMapDesign({ content = defaultContent }) {
  const { siteConfig, nextQuiz, upcomingEvents, drinkCategories, faqItems } = content;

  return (
    <div className="map-design">
      <aside className="map-sidebar">
        <LogoBlock />
        <p>Looduslokaal Naissaarel</p>
        <nav aria-label="Kaardivaate navigatsioon">
          <a href="#map-start">Algus</a>
          <a href="#map-route">Teekond</a>
          <a href="#map-bar">Baar</a>
          <a href="#map-events">Sündmused</a>
          <a href="#map-contact">Kontakt</a>
        </nav>
        <DesignNav />
      </aside>

      <main className="map-content">
        <section className="map-hero" id="map-start">
          <img className="map-fish" src={fish} alt="" />
          <div>
            <span>Naissaar / Räim Ruudus</span>
            <h1>Saarepeatus, mis töötab nagu väike teekond.</h1>
            <p>
              Tule laevaga, võta aeg maha, vali midagi baarist, vaata näitust ja pane
              meeskond viktoriiniks kirja.
            </p>
          </div>
        </section>

        <section className="map-route" id="map-route">
          <article>
            <span>01</span>
            <h2>Laev Naissaarele</h2>
            <p>{siteConfig.travel.text}</p>
            <a href={siteConfig.travel.url} target="_blank" rel="noreferrer">
              Vaata laeva infot
            </a>
          </article>
          <article>
            <span>02</span>
            <h2>Avatud hooajaliselt</h2>
            <p>{siteConfig.openingInfo.exhibition}</p>
            <p>{siteConfig.openingInfo.appointment}</p>
          </article>
          <article>
            <span>03</span>
            <h2>Meri kannab</h2>
            <p>Näitus mere poolt Naissaarele kantud esemetest. Pilet 2 €.</p>
            <a href="#map-contact">Küsi külastuse kohta</a>
          </article>
        </section>

        <section className="map-bar" id="map-bar">
          <div className="map-heading">
            <span>Baar</span>
            <h2>Joogid lihtsa nimekirjana, mitte kaardireana.</h2>
          </div>
          <div className="map-drinks">
            {drinkCategories.map((category) => (
              <article key={category.title}>
                <h3>{category.title}</h3>
                <p>{category.tags.join(' · ')}</p>
                <strong>{category.price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="map-events" id="map-events">
          <div className="map-heading">
            <span>Viktoriinid ja õhtud</span>
            <h2>Tulekul</h2>
          </div>
          <div className="map-event-board">
            <QuizRegistrationForm quiz={nextQuiz} />
            <div>
              {upcomingEvents.map((event) => (
                <article key={`${event.date}-${event.title}`}>
                  <time>{event.date}</time>
                  <h3>{event.title}</h3>
                  <p>
                    {event.time} · {event.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="map-practical">
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="map-contact" id="map-contact">
          <div className="map-heading">
            <span>Kontakt</span>
            <h2>Küsi lahtioleku või külastuse kohta.</h2>
          </div>
          <ContactForm />
          <footer>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <span>Naissaar</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
