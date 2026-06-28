import { menuAssets as defaultMenuAssets } from '../data/menu.js';

function MenuPreview({ assets = defaultMenuAssets, compact = false }) {
  return (
    <section className={compact ? 'menu-preview menu-preview-compact' : 'menu-preview'} aria-label="Räim Ruudus menüü ja hinnakiri">
      <div className="menu-preview-heading">
        <div>
          <p className="eyebrow">Menüü / hinnakiri</p>
          <h3>Vaata menüüd kohe siin lehel</h3>
        </div>
        <a className="button button-secondary" href={assets.pdf} target="_blank" rel="noreferrer" aria-label="Ava Räim Ruudus menüü PDF uues aknas">
          Ava PDFina
        </a>
      </div>
      <div className="menu-preview-pages">
        {assets.pages.map((page, index) => (
          <a href={assets.pdf} target="_blank" rel="noreferrer" key={page.src} aria-label={`Ava menüü PDF, leht ${index + 1}`}>
            <img src={page.src} alt={page.alt} loading={index === 0 ? 'eager' : 'lazy'} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default MenuPreview;
