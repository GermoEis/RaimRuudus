import { siteConfig as defaultSiteConfig } from '../data/siteConfig.js';
import logo from '../assets/raim-ruudus-logo-transparent.png';
import fish from '../assets/raim-ruudus-fish.png';

const navItems = [
  { label: 'Avaleht', href: '#avaleht', isHome: true },
  { label: 'Tulemine', href: '#kuidas-tulla' },
  { label: 'Joogid', href: '#baar' },
  { label: 'Sündmused', href: '#viktoriinid' },
  { label: 'KKK', href: '#praktiline-info' },
  { label: 'Kontakt', href: '#kontakt' },
];

function Header({ siteConfig = defaultSiteConfig }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Räim Ruudus avaleht">
        <img className="brand-logo" src={logo} alt="" />
        <span className="brand-text">
          <strong>{siteConfig.name}</strong>
          <small>{siteConfig.tagline}</small>
        </span>
      </a>
      <nav className="site-nav" aria-label="Põhinavigatsioon">
        {navItems.map((item) => (
          <a className={item.isHome ? 'nav-home' : undefined} href={item.href} key={item.href}>
            {item.isHome && (
              <span
                className="nav-fish"
                style={{ backgroundImage: `url(${fish})` }}
                aria-hidden="true"
              />
            )}
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
