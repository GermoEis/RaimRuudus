import logo from '../assets/raim-ruudus-logo-transparent.png';
import { siteConfig as defaultSiteConfig } from '../data/siteConfig.js';

const copy = {
  et: { aria: 'Jaluse lingid', contact: 'Kontakt', island: 'Naissaar', rights: 'K\u00f5ik \u00f5igused kaitstud.' },
  en: { aria: 'Footer links', contact: 'Contact', island: 'Naissaar', rights: 'All rights reserved.' },
};

function Footer({ siteConfig = defaultSiteConfig, contactHref = '#kontakt', lang = 'et' }) {
  const activeCopy = copy[lang] || copy.et;

  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <img src={logo} alt="R\u00e4im Ruudus" />
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>

      <nav className="site-footer-links" aria-label={activeCopy.aria}>
        <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
        <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={contactHref}>{activeCopy.contact}</a>
      </nav>

      <div className="site-footer-meta">
        <span>{activeCopy.island}</span>
        <span>\u00a9 {new Date().getFullYear()} R\u00e4im Ruudus. {activeCopy.rights}</span>
      </div>
    </footer>
  );
}

export default Footer;
