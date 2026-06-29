import ContactForm from './ContactForm.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import Footer from './Footer.jsx';
import MenuPreview from './MenuPreview.jsx';
import { drinkCategories } from '../data/drinks.js';
import { faqItems } from '../data/faq.js';
import { siteConfig } from '../data/siteConfig.js';
import logo from '../assets/raim-ruudus-logo-transparent.png';
import fish from '../assets/raim-ruudus-fish.png';
import { defaultContent } from '../data/contentStore.js';
import { getMenuAssets, menuAssets } from '../data/menu.js';
import { islandCopy } from '../data/islandCopy.js';

function LogoBlock({ className = '' }) {
  return (
    <a className={`alt-logo ${className}`} href="/" aria-label="Räim Ruudus avaleht">
      <img src={logo} alt="Räim Ruudus" />
    </a>
  );
}

export function PosterDesign({ content = defaultContent }) {
  const { siteConfig, drinkCategories } = content;

  return (
    <div className="poster-design">
      <header className="poster-hero" id="top">
        <div className="poster-brand">
          <LogoBlock />
          <p>Naissaar · baar · näitus · üritused</p>
        </div>
        <div className="poster-title">
          <span>Väike baar suure mere ääres</span>
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
            <a href="#poster-events">Korralda üritus</a>
            <a href={menuAssets.pdf} target="_blank" rel="noreferrer">
              Ava menüü
            </a>
            <a href={siteConfig.travel.url} target="_blank" rel="noreferrer">
              Laeva info
            </a>
          </div>
        </section>

        <section className="poster-menu" id="poster-menu">
          <div className="poster-section-title">
            <span>Baar</span>
            <h2>Joogitahvel</h2>
            <a className="poster-menu-link" href={menuAssets.pdf} target="_blank" rel="noreferrer">
              Ava täismenüü PDF
            </a>
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
            <span>Meri tõi</span>
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
            <span>Üritused</span>
            <h2>Korralda oma sündmus Naissaarel</h2>
          </div>
          <div className="poster-timeline">
            <article>
              <time>Sinu kuupäev</time>
              <div>
                <h3>Sünnipäev, suvepäev või oma pidu</h3>
                <p>
                  Kirjuta meile, räägi oma plaanist ja leiame koos sobiva lahenduse
                  Naissaare rahulikus saareõhkkonnas.
                </p>
              </div>
              <a href="#poster-contact">Küsi pakkumist</a>
            </article>
            <article>
              <time>Võimalused</time>
              <div>
                <h3>Baar, grill ja näitus</h3>
                <p>
                  Meie juures saab pidada väiksemaid eraüritusi, grilliõhtuid,
                  sõprade kokkutulekuid ja firma suvepäevi.
                </p>
              </div>
              <a href="#poster-contact">Võta ühendust</a>
            </article>
          </div>
        </section>

        <section className="poster-forms" id="poster-contact">
          <div>
            <h2>Kirjuta meile</h2>
            <p>
              Küsi lahtioleku, külastuse või eraürituse korraldamise kohta.
              Vastame esimesel võimalusel.
            </p>
          </div>
          <ContactForm lang={lang} />
        </section>
      </main>
    </div>
  );
}

export function IslandMapDesign({ content = defaultContent, lang = 'et', onLanguageChange }) {
  const { siteConfig, faqItems } = content;
  const copy = islandCopy[lang] || islandCopy.et;
  const activeMenuAssets = getMenuAssets(lang);

  return (
    <div className="map-design">
      <aside className="map-sidebar">
        <LogoBlock />
        <p>{copy.sidebarText}</p>
        <LanguageToggle lang={lang} onLanguageChange={onLanguageChange} className="language-toggle-sidebar" />
        <nav aria-label={copy.navAria}>
          <a href="#map-start">{copy.nav[0]}</a>
          <a href="#map-route">{copy.nav[1]}</a>
          <a href="#map-bar">{copy.nav[2]}</a>
          <a href="#map-events">{copy.nav[3]}</a>
          <a href="#map-contact">{copy.nav[4]}</a>
        </nav>
      </aside>

      <main className="map-content">
        <section className="map-hero" id="map-start">
          <img className="map-fish" src={fish} alt="" />
          <div>
            <span>{copy.label}</span>
            <h1>{copy.h1}</h1>
            <p>{copy.lead}</p>
            <div className="map-hero-actions" aria-label={copy.actionsAria}>
              <a className="button button-primary" href="#map-bar">{copy.menuCta}</a>
              <a className="button button-secondary" href="#map-route">{copy.travelCta}</a>
            </div>
          </div>
        </section>

        <section className="map-route" id="map-route">
          <article>
            <span>01</span>
            <h2>{copy.route1}</h2>
            <p>{siteConfig.travel.text}</p>
            <a href={siteConfig.travel.url} target="_blank" rel="noreferrer" aria-label={copy.routeLinkAria}>
              {copy.routeLink}
            </a>
          </article>
          <article>
            <span>02</span>
            <h2>{copy.route2}</h2>
            <p>{siteConfig.openingInfo.exhibition}</p>
            <p>{siteConfig.openingInfo.appointment}</p>
          </article>
          <article>
            <span>03</span>
            <h2>{copy.route3}</h2>
            <p>{copy.route3Text}</p>
            <a href="#map-contact">{copy.visitLink}</a>
          </article>
        </section>

        <section className="map-bar" id="map-bar">
          <div className="map-heading">
            <span>{copy.barLabel}</span>
            <h2>{copy.menuTitle}</h2>
            <a className="map-menu-pdf" href={activeMenuAssets.pdf} target="_blank" rel="noreferrer" aria-label={copy.menuPdfAria}>
              {copy.menuPdf}
            </a>
          </div>
          <MenuPreview assets={activeMenuAssets} lang={lang} />
        </section>

        <section className="map-events" id="map-events">
          <div className="map-heading">
            <span>{copy.eventsLabel}</span>
            <h2>{copy.eventsTitle}</h2>
          </div>
          <div className="map-event-board">
            <div>
              <article>
                <time>{copy.eventTime1}</time>
                <div className="map-event-content">
                  <span>{copy.eventTag1}</span>
                  <h3>{copy.eventTitle1}</h3>
                  <p>{copy.eventText1}</p>
                  <a href="#map-contact">{copy.quote}</a>
                </div>
              </article>
              <article>
                <time>{copy.eventTime2}</time>
                <div className="map-event-content">
                  <span>{copy.eventTag2}</span>
                  <h3>{copy.eventTitle2}</h3>
                  <p>{copy.eventText2}</p>
                  <a href="#map-contact">{copy.contactCta}</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="map-practical" aria-label={copy.practicalAria}>
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="map-contact" id="map-contact">
          <div className="map-heading">
            <span>{copy.contactLabel}</span>
            <h2>{copy.contactTitle}</h2>
          </div>
          <div className="map-contact-layout">
            <ContactForm lang={lang} />
            <aside className="map-contact-panel" aria-label={copy.contactPanelAria}>
              <div>
                <span>{copy.location}</span>
                <strong>{copy.locationValue}</strong>
                <p>{copy.locationText}</p>
              </div>
              <div>
                <span>{copy.contact}</span>

                <a href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>

                <a href={`tel:${siteConfig.phone}`}>
                  {siteConfig.phone}
                </a>

                <a href={`tel:${siteConfig.altPhone}`}>
                  {siteConfig.altPhone}
                </a>
              </div>
              <div>
                <span>{copy.goodToKnow}</span>
                <p>{copy.goodToKnowText}</p>
              </div>
              <div className="map-contact-links">
                <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Räim Ruudus Facebook">
                  Facebook
                </a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Räim Ruudus Instagram">
                  Instagram
                </a>
                <a href={siteConfig.travel.url} target="_blank" rel="noreferrer" aria-label={copy.ferryInfo}>
                  {copy.ferryInfo}
                </a>
              </div>
            </aside>
          </div>
          <footer>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Räim Ruudus Facebook">
              Facebook
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Räim Ruudus Instagram">
              Instagram
            </a>
            <span>Naissaar</span>
          </footer>
        </section>
        <Footer siteConfig={siteConfig} contactHref="#map-contact" lang={lang} />
      </main>
    </div>
  );
}
