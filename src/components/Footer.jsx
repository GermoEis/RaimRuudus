import logo from '../assets/raim-ruudus-logo-transparent.png';
import { siteConfig as defaultSiteConfig } from '../data/siteConfig.js';

function Footer({ siteConfig = defaultSiteConfig, contactHref = '#kontakt' }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <img src={logo} alt="Räim Ruudus" />
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>

      <nav className="site-footer-links" aria-label="Jaluse lingid">
        <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={contactHref}>Kontakt</a>
      </nav>

      <div className="site-footer-meta">
        <span>Naissaar</span>
        <span>© {new Date().getFullYear()} Räim Ruudus. Kõik õigused kaitstud.</span>
      </div>
    </footer>
  );
}

export default Footer;
