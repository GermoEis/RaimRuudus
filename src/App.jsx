import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import DrinksMenu from './components/DrinksMenu.jsx';
import Exhibition from './components/Exhibition.jsx';
import QuizRegistrationForm from './components/QuizRegistrationForm.jsx';
import ContactForm from './components/ContactForm.jsx';
import { IslandMapDesign, PosterDesign } from './components/AlternateDesigns.jsx';
import Footer from './components/Footer.jsx';
import { nextQuiz, upcomingEvents } from './data/events.js';
import { faqItems } from './data/faq.js';
import { siteConfig } from './data/siteConfig.js';

const galleryItems = [
  'Vaade merele ja sadamale',
  'Õhtune baariala',
  'Naissaare loodusrajad',
  'Leitud mere-esemed',
];

const quickLinks = [
  { title: 'Baar', text: 'Õlled, siidrid, kokteilid ja karastusjoogid.', href: '#baar' },
  { title: 'Meri kannab', text: 'Väike näitus mere toodud leidudest.', href: '#meri-kannab' },
  { title: 'Viktoriinid', text: 'Registreeri oma meeskond saareõhtule.', href: '#viktoriinid' },
  { title: 'Kontakt', text: 'Küsi infot lahtiolekute ja ürituste kohta.', href: '#kontakt' },
];

function App() {
  const design = new URLSearchParams(window.location.search).get('design');

  if (design === 'poster') {
    return <PosterDesign />;
  }

  if (design === 'kaart') {
    return <IslandMapDesign />;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />

        <Section
          id="avaleht"
          eyebrow="Tere tulemast"
          title="Väike paik suure mere ääres"
          lead="Räim Ruudus on Naissaare looduslokaal, kus saab võtta aja maha, juua midagi head ja olla päriselt saarel. Meie fookus on lihtsal, sõbralikul teenindusel, mõnusal atmosfääril ja mere lähedusel."
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
                Tulevikus lisandub väike näitus "Meri kannab", kus iga ese räägib
                oma lugu rannast, veest ja ajast.
              </p>
              <p className="atmosphere-text">
                Räim Ruudus on väike Naissaare looduslokaal, kus saab võtta aja maha,
                nautida meretuult, külma jooki ja saare rahulikku olemist. Meie juures
                on oodatud nii saarekülalised, pered, sõbrad kui ka neljajalgsed
                kaaslased.
              </p>
            </div>
            <div className="gallery-grid" aria-label="Galerii kohatäitjad">
              {galleryItems.map((item, index) => (
                <div className={`gallery-card gallery-card-${index + 1}`} key={item}>
                  <span>{item}</span>
                </div>
              ))}
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
              <h3>Laevaga Naissaarele</h3>
              <p>
                Planeeri sõit ette ja kontrolli väljumisaegu enne tulekut. Saarel tasub
                arvestada rahulikuma liikumise, mereilma ja hooajaliste graafikutega.
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
          id="baar"
          eyebrow="Baar / joogid"
          title="Joogid saarepäeva ja õhtuse jutu kõrvale"
          lead="Menüü on ehitatud nii, et hinnad ja täpne joogivalik saab hiljem kiiresti andmefaili lisada."
          tone="sand"
        >
          <DrinksMenu />
        </Section>

        <Exhibition />

        <Section
          id="viktoriinid"
          eyebrow="Viktoriinid"
          title="Järgmine viktoriiniõhtu"
          lead="Pane oma meeskond kirja ja tule Naissaarel teadmisi proovile panema."
        >
          <div className="quiz-layout">
            <article className="event-card">
              <span className="event-label">Järgmine sündmus</span>
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

          <div className="upcoming-block">
            <div className="compact-heading">
              <p className="eyebrow">Tulekul</p>
              <h3>Sündmuste kalender</h3>
            </div>
            <div className="upcoming-grid">
              {upcomingEvents.map((event) => (
                <article className="upcoming-card" key={`${event.date}-${event.title}`}>
                  <time>{event.date}</time>
                  <h4>{event.title}</h4>
                  <p className="event-time">{event.time}</p>
                  <p>{event.description}</p>
                  <a className="button button-secondary" href={event.href}>
                    {event.action}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="praktiline-info"
          eyebrow="Praktiline info"
          title="KKK enne saarele tulekut"
          lead="Siit leiad kiire vastuse kõige tavalisematele küsimustele maksmise, perede, koerte, gruppide, näituse ja kohalesõidu kohta."
          tone="sand"
        >
          <div className="faq-grid">
            {faqItems.map((item) => (
              <article className="faq-card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="kontakt"
          eyebrow="Kontakt"
          title="Küsi lahtioleku, ürituste või külastuse kohta"
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
      </main>
      <Footer />
    </>
  );
}

export default App;
