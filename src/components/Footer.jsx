import { siteConfig as defaultSiteConfig } from '../data/siteConfig.js';

function Footer({ siteConfig = defaultSiteConfig }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.name}</strong>
        <p>{siteConfig.tagline}</p>
      </div>
      <nav aria-label="Jaluse lingid">
        <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <p>© {new Date().getFullYear()} Räim Ruudus. Kõik õigused kaitstud.</p>
    </footer>
  );
}

export default Footer;
