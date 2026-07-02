import { getMenuAssets } from '../data/menu.js';

const copy = {
  et: {
    aria: 'Räim Ruudus menüü ja hinnakiri',
    eyebrow: 'Menüü / hinnakiri',
    title: 'Vaata menüüd kohe siin lehel',
    pdfButton: 'Ava PDFina',
    pdfAria: 'Ava Räim Ruudus menüü PDF uues aknas',
    pdfTitle: 'Räim Ruudus menüü PDF',
    pageTitle: 'Räim Ruudus menüü PDF, leht',
  },
  en: {
    aria: 'Räim Ruudus menu and price list',
    eyebrow: 'Menu / price list',
    title: 'View the menu directly on this page',
    pdfButton: 'Open PDF',
    pdfAria: 'Open the Räim Ruudus menu PDF in a new window',
    pdfTitle: 'Räim Ruudus menu PDF',
    pageTitle: 'Räim Ruudus menu PDF, page',
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
      <div className="menu-preview-documents" aria-label={activeCopy.pdfTitle}>
        {activeAssets.pages.map((pagePdf, index) => {
          const page = index + 1;

          return (
            <div className="menu-preview-document" key={page}>
              <iframe
                title={`${activeCopy.pageTitle} ${page}`}
                src={`${pagePdf}#zoom=page-fit&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
                loading="lazy"
                scrolling="no"
                tabIndex="-1"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MenuPreview;
