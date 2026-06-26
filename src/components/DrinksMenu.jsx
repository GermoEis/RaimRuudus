import MenuPreview from './MenuPreview.jsx';
import { menuAssets } from '../data/menu.js';

function DrinksMenu() {
  return (
    <div className="bar-board" aria-label="Joogimenüü baaritahvlil">
      <div className="bar-board-header">
        <div>
          <span>Räim Ruudus baaritahvel</span>
          <p>Hinnad ja täpne valik võivad hooaja jooksul muutuda.</p>
        </div>
        <a className="button button-secondary menu-pdf-link" href={menuAssets.pdf} target="_blank" rel="noreferrer">
          Ava täismenüü
        </a>
      </div>
      <MenuPreview assets={menuAssets} compact /></div>
  );
}

export default DrinksMenu;
