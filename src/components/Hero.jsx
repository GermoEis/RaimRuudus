import logo from '../assets/raim-ruudus-logo-transparent.png';

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">Naissaar · meri · joogid · sündmused</p>
        <h1>Räim Ruudus</h1>
        <p className="hero-subtitle">Väike baar suure mere ääres</p>
        <p className="hero-text">
          Väike saarebaar, kus saab võtta aja maha, nautida külma jooki, meretuult,
          hooajalist baari, näitust "Meri tõi" ning võimalust korraldada oma sündmus Naissaarel.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#uritused">
            Vaata sündmusi
          </a>
          <a className="button button-secondary" href="#kuidas-tulla">
            Kuidas tulla
          </a>
        </div>
      </div>
      <aside className="hero-visual" aria-label="Räim Ruudus identiteet">
        <img src={logo} alt="Räim Ruudus logo" />
        <p>Naissaar. Külm jook. Rahulik olemine.</p>
      </aside>
    </section>
  );
}

export default Hero;
