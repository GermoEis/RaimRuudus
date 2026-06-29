import MenuPreview from './MenuPreview.jsx';
import { getMenuAssets } from '../data/menu.js';

const copy = {
  et: {
    aria: 'Joogimen\u00fc\u00fc baaritahvlil',
    title: 'R\u00e4im Ruudus baaritahvel',
    note: 'Hinnad ja t\u00e4pne valik v\u00f5ivad hooaja jooksul muutuda.',
    fullMenu: 'Ava t\u00e4ismen\u00fc\u00fc',
  },
  en: {
    aria: 'Drinks menu on the bar board',
    title: 'R\u00e4im Ruudus bar board',
    note: 'Prices and exact selection may change during the season.',
    fullMenu: 'Open full menu',
  },
};

function DrinksMenu({ lang = 'et' }) {
  const activeCopy = copy[lang] || copy.et;
  const assets = getMenuAssets(lang);

  return (
    <div className="bar-board" aria-label={activeCopy.aria}>
      <div className="bar-board-header">
        <div>
          <span>{activeCopy.title}</span>
          <p>{activeCopy.note}</p>
        </div>
        <a className="button button-secondary menu-pdf-link" href={assets.pdf} target="_blank" rel="noreferrer">
          {activeCopy.fullMenu}
        </a>
      </div>
      <MenuPreview assets={assets} compact lang={lang} />
    </div>
  );
}

export default DrinksMenu;
