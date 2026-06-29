import { getMenuAssets } from '../data/menu.js';

const copy = {
  et: {
    aria: 'R\u00e4im Ruudus men\u00fc\u00fc ja hinnakiri',
    eyebrow: 'Men\u00fc\u00fc / hinnakiri',
    title: 'Vaata men\u00fc\u00fcd kohe siin lehel',
    pdfButton: 'Ava PDFina',
    pdfAria: 'Ava R\u00e4im Ruudus men\u00fc\u00fc PDF uues aknas',
    pageAria: 'Ava men\u00fc\u00fc PDF, leht',
  },
  en: {
    aria: 'R\u00e4im Ruudus menu and price list',
    eyebrow: 'Menu / price list',
    title: 'View the menu directly on this page',
    pdfButton: 'Open PDF',
    pdfAria: 'Open the R\u00e4im Ruudus menu PDF in a new window',
    pageAria: 'Open menu PDF, page',
  },
};

function MenuPreview({ assets, compact = false, lang = 'et' }) {
  const activeCopy = copy[lang] || copy.et;
  const activeAssets = assets || getMenuAssets(lang);

  return (
    <section className={compact ? 'menu-preview menu-preview-compact' : 'menu-preview'} aria-label={activeCopy.aria}>
      <div className="menu-preview-heading">
        <div>
          <p className="eyebrow">{activeCopy.eyebrow}</p>
          <h3>{activeCopy.title}</h3>
        </div>
        <a className="button button-secondary" href={activeAssets.pdf} target="_blank" rel="noreferrer" aria-label={activeCopy.pdfAria}>
          {activeCopy.pdfButton}
        </a>
      </div>
      <div className="menu-preview-pages">
        {activeAssets.pages.map((page, index) => (
          <a href={activeAssets.pdf} target="_blank" rel="noreferrer" key={page.src} aria-label={`${activeCopy.pageAria} ${index + 1}`}>
            <img src={page.src} alt={page.alt} loading={index === 0 ? 'eager' : 'lazy'} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default MenuPreview;
