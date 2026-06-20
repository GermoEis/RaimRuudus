import logo from '../assets/raim-ruudus-logo-transparent.png';

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-overlay">
        <p className="eyebrow">Naissaar · meri · mõnus atmosfäär</p>
        <h1>Räim Ruudus</h1>
        <p className="hero-subtitle">Looduslokaal Naissaarel</p>
        <p className="hero-text">
          Väike mereäärne baar, kus joogid, Naissaare loodus ja rahulik saareõhtu
          saavad kokku lihtsas ning sõbralikus õhkkonnas.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#viktoriinid">
            Vaata sündmusi
          </a>
          <a className="button button-secondary" href="#kontakt">
            Võta ühendust
          </a>
        </div>
      </div>
      <aside className="hero-visual" aria-label="Räim Ruudus logo">
        <img src={logo} alt="Räim Ruudus logo" />
        <p>Väike saarebaar, kus meri on alati lähedal.</p>
      </aside>
    </section>
  );
}

export default Hero;
