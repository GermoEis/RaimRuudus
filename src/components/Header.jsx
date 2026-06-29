import { siteConfig as defaultSiteConfig } from '../data/siteConfig.js';
import LanguageToggle from './LanguageToggle.jsx';
import logo from '../assets/raim-ruudus-logo-transparent.png';
import fish from '../assets/raim-ruudus-fish.png';

const navItems = {
  et: [
    { label: 'Avaleht', href: '#avaleht', isHome: true },
    { label: 'Tulemine', href: '#kuidas-tulla' },
    { label: 'Joogid', href: '#baar' },
    { label: '\u00dcritused', href: '#uritused' },
    { label: 'KKK', href: '#praktiline-info' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  en: [
    { label: 'Home', href: '#avaleht', isHome: true },
    { label: 'Getting here', href: '#kuidas-tulla' },
    { label: 'Drinks', href: '#baar' },
    { label: 'Events', href: '#uritused' },
    { label: 'FAQ', href: '#praktiline-info' },
    { label: 'Contact', href: '#kontakt' },
  ],
};

function Header({ siteConfig = defaultSiteConfig, lang = 'et', onLanguageChange }) {
  const items = navItems[lang] || navItems.et;
  const homeAria = lang === 'en' ? 'R\u00e4im Ruudus home' : 'R\u00e4im Ruudus avaleht';
  const navAria = lang === 'en' ? 'Main navigation' : 'P\u00f5hinavigatsioon';

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={homeAria}>
        <img className="brand-logo" src={logo} alt="" />
        <span className="brand-text">
          <strong>{siteConfig.name}</strong>
          <small>{siteConfig.tagline}</small>
        </span>
      </a>
      <div className="site-header-actions">
        <nav className="site-nav" aria-label={navAria}>
          {items.map((item) => (
            <a className={item.isHome ? 'nav-home' : undefined} href={item.href} key={item.href}>
              {item.isHome && <span className="nav-fish" style={{ backgroundImage: `url(${fish})` }} aria-hidden="true" />}
              {item.label}
            </a>
          ))}
        </nav>
        <LanguageToggle lang={lang} onLanguageChange={onLanguageChange} />
      </div>
    </header>
  );
}

export default Header;
