const base = import.meta.env.BASE_URL;

const menuAssetSets = {
  et: {
    pdf: `${base}raim-ruudus-menu.pdf`,
    pages: [
      { src: `${base}raim-ruudus-menu-page-1.png`, alt: 'R\u00e4im Ruudus men\u00fc\u00fc ja hinnakiri, leht 1' },
      { src: `${base}raim-ruudus-menu-page-2.png`, alt: 'R\u00e4im Ruudus men\u00fc\u00fc ja hinnakiri, leht 2' },
    ],
  },
  en: {
    pdf: `${base}raim-ruudus-menu-en.pdf`,
    pages: [
      { src: `${base}raim-ruudus-menu-en-page-1.png`, alt: 'R\u00e4im Ruudus English menu and price list, page 1' },
      { src: `${base}raim-ruudus-menu-en-page-2.png`, alt: 'R\u00e4im Ruudus English menu and price list, page 2' },
    ],
  },
};

export const menuAssets = menuAssetSets.et;

export function getMenuAssets(lang = 'et') {
  return menuAssetSets[lang] || menuAssetSets.et;
}
