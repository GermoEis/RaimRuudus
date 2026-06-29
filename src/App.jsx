import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import DrinksMenu from './components/DrinksMenu.jsx';
import Exhibition from './components/Exhibition.jsx';
import ContactForm from './components/ContactForm.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import { IslandMapDesign, PosterDesign } from './components/AlternateDesigns.jsx';
import Footer from './components/Footer.jsx';
import { adminPreparationNotes, editableContentAreas } from './data/adminContent.js';
import { loadEditableContent } from './data/contentStore.js';
import { localizeContent, normalizeLanguage } from './data/language.js';

const quickLinks = [
  { title: 'Laevaga kohale', text: 'Naissaarele saab laevaga. Vaata ajad enne tulekut üle.', href: '#kuidas-tulla' },
  { title: 'Joogid', text: 'Õlled, siidrid, kokteilid, kangemad ja alkoholivabad joogid.', href: '#baar' },
  { title: 'Üritused', text: 'Sünnipäevad, suvepäevad, firmaüritused ja sõprade kokkutulekud.', href: '#uritused' },
  { title: 'Kontakt', text: 'Küsi lahtioleku, grupi või külastuse kohta.', href: '#kontakt' },
];

function MainDesign({ content, lang = 'et', onLanguageChange }) {
  const { siteConfig, galleryItems, faqItems, drinkCategories } = content;

  return (
    <>
      <Header siteConfig={siteConfig} lang={lang} onLanguageChange={onLanguageChange} />
      <main>
        <Hero lang={lang} />

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
          <DrinksMenu categories={drinkCategories} lang={lang} />
        </Section>

        <Exhibition lang={lang} />

      <Section
        id="uritused"
        eyebrow="Üritused ja seltskonnad"
        title="Korralda oma sündmus Naissaarel"
        lead="Otsid erilist kohta sünnipäevaks, suvepäevaks, firmaürituseks või sõprade kokkutulekuks? Räim Ruudus pakub hubast saareõhkkonda, baari, grilli kasutamise võimalust ja näitust “Meri tõi”."
      >
        <div className="private-events-layout">
          <article className="event-card">
            <span className="event-label">Eraüritused ja grupid</span>
            <h3>Tule oma seltskonnaga Räim Ruudusesse</h3>
            <p>
              Meie juures saab korraldada väiksemaid sündmusi, pidusid ja kokkusaamisi.
              Kirjuta meile, räägi oma plaanist ja leiame koos sobiva lahenduse.
            </p>

            <div className="event-types">
              <span>Sünnipäevad</span>
              <span>Suvepäevad</span>
              <span>Firmaüritused</span>
              <span>Sõprade kokkutulekud</span>
              <span>Grilliõhtud</span>
              <span>Väiksemad eraüritused</span>
            </div>

            <a className="button button-primary" href="#kontakt">
              Küsi pakkumist
            </a>
          </article>

          <article className="event-card">
            <span className="event-label">Naissaare atmosfäär</span>
            <h3>Meri, baar ja rahulik saareolemine</h3>
            <p>
              Sobib hästi päevaks, kus tahad olla mandri mürast eemal — võtta aja maha,
              nautida jooke, grillida, vaadata näitust või lihtsalt oma inimestega koos olla.
            </p>
          </article>
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
            <ContactForm lang={lang} />
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
      <Footer siteConfig={siteConfig} lang={lang} />
    </>
  );
}

const languageStorageKey = 'raimRuudusLanguage';

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = normalizeLanguage(params.get('lang'));
  if (params.get('lang')) return fromUrl;

  try {
    const saved = window.localStorage.getItem(languageStorageKey);
    if (saved) return normalizeLanguage(saved);
  } catch {
    // Ignore storage errors and fall back to Estonian.
  }

  return 'et';
}

function App() {
  const [lang, setLang] = useState(getInitialLanguage);
  const params = new URLSearchParams(window.location.search);
  const design = params.get('design');
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const routePath = basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
  const baseContent = loadEditableContent();
  const content = useMemo(() => localizeContent(baseContent, lang), [baseContent, lang]);

  function handleLanguageChange(nextLanguage) {
    setLang(normalizeLanguage(nextLanguage));
  }

  useEffect(() => {
    const language = normalizeLanguage(lang);
    document.documentElement.lang = language === 'en' ? 'en' : 'et';
    document.title = language === 'en'
      ? 'R\u00e4im Ruudus | Naissaar bar, drinks, exhibition and private events'
      : 'R\u00e4im Ruudus | Naissaare baar, joogid, n\u00e4itus ja s\u00fcndmused';

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        'content',
        language === 'en'
          ? 'R\u00e4im Ruudus is a small seaside bar on Naissaar with drinks, a menu, the Meri t\u00f5i exhibition and private events.'
          : 'R\u00e4im Ruudus on Naissaare v\u00e4ike baar suure mere \u00e4\u00e4res: joogid, men\u00fc\u00fc, n\u00e4itus Meri t\u00f5i ja era\u00fcritused.',
      );
    }

    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch {
      // Language persistence is optional.
    }
  }, [lang]);

  if (routePath === '/admin') {
    return <AdminPanel />;
  }

  if (design === 'poster') {
    return <PosterDesign content={content} lang={lang} onLanguageChange={handleLanguageChange} />;
  }

  if (design === 'classic' || design === 'tavaline' || design === 'praegune') {
    return <MainDesign content={content} lang={lang} onLanguageChange={handleLanguageChange} />;
  }

  return <IslandMapDesign content={content} lang={lang} onLanguageChange={handleLanguageChange} />;
}

export default App;
