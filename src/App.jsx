import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import DrinksMenu from './components/DrinksMenu.jsx';
import Exhibition from './components/Exhibition.jsx';
import QuizRegistrationForm from './components/QuizRegistrationForm.jsx';
import ContactForm from './components/ContactForm.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import { IslandMapDesign, PosterDesign } from './components/AlternateDesigns.jsx';
import Footer from './components/Footer.jsx';
import { adminPreparationNotes, editableContentAreas } from './data/adminContent.js';
import { loadEditableContent } from './data/contentStore.js';

const quickLinks = [
  { title: 'Laevaga kohale', text: 'Naissaarele saab laevaga. Vaata ajad enne tulekut üle.', href: '#kuidas-tulla' },
  { title: 'Joogid', text: 'Õlled, siidrid, kokteilid, kangemad ja alkoholivabad joogid.', href: '#baar' },
  { title: 'Sündmused', text: 'Viktoriinid, kokteiliõhtud ja Meri tõi eriõhtu.', href: '#viktoriinid' },
  { title: 'Kontakt', text: 'Küsi lahtioleku, grupi või külastuse kohta.', href: '#kontakt' },
];

function MainDesign({ content }) {
  const { siteConfig, galleryItems, upcomingEvents, nextQuiz, faqItems, drinkCategories } = content;

  return (
    <>
      <Header siteConfig={siteConfig} />
      <main>
        <Hero />

        <Section
          id="avaleht"
          eyebrow="Tere tulemast"
          title="Väike paik suure mere ääres"
          lead="Räim Ruudus on väike baar suure mere ääres, kus saab võtta aja maha, juua midagi head ja olla päriselt saarel."
        >
          <div className="opening-strip" aria-label="Lahtioleku info">
            <div>
              <span className="opening-icon">Info</span>
              <strong>{siteConfig.openingInfo.title}</strong>
            </div>
            <p>{siteConfig.openingInfo.exhibition}</p>
            <p>{siteConfig.openingInfo.appointment}</p>
          </div>

          <div className="intro-grid">
            <div className="intro-copy">
              <p>
                Lokaal sobib peatuspaigaks matkajale, suvisele seltskonnale ja kõigile,
                kes tahavad Naissaarel korraks maha istuda. Valikus on õlled, siidrid,
                karastusjoogid, kokteilid ja kangemad joogid.
              </p>
              <p>
                Siin ei pea kiirustama. Tule enne jalutuskäiku, pärast sadamasse jõudmist
                või õhtul, kui saar hakkab vaiksemaks jääma.
              </p>
            </div>
            <div className="atmosphere-panel">
              <span>Atmosfäär</span>
              <p>
                Räim Ruudus on väike baar suure mere ääres, kus saab võtta aja maha,
                nautida meretuult, külma jooki ja saare rahulikku olemist. Oodatud on
                sõbrad, pered, matkajad ja neljajalgsed kaaslased.
              </p>
            </div>
          </div>

          <div className="quick-links" aria-label="Kiirlingid">
            {quickLinks.map((link) => (
              <a className="quick-link" href={link.href} key={link.title}>
                <span>{link.title}</span>
                <p>{link.text}</p>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="kuidas-tulla"
          eyebrow="Kuidas tulla"
          title={siteConfig.travel.title}
          lead={siteConfig.travel.text}
        >
          <div className="travel-card">
            <div>
              <span className="travel-icon">Laev</span>
              <h3>Naissaarele saab laevaga</h3>
              <p>
                Vaata väljumisi, pileteid ja praktilist infot Nicesaare lehelt. Saarel
                tasub arvestada rahulikuma liikumise, mereilma ja hooajaliste graafikutega.
              </p>
            </div>
            <a
              className="button button-primary"
              href={siteConfig.travel.url}
              target="_blank"
              rel="noreferrer"
            >
              Vaata laeva infot
            </a>
          </div>
        </Section>

        <Section
          id="galerii"
          eyebrow="Galerii"
          title="Hetked väikesest baarist suure mere ääres"
          lead="Galerii on valmis päris fotode lisamiseks. Adminis saad lisada pildi URL-i, pealkirja ja kirjelduse."
        >
          <div className="gallery-grid" aria-label="Räim Ruudus galerii">
            {galleryItems.map((item, index) => (
              <article
                className={`gallery-card gallery-card-${index + 1}`}
                key={`${item.title}-${index}`}
                style={item.image ? { backgroundImage: `linear-gradient(180deg, transparent, rgba(8, 59, 69, 0.82)), url(${item.image})` } : undefined}
              >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="baar"
          eyebrow="Baar / joogid"
          title="Joogid saarepäeva ja õhtuse jutu kõrvale"
          lead="Baaritahvli stiilis menüü teeb kategooriad kiiresti loetavaks nii telefonis kui ka arvutis."
          tone="sand"
        >
          <DrinksMenu categories={drinkCategories} />
        </Section>

        <Exhibition />

        <Section
          id="viktoriinid"
          eyebrow="Sündmused"
          title="Sündmuste kalender"
          lead="Viktoriinid, kokteiliõhtud ja Meri tõi eriõhtud annavad põhjuse Naissaarele tulla ka siis, kui päevaplaan alles kujuneb."
        >
          <div className="events-calendar">
            {upcomingEvents.map((event, index) => (
              <article className="calendar-card" key={`${event.machineDate}-${event.title}-${index}`}>
                <div className="calendar-date">
                  <time dateTime={event.machineDate}>{event.date}</time>
                  <span>{event.time}</span>
                </div>
                <div className="calendar-content">
                  <p className="event-label">{event.type}</p>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <a className="button button-secondary" href={event.href}>
                    {event.action}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="quiz-layout">
            <article className="event-card">
              <span className="event-label">Järgmine registreerimisega sündmus</span>
              <h3>{nextQuiz.title}</h3>
              <dl>
                <div>
                  <dt>Kuupäev</dt>
                  <dd>{nextQuiz.date}</dd>
                </div>
                <div>
                  <dt>Kellaaeg</dt>
                  <dd>{nextQuiz.time}</dd>
                </div>
                <div>
                  <dt>Asukoht</dt>
                  <dd>{nextQuiz.location}</dd>
                </div>
                <div>
                  <dt>Meeskond</dt>
                  <dd>{nextQuiz.teamSize}</dd>
                </div>
              </dl>
              <p>{nextQuiz.description}</p>
            </article>
            <QuizRegistrationForm quiz={nextQuiz} />
          </div>
        </Section>

        <Section
          id="praktiline-info"
          eyebrow="Praktiline info"
          title="KKK enne saarele tulekut"
          lead="Kiired vastused maksmise, laste, koerte, gruppide, näituse ja kohalesõidu kohta."
          tone="sand"
        >
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <article className="faq-card" key={`${item.question}-${index}`}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="kontakt"
          eyebrow="Kontakt"
          title="Küsi lahtioleku, ürituse või külastuse kohta"
          lead="Räim Ruudus asub Naissaarel ja on avatud hooajaliselt ning sündmuste ajal."
          tone="green"
        >
          <div className="contact-layout">
            <ContactForm />
            <aside className="contact-panel" aria-label="Kontaktinfo">
              <div>
                <h3>Asukoht</h3>
                <p>Naissaar</p>
              </div>
              <div>
                <h3>Lahtiolekuajad</h3>
                <p>{siteConfig.openingInfo.title}.</p>
                <p>{siteConfig.openingInfo.exhibition}</p>
              </div>
              <div>
                <h3>Vormide saatmine</h3>
                <p>
                  Valmis lahendus: {siteConfig.forms.provider}. Hiljem saab sama vormi
                  ühendada ka Resendi või eraldi API-ga.
                </p>
              </div>
              <div>
                <h3>Sotsiaalmeedia</h3>
                <div className="social-links">
                  <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </div>
              </div>
              <div className="map-placeholder" role="img" aria-label="Google Maps kaardi kohatäitja">
                <span>Google Maps / Naissaar</span>
              </div>
            </aside>
          </div>
        </Section>

        <section className="admin-note" aria-label="Admin paneeli ettevalmistus">
          <div>
            <span>Admini valmisolek</span>
            <p>{adminPreparationNotes.futureAdmin}</p>
          </div>
          <ul>
            {editableContentAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer siteConfig={siteConfig} />
    </>
  );
}

function App() {
  const params = new URLSearchParams(window.location.search);
  const design = params.get('design');
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const content = loadEditableContent();

  if (path === '/admin') {
    return <AdminPanel />;
  }

  if (design === 'poster') {
    return <PosterDesign content={content} />;
  }

  if (design === 'classic' || design === 'tavaline' || design === 'praegune') {
    return <MainDesign content={content} />;
  }

  return <IslandMapDesign content={content} />;
}

export default App;
