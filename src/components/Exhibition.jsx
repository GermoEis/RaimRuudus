import Section from './Section.jsx';

const exhibitionItems = [
  'Rannast leitud klaas ja keraamika',
  'Vana köis, metall ja puit',
  'Esemete lood ja leiukohad',
];

function Exhibition() {
  return (
    <Section
      id="meri-kannab"
      eyebrow="Meri kannab"
      title="Väike näitus mere toodud lugudest"
      lead="Naissaare rannikult ja merest leitud esemed saavad koha väikeses näituses, kus iga leid räägib oma teekonnast."
      tone="sea"
    >
      <div className="exhibition-layout">
        <article className="exhibition-card">
          <p>
            "Meri kannab" koondab esemeid, mille meri on Naissaarele toonud või
            mille rannalt on leitud. Näitus on planeeritud väikese, ligipääsetava
            lisana lokaali külastusele.
          </p>
          <div className="ticket-box">
            <span>Pilet</span>
            <strong>2 €</strong>
          </div>
          <a className="button button-primary" href="#kontakt">
            Broneeri külastus
          </a>
        </article>
        <div className="exhibition-gallery" aria-label="Näituse galerii kohatäitjad">
          {exhibitionItems.map((item) => (
            <div className="exhibition-placeholder" key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Exhibition;
